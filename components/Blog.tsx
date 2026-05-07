"use client";

import { Blog as BlogPost } from "@prisma/client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

interface BlogProps {
  initialBlogs: BlogPost[];
}

export function Blog({ initialBlogs }: BlogProps) {
  return (
    <section id="blog" className="container-page py-20 border-t border-border">
      <SectionHeading tag="Blog" title="latest thoughts" />
      <div className="grid gap-4 md:grid-cols-2">
        {initialBlogs.slice(0, 4).map((post) => (
          <article key={post.id} className="group rounded-lg border border-border bg-surface p-5 hover:border-brand/50 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-medium text-foreground">{post.title}</h3>
              <Link href={`/blog/${post.slug}`} className="text-muted-foreground group-hover:text-foreground transition-colors">
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ""}</span>
              <Link href={`/blog/${post.slug}`} className="text-brand hover:underline">Read more</Link>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/blog" className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-6 py-2 text-sm hover:border-brand/50 transition">
          View all posts <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
