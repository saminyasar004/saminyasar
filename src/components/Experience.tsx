import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export function Experience() {
  const timeline = [
    {
      year: "2020",
      title: "Started Coding Journey",
      description: "Began learning web development with JavaScript and fell in love with programming.",
    },
    {
      year: "2021",
      title: "Frontend Mastery",
      description: "Mastered React, TypeScript, and modern CSS frameworks. Built multiple projects.",
    },
    {
      year: "2022",
      title: "Full Stack Development",
      description: "Expanded skills to backend development with Node.js, Express, and databases.",
    },
    {
      year: "2023",
      title: "Advanced Technologies",
      description: "Learned NestJS, multiple ORMs, and advanced architectural patterns.",
    },
    {
      year: "2024",
      title: "Professional Growth",
      description: "Continuing to build innovative solutions and staying updated with latest tech.",
    },
  ];

  return (
    <section id="experience" className="py-20 bg-section-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold">
              My <span className="text-accent">Journey</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              A timeline of my growth as a developer
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/30 transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center gap-8 animate-fade-in-up ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-accent rounded-full transform md:-translate-x-1/2 animate-glow" />

                  {/* Content card */}
                  <div className="ml-8 md:ml-0 md:w-[calc(50%-2rem)] flex-shrink-0">
                    <Card className="p-6 bg-card border-border hover:border-accent transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/20 group">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="h-5 w-5 text-accent" />
                        <span className="text-accent font-semibold">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </Card>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
