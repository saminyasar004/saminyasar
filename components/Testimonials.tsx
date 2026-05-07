"use client";

import { Testimonial } from "@prisma/client";
import { CodeCard } from "./CodeCard";
import { SectionHeading } from "./SectionHeading";
import Image from "next/image";

interface TestimonialsProps {
  initialTestimonials: Testimonial[];
}

export function Testimonials({ initialTestimonials }: TestimonialsProps) {
  return (
    <section id="testimonials" className="container-page py-20 border-t border-border">
      <SectionHeading tag="Testimonials" title="kind words" />
      <div className="grid md:grid-cols-2 gap-5">
        {initialTestimonials.map((t) => (
          <CodeCard key={t.id} title={`${t.author.toLowerCase().replace(/\s/g, "-")}.txt`}>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                <span className="text-syntax-comment">"</span>
                {t.content}
                <span className="text-syntax-comment">"</span>
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="relative w-10 h-10 rounded-md overflow-hidden border border-border bg-surface-2">
                  {t.avatarUrl && (
                    <Image
                      src={t.avatarUrl}
                      alt={t.author}
                      fill
                      sizes="40px"
                      className="object-cover"
                      unoptimized={t.avatarUrl.includes("/raw/upload/") || t.avatarUrl.endsWith(".svg")}
                    />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{t.author}</div>
                  <div className="text-[11px] text-brand uppercase tracking-wider">{t.role} {t.company && `· ${t.company}`}</div>
                </div>
              </div>
            </div>
          </CodeCard>
        ))}
      </div>
    </section>
  );
}
