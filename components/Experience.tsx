"use client";

import { SectionHeading } from "./SectionHeading";

export function Experience() {
  const timeline = [
    {
      year: "2020",
      org: "Self-Taught",
      title: "The Spark: Coding Journey Begins",
      desc: "Began my self-taught journey by mastering JavaScript and diving into the web ecosystem. Fell in love with the power of logic and creativity.",
    },
    {
      year: "Nov 2022 – Jun 2024",
      org: "Noakso Private Ltd.",
      title: "Frontend Web Developer",
      desc: "Built responsive web applications focused on user-friendly interfaces for construction & rental services. Collaborated on REST API integrations and performance optimization.",
    },
    {
      year: "Aug 2023 – Present",
      org: "International University of Scholars",
      title: "BSc in Computer Science",
      desc: "Deepening theoretical foundations in engineering while balancing professional projects, with focus on scalable architecture and algorithms.",
    },
    {
      year: "May 2025 – Apr 2026",
      org: "Join Venture AI",
      title: "Full Stack Web Developer",
      desc: "Architected AI-driven dashboards and integrated complex Node.js APIs. Reduced load times by 25% through advanced code splitting and DB query optimization.",
    },
    {
      year: "2026 & Beyond",
      org: "Future-Focused",
      title: "Architecting High-Impact Solutions",
      desc: "Leading development of platforms like DPM and CareNestPro. Exploring AI governance, Blockchain, and highly scalable cloud systems.",
    },
  ];

  return (
    <section id="journey" className="container-page py-20 border-t border-border">
      <SectionHeading 
        tag="Journey" 
        title="timeline" 
        subtitle="A curated timeline of milestones and the evolution of my technical expertise." 
      />
      <div className="relative pl-6 border-l border-border space-y-8">
        {timeline.map((j, i) => (
          <div key={i} className="relative">
            <span className="absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-background" />
            <div className="text-xs text-muted-foreground">{j.year} · <span className="text-foreground">{j.org}</span></div>
            <h3 className="mt-1 text-base md:text-lg font-medium">{j.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{j.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
