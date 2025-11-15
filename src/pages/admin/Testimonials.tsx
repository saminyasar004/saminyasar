import { useState } from "react";
import { usePortfolioStore, type Testimonial } from "@/store/usePortfolioStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  role: z.string().min(1, "Role is required").max(100, "Role must be less than 100 characters"),
  company: z.string().min(1, "Company is required").max(100, "Company must be less than 100 characters"),
  content: z.string().min(1, "Content is required").max(500, "Content must be less than 500 characters"),
  avatar: z.string().url("Must be a valid URL"),
});

type TestimonialForm = z.infer<typeof testimonialSchema>;

export default function AdminTestimonials() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = usePortfolioStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TestimonialForm>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: editingTestimonial || undefined,
  });

  const onSubmit = (data: TestimonialForm) => {
    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, data);
      toast({ title: "Testimonial updated successfully" });
    } else {
      addTestimonial({ ...data, id: Date.now().toString() } as Testimonial);
      toast({ title: "Testimonial added successfully" });
    }

    setIsOpen(false);
    setEditingTestimonial(null);
    reset();
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    reset(testimonial);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      deleteTestimonial(id);
      toast({ title: "Testimonial deleted successfully" });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingTestimonial(null);
    reset();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Testimonials</h1>
          <p className="text-muted-foreground">Manage client testimonials</p>
        </div>
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} placeholder="John Doe" />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <Input id="role" {...register("role")} placeholder="CEO" />
                {errors.role && <p className="text-sm text-destructive mt-1">{errors.role.message}</p>}
              </div>

              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" {...register("company")} placeholder="Tech Corp" />
                {errors.company && <p className="text-sm text-destructive mt-1">{errors.company.message}</p>}
              </div>

              <div>
                <Label htmlFor="content">Testimonial</Label>
                <Textarea id="content" {...register("content")} placeholder="Working with them was amazing..." />
                {errors.content && <p className="text-sm text-destructive mt-1">{errors.content.message}</p>}
              </div>

              <div>
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input id="avatar" {...register("avatar")} placeholder="https://example.com/avatar.jpg" />
                {errors.avatar && <p className="text-sm text-destructive mt-1">{errors.avatar.message}</p>}
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTestimonial ? "Update" : "Add"} Testimonial
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="p-6 glass-strong border-border">
            <div className="flex items-start gap-4 mb-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                <p className="text-sm text-muted-foreground">{testimonial.company}</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{testimonial.content}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleEdit(testimonial)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground" 
                onClick={() => handleDelete(testimonial.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
