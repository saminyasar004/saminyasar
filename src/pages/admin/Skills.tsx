import { useState } from "react";
import { usePortfolioStore, type Skill } from "@/store/usePortfolioStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const skillSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  category: z.string().min(1, "Category is required").max(50, "Category must be less than 50 characters"),
  icon: z.string().url("Must be a valid URL"),
});

type SkillForm = z.infer<typeof skillSchema>;

export default function AdminSkills() {
  const { skills, addSkill, updateSkill, deleteSkill } = usePortfolioStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SkillForm>({
    resolver: zodResolver(skillSchema),
    defaultValues: editingSkill || undefined,
  });

  const onSubmit = (data: SkillForm) => {
    if (editingSkill) {
      updateSkill(editingSkill.id, data);
      toast({ title: "Skill updated successfully" });
    } else {
      addSkill({ ...data, id: Date.now().toString() } as Skill);
      toast({ title: "Skill added successfully" });
    }

    setIsOpen(false);
    setEditingSkill(null);
    reset();
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    reset(skill);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      deleteSkill(id);
      toast({ title: "Skill deleted successfully" });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingSkill(null);
    reset({
      name: "",
      category: "",
      icon: ""
    });
  };

  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Skills</h1>
          <p className="text-muted-foreground">Manage your technical skills</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} placeholder="JavaScript" />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" {...register("category")} placeholder="Frontend" />
                {errors.category && <p className="text-sm text-destructive mt-1">{errors.category.message}</p>}
              </div>

              <div>
                <Label htmlFor="icon">Icon URL</Label>
                <Input 
                  id="icon" 
                  {...register("icon")} 
                  placeholder="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" 
                />
                {errors.icon && <p className="text-sm text-destructive mt-1">{errors.icon.message}</p>}
                <p className="text-xs text-muted-foreground mt-1">
                  Use devicons: https://devicon.dev/
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingSkill ? "Update" : "Add"} Skill
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category}>
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <Card key={skill.id} className="p-4 glass-strong border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={skill.icon} alt={skill.name} className="w-10 h-10" />
                      <h3 className="font-semibold">{skill.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(skill)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground" 
                        onClick={() => handleDelete(skill.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
