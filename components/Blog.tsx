import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Blog as BlogPost } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BlogProps {
  initialBlogs: BlogPost[];
}

export function Blog({ initialBlogs }: BlogProps) {
  return (
    <section
      id="blog"
      className="py-20 bg-section-bg relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-full mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold">
              Latest <span className="text-accent">Articles</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Thoughts on technology and development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialBlogs.slice(0, 3).map((post, index) => (
              <Card
                key={post.id}
                className="overflow-hidden glass-strong border-border hover:border-accent transition-all hover:shadow-lg animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  {post.coverImage && (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                  )}
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}</span>
                  </div>
                  <h3 className="text-xl font-bold line-clamp-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">
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
              </Card>
            ))}
          </div>

          <div className="text-center pt-8">
            <Button
              variant="outline"
              size="lg"
              className="glass border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all"
              asChild
            >
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
