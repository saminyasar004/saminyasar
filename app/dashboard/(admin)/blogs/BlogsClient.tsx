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
	DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
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
import { Blog } from "@prisma/client";
import { ImageUpload } from "@/components/ImageUpload";
import { CodeCard } from "@/components/CodeCard";

const blogSchema = z.object({
	title: z.string().min(1, "Title is required"),
	slug: z.string().min(1, "Slug is required"),
	content: z.string().min(1, "Content is required"),
	excerpt: z.string().optional(),
	coverImage: z.string().url("Must be a valid URL").or(z.literal("")),
	published: z.boolean(),
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

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
		control,
		formState: { errors },
	} = useForm<BlogForm>({
		resolver: zodResolver(blogSchema),
		defaultValues: {
			title: "",
			slug: "",
			content: "",
			excerpt: "",
			published: false,
			coverImage: "",
		},
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
				setBlogs((prev) =>
					prev.map((b) => (b.id === updated.id ? updated : b)),
				);
				toast.success("Blog updated successfully");
			} else {
				const res = await fetch("/api/blogs", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(blogData),
				});
				if (!res.ok) throw new Error("Failed to create");
				const created = await res.json();
				setBlogs((prev) => [created, ...prev]);
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
			setBlogs((prev) => prev.filter((b) => b.id !== id));
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
					<h1 className="text-3xl font-medium tracking-tight">
						<span className="text-syntax-comment">$ </span>ls /blogs
					</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Manage your articles and documentation
					</p>
				</div>
				<Dialog
					open={isOpen}
					onOpenChange={(open) => {
						setIsOpen(open);
						if (!open) {
							setEditingBlog(null);
							reset();
						}
					}}
				>
					<DialogTrigger asChild>
						<Button className="bg-brand text-primary-foreground hover:bg-brand-glow">
							<Plus className="mr-2 h-4 w-4" />
							Add Blog
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-surface border-border">
						<DialogHeader>
							<DialogTitle>
								{editingBlog ? "Edit Blog" : "Add New Blog"}
							</DialogTitle>
							<DialogDescription>
								Fill in the details for your blog post. Markdown is supported
								for the content.
							</DialogDescription>
						</DialogHeader>
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="title">Title</Label>
									<Input
										id="title"
										{...register("title")}
										className="bg-surface-2 border-border"
										onChange={(e) => {
											register("title").onChange(e);
											if (!editingBlog) {
												setValue(
													"slug",
													e.target.value
														.toLowerCase()
														.replace(/ /g, "-")
														.replace(/[^\w-]+/g, ""),
												);
											}
										}}
									/>
									{errors.title && (
										<p className="text-xs text-destructive">
											{errors.title.message}
										</p>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="slug">Slug</Label>
									<Input
										id="slug"
										{...register("slug")}
										className="bg-surface-2 border-border"
									/>
									{errors.slug && (
										<p className="text-xs text-destructive">
											{errors.slug.message}
										</p>
									)}
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="excerpt">Excerpt</Label>
								<Textarea
									id="excerpt"
									{...register("excerpt")}
									className="bg-surface-2 border-border"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="content">Content (Markdown)</Label>
								<Textarea
									id="content"
									{...register("content")}
									className="min-h-[200px] bg-surface-2 border-border font-mono text-sm"
								/>
								{errors.content && (
									<p className="text-xs text-destructive">
										{errors.content.message}
									</p>
								)}
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Controller
										name="coverImage"
										control={control}
										render={({ field }) => (
											<ImageUpload
												value={field.value}
												onChange={field.onChange}
												label="Cover Image"
											/>
										)}
									/>
								</div>
								<div className="flex items-center space-x-2 pt-8">
									<Checkbox
										id="published"
										checked={watch("published")}
										onCheckedChange={(checked) =>
											setValue("published", !!checked)
										}
									/>
									<Label htmlFor="published">Published</Label>
								</div>
							</div>

							<div className="flex justify-end gap-2 pt-4">
								<Button
									type="button"
									variant="outline"
									onClick={() => setIsOpen(false)}
								>
									Cancel
								</Button>
								<Button
									type="submit"
									className="bg-brand text-primary-foreground"
								>
									{editingBlog ? "Update" : "Create"}
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid grid-cols-1 gap-5">
				{blogs.map((blog) => (
					<CodeCard
						key={blog.id}
						title={blog.slug + ".md"}
						badge={blog.published ? "● published" : "○ draft"}
					>
						<div className="flex justify-between items-center">
							<div>
								<h3 className="text-xl font-medium text-foreground">
									{blog.title}
								</h3>
								<div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
									<span
										className={cn(
											"uppercase tracking-widest font-bold",
											blog.published ? "text-brand" : "text-syntax-comment",
										)}
									>
										{blog.published ? "LIVE" : "DRAFT"}
									</span>
									{blog.publishedAt && (
										<span>
											{new Date(blog.publishedAt).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
												year: "numeric",
											})}
										</span>
									)}
								</div>
							</div>
							<div className="flex gap-1">
								<Button
									size="icon"
									variant="ghost"
									onClick={() => handleEdit(blog)}
									className="hover:text-brand transition-colors"
								>
									<Pencil className="h-4 w-4" />
								</Button>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button
											size="icon"
											variant="ghost"
											className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent className="bg-surface border-border">
										<AlertDialogHeader>
											<AlertDialogTitle>Are you sure?</AlertDialogTitle>
											<AlertDialogDescription>
												This will permanently delete the article from the
												system.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction
												onClick={() => handleDelete(blog.id)}
												className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
											>
												Delete
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</div>
					</CodeCard>
				))}
				{blogs.length === 0 && (
					<div className="text-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-lg bg-surface">
						No blog posts found. Write your first one!
					</div>
				)}
			</div>
		</div>
	);
}
