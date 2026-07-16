"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, Command } from "lucide-react";

export function Header({ user }: { user: any }) {
  return (
    <header className="flex items-center justify-between h-16 px-6 border-b border-white/5 bg-cosmic-black/50 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 h-9 pl-10 pr-4 rounded-lg bg-white/5 border border-white/10 text-sm text-cosmic-starlight placeholder:text-white/30 focus:outline-none focus:border-cosmic-purple/50"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-white/20">
            <Command className="w-3 h-3" />
            <span className="text-xs">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant="cosmic" className="hidden sm:flex">
          Pro Plan
        </Badge>
        <Button variant="ghost" size="icon" className="relative text-white/40 hover:text-white">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </Button>
      </div>
    </header>
  );
}
