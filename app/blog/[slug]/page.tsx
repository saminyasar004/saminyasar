import { prisma } from "@/lib/prisma";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <article className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-accent hover:text-accent/80 transition-colors mb-8 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>

          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </div>

            {post.coverImage && (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-a:text-accent hover:prose-a:text-accent/80 prose-strong:text-foreground">
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
