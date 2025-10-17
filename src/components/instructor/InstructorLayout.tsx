import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, LayoutDashboard, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InstructorLayoutProps {
  children: React.ReactNode;
}

export const InstructorLayout = ({ children }: InstructorLayoutProps) => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/instructor", icon: LayoutDashboard },
    { name: "courses", href: "/instructor/courses", icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6 justify-between">
          <div className="flex items-center gap-4">
            <img src="/pma-logo.png" alt="PMA" className="h-8" />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center">
                6
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-48 border-r bg-card min-h-[calc(100vh-4rem)]">
          <div className="p-4 space-y-2">
            <div className="mb-4">
              <Input
                type="search"
                placeholder="Search"
                className="h-9 text-sm"
              />
            </div>
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[hsl(43,74%,49%)] text-white"
                        : "text-foreground hover:bg-accent"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};
