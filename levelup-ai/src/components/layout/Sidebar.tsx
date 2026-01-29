"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Swords,
  Trophy,
  User,
  Zap,
  Settings,
  Home,
  Target,
} from "lucide-react";

interface SidebarProps {
  username?: string;
}

const navItems = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/battle", icon: Swords, label: "Battle Arena" },
  { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  { href: "/challenges", icon: Target, label: "Practice" },
];

export function Sidebar({ username }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r bg-card">
      <div className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t p-4">
        <nav className="space-y-1">
          {username && (
            <Link
              href={`/profile/${username}`}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname.includes("/profile")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
          )}
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/settings"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>
    </aside>
  );
}
