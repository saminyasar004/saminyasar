import { useState } from "react";
import { usePortfolioStore, type BlogPost } from "@/store/usePortfolioStore";
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
import { format } from "date-fns";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  excerpt: z.string().min(1, "Excerpt is required").max(300, "Excerpt must be less than 300 characters"),
  content: z.string().min(1, "Content is required"),
  image: z.string().url("Must be a valid URL"),
  tags: z.string().min(1, "Tags are required"),
});

type BlogForm = z.infer<typeof blogSchema>;

export default function AdminBlog() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = usePortfolioStore();
  const [isOpen, setIsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<BlogForm>({
    resolver: zodResolver(blogSchema),
    defaultValues: editingPost ? {
      ...editingPost,
      tags: editingPost.tags.join(", "),
    } : undefined,
  });

  const onSubmit = (data: BlogForm) => {
    const postData = {
      ...data,
      tags: data.tags.split(",").map(t => t.trim()),
      date: editingPost?.date || new Date().toISOString(),
    };

    if (editingPost) {
      updateBlogPost(editingPost.id, postData);
      toast({ title: "Blog post updated successfully" });
    } else {
      addBlogPost({ ...postData, id: Date.now().toString() } as BlogPost);
      toast({ title: "Blog post added successfully" });
    }

    setIsOpen(false);
    setEditingPost(null);
    reset();
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    reset({
      ...post,
      tags: post.tags.join(", "),
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deleteBlogPost(id);
      toast({ title: "Blog post deleted successfully" });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingPost(null);
    reset({
      title: "",
      excerpt: "",
      content: "",
      image: "",
      tags: ""
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("title")} />
                {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" {...register("excerpt")} rows={2} />
                {errors.excerpt && <p className="text-sm text-destructive mt-1">{errors.excerpt.message}</p>}
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" {...register("content")} rows={10} />
                {errors.content && <p className="text-sm text-destructive mt-1">{errors.content.message}</p>}
              </div>

              <div>
                <Label htmlFor="image">Featured Image URL</Label>
                <Input id="image" {...register("image")} placeholder="https://example.com/image.jpg" />
                {errors.image && <p className="text-sm text-destructive mt-1">{errors.image.message}</p>}
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input id="tags" {...register("tags")} placeholder="JavaScript, React, Web Development" />
                {errors.tags && <p className="text-sm text-destructive mt-1">{errors.tags.message}</p>}
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPost ? "Update" : "Add"} Post
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="p-6 glass-strong border-border">
            <div className="flex gap-6">
              <img
                src={post.image}
                alt={post.title}
                className="w-48 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(post.date), 'MMM dd, yyyy')}
                  </span>
                </div>
                <p className="text-muted-foreground mb-3">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground" 
                    onClick={() => handleDelete(post.id)}
                  >
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
