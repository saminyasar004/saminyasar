"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: Briefcase },
  { href: "/dashboard/blogs", label: "Blogs", icon: FileText },
  { href: "/dashboard/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/dashboard/skills", label: "Skills", icon: Layers },
];

export function Sidebar() {
  const pathname = usePathname();

  if (pathname === "/dashboard/login") return null;

  return (
    <div className="w-64 border-r border-border bg-card flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold text-accent">Admin Panel</h2>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
              pathname === item.href 
                ? "bg-accent text-accent-foreground" 
                : "text-muted-foreground hover:bg-secondary"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
