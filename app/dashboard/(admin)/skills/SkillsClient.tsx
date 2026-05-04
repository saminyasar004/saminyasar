"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Skill } from "@prisma/client";
import { ImageUpload } from "@/components/ImageUpload";

const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  level: z.number().min(0).max(100).default(80),
  iconUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  order: z.number().default(0),
});

type SkillForm = z.infer<typeof skillSchema>;

interface SkillsClientProps {
  initialSkills: Skill[];
}

export default function SkillsClient({ initialSkills }: SkillsClientProps) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [isOpen, setIsOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const router = useRouter();

  const { register, handleSubmit, reset, setValue, watch, control, formState: { errors } } = useForm<SkillForm>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      level: 80,
      order: 0,
      iconUrl: "",
    }
  });

  const onSubmit = async (data: SkillForm) => {
    try {
      if (editingSkill) {
        const res = await fetch(`/api/skills/${editingSkill.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to update");
        const updated = await res.json();
        setSkills(prev => prev.map(s => s.id === updated.id ? updated : s));
        toast.success("Skill updated successfully");
      } else {
        const res = await fetch("/api/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to create");
        const created = await res.json();
        setSkills(prev => [...prev, created]);
        toast.success("Skill added successfully");
      }
      setIsOpen(false);
      setEditingSkill(null);
      reset();
      router.refresh();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    reset({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      iconUrl: skill.iconUrl || "",
      order: skill.order,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setSkills(prev => prev.filter(s => s.id !== id));
      toast.success("Skill deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-muted-foreground">Your technical expertise</p>
        </div>
        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setEditingSkill(null);
            reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-background border-border">
            <DialogHeader>
              <DialogTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
              <DialogDescription>
                List your technical skills and proficiency levels.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Skill Name</Label>
                <Input id="name" {...register("name")} placeholder="React" />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" {...register("category")} placeholder="Frontend" />
                {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="level">Proficiency ({watch("level")}%)</Label>
                </div>
                <Slider 
                  value={[watch("level")]} 
                  onValueChange={(val) => setValue("level", val[0])}
                  max={100} 
                  step={1} 
                />
              </div>

              <div className="space-y-2">
                <Controller
                  name="iconUrl"
                  control={control}
                  render={({ field }) => (
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      label="Skill Icon"
                    />
                  )}
                />
                {errors.iconUrl && <p className="text-xs text-destructive">{errors.iconUrl.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Order</Label>
                <Input id="order" type="number" {...register("order", { valueAsNumber: true })} />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-accent text-accent-foreground">{editingSkill ? "Update" : "Create"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((s) => (
          <Card key={s.id} className="p-4 glass-strong border-border hover:border-accent/50 transition-all flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-secondary rounded p-1">
                {s.iconUrl ? <img src={s.iconUrl} alt={s.name} className="w-full h-full object-contain" /> : <div className="text-xs font-bold">{s.name[0]}</div>}
              </div>
              <div>
                <h3 className="font-bold">{s.name}</h3>
                <p className="text-[10px] text-muted-foreground uppercase">{s.category}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" onClick={() => handleEdit(s)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(s.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
