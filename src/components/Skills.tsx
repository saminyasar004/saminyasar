import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Skills() {
  const skillCategories = [
    {
      category: "Frontend",
      skills: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Shadcn UI"],
    },
    {
      category: "State Management",
      skills: ["Zustand", "Redux"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "NestJS", "Fastify"],
    },
    {
      category: "Databases",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Supabase"],
    },
    {
      category: "ORMs & ODMs",
      skills: ["Prisma", "Drizzle", "TypeORM", "Sequelize", "Mongoose"],
    },
    {
      category: "Validation",
      skills: ["Zod", "Joi"],
    },
    {
      category: "Tools & Others",
      skills: ["Git", "GitHub"],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold">
              Tech <span className="text-accent">Stack</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Technologies I work with to build amazing products
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                className="p-6 bg-card border-border hover:border-accent transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/20 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold mb-4 text-accent group-hover:scale-105 transition-transform">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="bg-secondary hover:bg-accent hover:text-accent-foreground transition-all cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
