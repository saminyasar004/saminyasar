import { Card } from "@/components/ui/card";
import { Code2, Rocket, Users } from "lucide-react";

export function About() {
  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable and scalable code with best practices",
    },
    {
      icon: Rocket,
      title: "Fast Delivery",
      description: "Efficient development with modern tools and workflows",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Strong team player with excellent communication skills",
    },
  ];

  return (
    <section id="about" className="py-20 bg-section-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold">
              About <span className="text-accent">Me</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Passionate developer with a love for building amazing web experiences
            </p>
          </div>

          <div className="space-y-6 text-center md:text-left animate-fade-in-up">
            <p className="text-lg leading-relaxed text-foreground/90">
              I'm a Full Stack JavaScript Developer who started coding in 2020. 
              What began as curiosity quickly turned into a passion for creating 
              elegant and efficient web applications.
            </p>
            <p className="text-lg leading-relaxed text-foreground/90">
              I specialize in building modern, responsive, and performant applications 
              using cutting-edge technologies. From frontend to backend, databases to 
              deployment, I enjoy every aspect of the development lifecycle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <Card
                key={index}
                className="p-6 bg-card hover:bg-card/80 border-border hover:border-accent transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/20 animate-scale-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <item.icon className="h-12 w-12 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
