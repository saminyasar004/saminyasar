"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Project } from "@prisma/client";
import { ImageUpload } from "@/components/ImageUpload";
import { CodeCard } from "@/components/CodeCard";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.string().min(1, "Tags are required"),
  imageUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  liveUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").or(z.literal("")),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

type ProjectForm = z.infer<typeof projectSchema>;

interface ProjectsClientProps {
  initialProjects: Project[];
}

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, reset, setValue, watch, control, formState: { errors } } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      featured: false,
      order: 0,
      imageUrl: "",
    }
  });

  const onSubmit = async (data: ProjectForm) => {
    const projectData = {
      ...data,
      tags: data.tags.split(",").map(t => t.trim()),
    };

    try {
      if (editingProject) {
        const res = await fetch(`/api/projects/${editingProject.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
        if (!res.ok) throw new Error("Failed to update");
        const updated = await res.json();
        setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
        toast.success("Project updated successfully");
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
        if (!res.ok) throw new Error("Failed to create");
        const created = await res.json();
        setProjects(prev => [...prev, created]);
        toast.success("Project added successfully");
      }
      setIsOpen(false);
      setEditingProject(null);
      reset();
      router.refresh();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    reset({
      title: project.title,
      description: project.description,
      tags: project.tags.join(", "),
      imageUrl: project.imageUrl || "",
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      featured: project.featured,
      order: project.order,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setProjects(prev => prev.filter(p => p.id !== id));
      toast.success("Project deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium tracking-tight">
            <span className="text-syntax-comment">$ </span>ls /projects
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your portfolio artifacts</p>
        </div>
        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setEditingProject(null);
            reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-brand text-primary-foreground hover:bg-brand-glow">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border-border">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
              <DialogDescription>
                Provide details about your project to showcase in your portfolio.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" {...register("title")} className="bg-surface-2 border-border" />
                  {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Order</Label>
                  <Input id="order" type="number" {...register("order", { valueAsNumber: true })} className="bg-surface-2 border-border" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register("description")} className="bg-surface-2 border-border" />
                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input id="tags" {...register("tags")} placeholder="React, Next.js, Prisma" className="bg-surface-2 border-border" />
                {errors.tags && <p className="text-xs text-destructive">{errors.tags.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 col-span-full">
                  <Controller
                    name="imageUrl"
                    control={control}
                    render={({ field }) => (
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        label="Project Image"
                      />
                    )}
                  />
                  {errors.imageUrl && <p className="text-xs text-destructive">{errors.imageUrl.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live URL</Label>
                  <Input id="liveUrl" {...register("liveUrl")} className="bg-surface-2 border-border" />
                  {errors.liveUrl && <p className="text-xs text-destructive">{errors.liveUrl.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input id="githubUrl" {...register("githubUrl")} className="bg-surface-2 border-border" />
                  {errors.githubUrl && <p className="text-xs text-destructive">{errors.githubUrl.message}</p>}
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Checkbox 
                    id="featured" 
                    checked={watch("featured")}
                    onCheckedChange={(checked) => setValue("featured", checked as boolean)}
                  />
                  <Label htmlFor="featured">Featured Project</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-brand text-primary-foreground">{editingProject ? "Update" : "Create"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {projects.map((project) => (
          <CodeCard key={project.id} title={project.title.toLowerCase().replace(/\s/g, "-") + ".md"} badge={project.featured ? "● featured" : undefined}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-48 h-32 bg-surface-2 rounded-md overflow-hidden relative border border-border">
                {project.imageUrl && (
                  <img src={project.imageUrl} alt={project.title} className="object-cover w-full h-full" />
                )}
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-medium text-foreground">{project.title}</h3>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="chip">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(project)} className="hover:text-brand transition-colors">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-surface border-border">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the project artifact from your system.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDelete(project.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
              </div>
            </div>
          </CodeCard>
        ))}
        {projects.length === 0 && (
          <div className="text-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-lg bg-surface">
            No project artifacts found. Initialize your first one!
          </div>
        )}
      </div>
    </div>
  );
}
