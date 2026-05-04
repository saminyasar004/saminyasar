"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Testimonial } from "@prisma/client";

const testimonialSchema = z.object({
  author: z.string().min(1, "Author is required"),
  role: z.string().min(1, "Role is required"),
  company: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  avatarUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  rating: z.coerce.number().min(1).max(5).default(5),
  order: z.coerce.number().default(0),
});

type TestimonialForm = z.infer<typeof testimonialSchema>;

interface TestimonialsClientProps {
  initialTestimonials: Testimonial[];
}

export default function TestimonialsClient({ initialTestimonials }: TestimonialsClientProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isOpen, setIsOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const router = useRouter();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TestimonialForm>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      rating: 5,
      order: 0,
    }
  });

  const onSubmit = async (data: TestimonialForm) => {
    try {
      if (editingTestimonial) {
        const res = await fetch(`/api/testimonials/${editingTestimonial.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to update");
        const updated = await res.json();
        setTestimonials(prev => prev.map(t => t.id === updated.id ? updated : t));
        toast.success("Testimonial updated successfully");
      } else {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to create");
        const created = await res.json();
        setTestimonials(prev => [...prev, created]);
        toast.success("Testimonial added successfully");
      }
      setIsOpen(false);
      setEditingTestimonial(null);
      reset();
      router.refresh();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    reset({
      author: testimonial.author,
      role: testimonial.role,
      company: testimonial.company || "",
      content: testimonial.content,
      avatarUrl: testimonial.avatarUrl || "",
      rating: testimonial.rating,
      order: testimonial.order,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setTestimonials(prev => prev.filter(t => t.id !== id));
      toast.success("Testimonial deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground">What others say about your work</p>
        </div>
        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setEditingTestimonial(null);
            reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-background border-border">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input id="author" {...register("author")} />
                  {errors.author && <p className="text-xs text-destructive">{errors.author.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" {...register("role")} />
                  {errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" {...register("company")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input id="rating" type="number" {...register("rating")} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" {...register("content")} />
                {errors.content && <p className="text-xs text-destructive">{errors.content.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="avatarUrl">Avatar URL</Label>
                  <Input id="avatarUrl" {...register("avatarUrl")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Order</Label>
                  <Input id="order" type="number" {...register("order")} />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-accent text-accent-foreground">{editingTestimonial ? "Update" : "Create"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {testimonials.map((t) => (
          <Card key={t.id} className="p-4 glass-strong border-border hover:border-accent/50 transition-all">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-muted rounded-full overflow-hidden">
                  {t.avatarUrl && <img src={t.avatarUrl} alt={t.author} className="w-full h-full object-cover" />}
                </div>
                <div>
                  <h3 className="font-bold">{t.author}</h3>
                  <p className="text-xs text-muted-foreground">{t.role} {t.company && `@ ${t.company}`}</p>
                  <p className="text-sm mt-2 line-clamp-2 italic">"{t.content}"</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => handleEdit(t)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(t.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
