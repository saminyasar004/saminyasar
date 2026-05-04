import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Briefcase, FileText, MessageSquare, Layers } from "lucide-react";

export default async function DashboardPage() {
  const counts = await Promise.all([
    prisma.project.count(),
    prisma.blog.count(),
    prisma.testimonial.count(),
    prisma.skill.count(),
  ]);

  const stats = [
    { label: "Projects", count: counts[0], icon: Briefcase, color: "text-blue-500" },
    { label: "Blogs", count: counts[1], icon: FileText, color: "text-green-500" },
    { label: "Testimonials", count: counts[2], icon: MessageSquare, color: "text-yellow-500" },
    { label: "Skills", count: counts[3], icon: Layers, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back, Admin.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="glass-strong border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
