import { prisma } from "@/lib/prisma";
import { Blog } from "@prisma/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export default async function BlogListPage() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold">
                My <span className="text-accent">Blog</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Thoughts, tutorials and insights about software development
              </p>
            </div>

            <div className="grid gap-8">
              {blogs.map((post: Blog) => (
                <Card key={post.id} className="overflow-hidden glass-strong border-border hover:border-accent transition-all group">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="relative w-full md:w-80 h-64 md:h-auto overflow-hidden bg-muted">
                      {post.coverImage && (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 320px"
                          className="object-cover transition-transform group-hover:scale-105 duration-500"
                        />
                      )}
                    </div>
                    <div className="p-8 flex-1 space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold group-hover:text-accent transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {post.excerpt}
                      </p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-accent hover:text-accent/80 transition-colors"
                        asChild
                      >
                        <Link href={`/blog/${post.slug}`}>
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {blogs.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                No blog posts yet. Check back soon!
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
