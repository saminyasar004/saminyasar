import { useEffect } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Home, Briefcase, Code, MessageSquare, Newspaper, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("admin-auth");
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin-auth");
    navigate("/admin");
  };

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Briefcase, label: "Projects", path: "/admin/projects" },
    { icon: Code, label: "Skills", path: "/admin/skills" },
    { icon: MessageSquare, label: "Testimonials", path: "/admin/testimonials" },
    { icon: Newspaper, label: "Blog", path: "/admin/blog" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 glass-strong border-r border-border p-6 flex flex-col">
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-accent">Admin Panel</h2>
            <p className="text-sm text-muted-foreground">Portfolio Manager</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive && "bg-accent text-accent-foreground hover:bg-accent/90"
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto pt-6">
          <Button
            variant="outline"
            className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
