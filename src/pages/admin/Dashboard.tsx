import { Card } from "@/components/ui/card";
import { Briefcase, Code, MessageSquare, Newspaper } from "lucide-react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { projects, skills, testimonials, blogPosts } = usePortfolioStore();

  const stats = [
    {
      icon: Briefcase,
      label: "Projects",
      count: projects.length,
      color: "text-blue-500",
      path: "/admin/projects",
    },
    {
      icon: Code,
      label: "Skills",
      count: skills.length,
      color: "text-green-500",
      path: "/admin/skills",
    },
    {
      icon: MessageSquare,
      label: "Testimonials",
      count: testimonials.length,
      color: "text-purple-500",
      path: "/admin/testimonials",
    },
    {
      icon: Newspaper,
      label: "Blog Posts",
      count: blogPosts.length,
      color: "text-orange-500",
      path: "/admin/blog",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Manage your portfolio content</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} to={stat.path}>
              <Card className="p-6 glass-strong border-border hover:border-accent transition-all hover:scale-105 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-full bg-accent/10", stat.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.count}</p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
