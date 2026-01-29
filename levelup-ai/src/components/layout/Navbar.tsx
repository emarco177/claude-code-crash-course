"use client";

import Link from "next/link";
import { Swords, Trophy, User, Zap, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { XPBar } from "@/components/gamification/XPBar";

interface NavbarProps {
  user?: {
    totalXp: number;
    currentLevel: number;
    username: string;
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
              LevelUp AI
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" asChild>
              <Link href="/learn" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Learn
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/battle" className="flex items-center gap-2">
                <Swords className="h-4 w-4" />
                Battle
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/leaderboard" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Leaderboard
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/challenges" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Practice
              </Link>
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden sm:block w-48">
                <XPBar
                  totalXp={user.totalXp}
                  currentLevel={user.currentLevel}
                  showDetails={false}
                />
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/profile/${user.username}`}>
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
