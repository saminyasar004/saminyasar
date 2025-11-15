import { useState } from "react";
import { usePortfolioStore, type Project } from "@/store/usePortfolioStore";
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

const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  tech: z.string().min(1, "Technologies are required"),
  image: z.string().url("Must be a valid URL"),
  github: z.string().url("Must be a valid URL"),
  live: z.string().url("Must be a valid URL"),
});

type ProjectForm = z.infer<typeof projectSchema>;

export default function AdminProjects() {
  const { projects, addProject, updateProject, deleteProject } = usePortfolioStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: editingProject ? {
      ...editingProject,
      tech: editingProject.tech.join(", "),
    } : undefined,
  });

  const onSubmit = (data: ProjectForm) => {
    const projectData = {
      ...data,
      tech: data.tech.split(",").map(t => t.trim()),
    };

    if (editingProject) {
      updateProject(editingProject.id, projectData);
      toast({ title: "Project updated successfully" });
    } else {
      addProject({ ...projectData, id: Date.now().toString() } as Project);
      toast({ title: "Project added successfully" });
    }

    setIsOpen(false);
    setEditingProject(null);
    reset();
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    reset({
      ...project,
      tech: project.tech.join(", "),
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(id);
      toast({ title: "Project deleted successfully" });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingProject(null);
    reset();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage your project showcase</p>
        </div>
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("title")} />
                {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register("description")} />
                {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <Label htmlFor="tech">Technologies (comma-separated)</Label>
                <Input id="tech" {...register("tech")} placeholder="React, Node.js, MongoDB" />
                {errors.tech && <p className="text-sm text-destructive mt-1">{errors.tech.message}</p>}
              </div>

              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" {...register("image")} placeholder="https://example.com/image.jpg" />
                {errors.image && <p className="text-sm text-destructive mt-1">{errors.image.message}</p>}
              </div>

              <div>
                <Label htmlFor="github">GitHub URL</Label>
                <Input id="github" {...register("github")} placeholder="https://github.com/username/repo" />
                {errors.github && <p className="text-sm text-destructive mt-1">{errors.github.message}</p>}
              </div>

              <div>
                <Label htmlFor="live">Live URL</Label>
                <Input id="live" {...register("live")} placeholder="https://example.com" />
                {errors.live && <p className="text-sm text-destructive mt-1">{errors.live.message}</p>}
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProject ? "Update" : "Add"} Project
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="p-6 glass-strong border-border">
            <div className="flex gap-6">
              <img
                src={project.image}
                alt={project.title}
                className="w-48 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
