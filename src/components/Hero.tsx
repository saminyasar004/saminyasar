import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";

export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gradient-start/20 via-background to-gradient-end/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent)/0.1),transparent_50%)]" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-end/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <p className="text-accent font-medium text-lg animate-slide-in-right">
              Hi there, I'm
            </p>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent animate-scale-in">
              Samin Yasar
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Full Stack JavaScript Developer
            </h2>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Crafting elegant solutions with modern web technologies since 2020.
            Passionate about building scalable applications and turning ideas into reality.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 shadow-lg hover:shadow-accent/50 transition-all hover:scale-105"
            >
              Get In Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all hover:scale-105"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-all hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-muted-foreground hover:text-accent transition-all hover:scale-110"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-6 w-6 text-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
