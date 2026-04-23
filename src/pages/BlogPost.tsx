import { useParams, Link } from "react-router-dom";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogPost() {
	const { id } = useParams();
	const { blogPosts } = usePortfolioStore();

	const post = blogPosts.find((p) => p.id === id);

	if (!post) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center space-y-4">
					<h1 className="text-4xl font-bold">Post Not Found</h1>
					<Button asChild>
						<Link to="/">Go Home</Link>
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="pt-20">
				<article className="container mx-auto px-4 py-12 w-full md:max-w-[70%]">
					<Button
						variant="ghost"
						className="mb-8 text-accent hover:text-accent hover:bg-accent/10"
						asChild
					>
						<Link to="/">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Home
						</Link>
					</Button>

					<div className="space-y-8">
						<div className="relative h-96 rounded-2xl overflow-hidden">
							<img
								src={post.image}
								alt={post.title}
								className="w-full h-full object-cover"
							/>
						</div>

						<div className="space-y-4">
							<div className="flex items-center gap-4 text-sm text-muted-foreground">
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4" />
									<span>
										{new Date(
											post.date,
										).toLocaleDateString()}
									</span>
								</div>
							</div>

							<h1 className="text-4xl md:text-5xl font-bold">
								{post.title}
							</h1>

							<div className="flex flex-wrap gap-2">
								{post.tags.map((tag, index) => (
									<Badge
										key={index}
										variant="secondary"
										className="glass bg-secondary/80"
									>
										{tag}
									</Badge>
								))}
							</div>
						</div>

						<div className="prose prose-lg dark:prose-invert max-w-none overflow-hidden">
							<div className="text-xl text-muted-foreground mb-6">
								{post.excerpt}
							</div>
							<ReactMarkdown remarkPlugins={[remarkGfm]}>
								{post.content}
							</ReactMarkdown>
						</div>
					</div>
				</article>
			</main>
			<Footer />
		</div>
	);
}
