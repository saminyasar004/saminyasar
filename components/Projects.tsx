"use client";

import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Project } from "@prisma/client";
import { SectionHeading } from "./SectionHeading";

interface ProjectsProps {
  initialProjects: Project[];
}

export function Projects({ initialProjects }: ProjectsProps) {
  return (
    <section id="projects" className="container-page py-20 border-t border-border">
      <SectionHeading tag="Projects" title="featured work" />
      <div className="grid gap-4 md:grid-cols-2">
        {initialProjects.map((p) => (
          <article key={p.id} className="group rounded-lg border border-border bg-surface p-5 hover:border-brand/50 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-medium text-foreground">{p.title}</h3>
              <a href={p.liveUrl || "#"} target="_blank" rel="noreferrer" className="text-muted-foreground group-hover:text-foreground transition-colors">
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">{p.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="chip text-[11px]">{t}</span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs">
              {p.githubUrl && p.githubUrl !== "#" && (
                <a href={p.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <Github className="h-3.5 w-3.5" /> Code
                </a>
              )}
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <ExternalLink className="h-3.5 w-3.5" /> Live
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
