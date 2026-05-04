import { Card } from "@/components/ui/card";
import { Code2, Rocket, Users } from "lucide-react";
import { globalSettings } from "@/lib/constants";
import Image from "next/image";

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
    <section
      id="about"
      className="py-20 bg-section-bg relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231DD881' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-full mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold">
              About <span className="text-accent">Me</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Passionate developer with a love for building amazing web experiences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6 animate-fade-in-up">
              <p className="text-lg leading-relaxed text-foreground/90">
                I'm a Full Stack JavaScript Developer who started coding in 2020.
                What began as curiosity quickly turned into a passion for creating
                elegant and efficient web applications.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90">
                I specialize in building modern, responsive, and performant
                applications using cutting-edge technologies. From frontend to
                backend, databases to deployment, I enjoy every aspect of the
                development lifecycle.
              </p>

              {/* Highlight Cards */}
              <div className="grid md:grid-cols-3 gap-4 pt-4">
                {highlights.map((item, index) => (
                  <Card
                    key={index}
                    className="p-6 glass-strong border-border hover:border-accent transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/20 animate-scale-in group"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <item.icon className="h-10 w-10 text-accent mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Column - Photo with Artistic Frame */}
            <div
              className="relative animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative max-w-md mx-auto">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-gradient-end/30 rounded-[2rem] blur-2xl animate-pulse" />

                {/* Main photo frame */}
                <div className="relative">
                  {/* Artistic border layers */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-accent via-gradient-end to-accent rounded-[2rem] opacity-50 animate-glow" />
                  <div className="absolute -inset-2 glass-strong rounded-[1.8rem]" />

                  {/* Photo container */}
                  <div className="relative glass-strong rounded-[1.5rem] p-2 overflow-hidden aspect-square">
                    <Image
                      src={globalSettings.photoUrl}
                      alt="Samin Yasar"
                      fill
                      className="object-cover rounded-[1.3rem] transition-transform hover:scale-105 duration-500"
                    />

                    {/* Decorative corner elements */}
                    <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-accent rounded-tl-2xl" />
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-accent rounded-br-2xl" />
                  </div>
                </div>

                {/* Floating decorative elements */}
                <div className="absolute -top-6 -right-6 glass rounded-full p-4 animate-float">
                  <Code2 className="h-8 w-8 text-accent" />
                </div>
                <div
                  className="absolute -bottom-6 -left-6 glass rounded-full p-4 animate-float"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Rocket className="h-8 w-8 text-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
