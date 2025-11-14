import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function Skills() {
  const { skills } = usePortfolioStore();
  
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="skills" className="py-20 bg-background relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-section-bg/50 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
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
            {Object.entries(skillsByCategory).map(([category, categorySkills], index) => (
              <Card
                key={category}
                className="p-6 glass-strong border-border hover:border-accent transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/20 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold mb-4 text-accent group-hover:scale-105 transition-transform">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className="glass bg-secondary/80 hover:bg-accent hover:text-accent-foreground transition-all cursor-default px-3 py-1.5 flex items-center gap-2"
                    >
                      <img 
                        src={skill.icon} 
                        alt={skill.name}
                        className="w-4 h-4"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span>{skill.name}</span>
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
