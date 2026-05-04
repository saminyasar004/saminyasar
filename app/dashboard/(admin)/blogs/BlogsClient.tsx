"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
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
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Blog } from "@prisma/client";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  coverImage: z.string().url("Must be a valid URL").or(z.literal("")),
  published: z.boolean().default(false),
});

type BlogForm = z.infer<typeof blogSchema>;

interface BlogsClientProps {
  initialBlogs: Blog[];
}

export default function BlogsClient({ initialBlogs }: BlogsClientProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [isOpen, setIsOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const router = useRouter();

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<BlogForm>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      published: false,
    }
  });

  const onSubmit = async (data: BlogForm) => {
    const blogData = {
      ...data,
      publishedAt: data.published ? new Date() : null,
    };

    try {
      if (editingBlog) {
        const res = await fetch(`/api/blogs/${editingBlog.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blogData),
        });
        if (!res.ok) throw new Error("Failed to update");
        const updated = await res.json();
        setBlogs(prev => prev.map(b => b.id === updated.id ? updated : b));
        toast.success("Blog updated successfully");
      } else {
        const res = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blogData),
        });
        if (!res.ok) throw new Error("Failed to create");
        const created = await res.json();
        setBlogs(prev => [created, ...prev]);
        toast.success("Blog created successfully");
      }
      setIsOpen(false);
      setEditingBlog(null);
      reset();
      router.refresh();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    reset({
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      excerpt: blog.excerpt || "",
      coverImage: blog.coverImage || "",
      published: blog.published,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setBlogs(prev => prev.filter(b => b.id !== id));
      toast.success("Blog deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blogs</h1>
          <p className="text-muted-foreground">Manage your articles and thoughts</p>
        </div>
        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setEditingBlog(null);
            reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Add Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border">
            <DialogHeader>
              <DialogTitle>{editingBlog ? "Edit Blog" : "Add New Blog"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    {...register("title")} 
                    onChange={(e) => {
                      register("title").onChange(e);
                      if (!editingBlog) {
                        setValue("slug", e.target.value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""));
                      }
                    }}
                  />
                  {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" {...register("slug")} />
                  {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" {...register("excerpt")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown)</Label>
                <Textarea id="content" {...register("content")} className="min-h-[200px]" />
                {errors.content && <p className="text-xs text-destructive">{errors.content.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image URL</Label>
                  <Input id="coverImage" {...register("coverImage")} />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Checkbox 
                    id="published" 
                    checked={watch("published")}
                    onCheckedChange={(checked) => setValue("published", checked as boolean)}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-accent text-accent-foreground">{editingBlog ? "Update" : "Create"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {blogs.map((blog) => (
          <Card key={blog.id} className="p-4 glass-strong border-border hover:border-accent/50 transition-all">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{blog.title}</h3>
                <p className="text-sm text-muted-foreground">{blog.slug}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-bold",
                    blog.published ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                  )}>
                    {blog.published ? "PUBLISHED" : "DRAFT"}
                  </span>
                  {blog.publishedAt && (
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(blog.publishedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => handleEdit(blog)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                {/* AlertDialog for delete */}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
