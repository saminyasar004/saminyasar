import { prisma } from "@/lib/prisma";
import { Briefcase, FileText, MessageSquare, Layers } from "lucide-react";
import { CodeCard } from "@/components/CodeCard";

export default async function DashboardPage() {
  const counts = await Promise.all([
    prisma.project.count(),
    prisma.blog.count(),
    prisma.testimonial.count(),
    prisma.skill.count(),
  ]);

  const stats = [
    { label: "Projects", count: counts[0], icon: Briefcase, file: "projects.db" },
    { label: "Blogs", count: counts[1], icon: FileText, file: "posts.json" },
    { label: "Testimonials", count: counts[2], icon: MessageSquare, file: "feedback.txt" },
    { label: "Skills", count: counts[3], icon: Layers, file: "stack.config" },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-medium tracking-tight">
          <span className="text-syntax-comment">$ </span>ls -la /dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Admin session active. Monitoring system metrics...</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <CodeCard key={stat.label} title={stat.file} badge="read-only">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-3xl font-medium text-brand">{stat.count}</div>
              </div>
              <stat.icon className="h-8 w-8 text-muted-foreground opacity-20" />
            </div>
          </CodeCard>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <CodeCard title="system-log.sh" badge="● live">
          <div className="font-mono text-xs space-y-2">
            <div className="flex gap-2">
              <span className="text-syntax-comment">[{new Date().toLocaleTimeString()}]</span>
              <span className="text-syntax-keyword">AUTH</span>
              <span className="text-foreground">Admin session initialized successfully.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-syntax-comment">[{new Date().toLocaleTimeString()}]</span>
              <span className="text-brand">INFO</span>
              <span className="text-foreground">Dashboard metrics updated from database.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-syntax-comment">[{new Date().toLocaleTimeString()}]</span>
              <span className="text-syntax-var">SYS</span>
              <span className="text-foreground">All systems operational. Listening on port 3000.</span>
            </div>
          </div>
        </CodeCard>
        
        <CodeCard title="readme.md">
          <div className="text-sm text-muted-foreground space-y-3">
            <p className="text-foreground font-medium">Quick Actions:</p>
            <ul className="space-y-2 list-inside list-disc">
              <li>Deploy latest changes to production</li>
              <li>Review pending testimonials</li>
              <li>Sync GitHub activity data</li>
            </ul>
          </div>
        </CodeCard>
      </div>
    </div>
  );
}
