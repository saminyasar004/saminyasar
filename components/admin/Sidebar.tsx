"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  LogOut,
  Layers,
  Code2
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
    <div className="w-64 border-r border-border bg-surface flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <Code2 className="h-5 w-5 text-brand" />
          <span className="text-lg tracking-tight text-foreground">Admin<span className="text-brand">.</span>sh</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-md transition-all text-sm",
              pathname === item.href 
                ? "bg-surface-2 text-brand border border-border" 
                : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
            )}
          >
            <item.icon className={cn("h-4 w-4", pathname === item.href ? "text-brand" : "text-muted-foreground")} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs font-mono"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="h-4 w-4 mr-3" />
          $ exit
        </Button>
      </div>
    </div>
  );
}
