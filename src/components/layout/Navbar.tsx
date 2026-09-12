"use client";

import React from "react";
import { LogoBadge } from "./LogoBadge";
import { PersonaToggle } from "./PersonaToggle";
import { UserProfile } from "./UserProfile";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0f172a] text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Govt / MoSPI Logo Placeholder */}
        <div className="flex-shrink-0">
          <LogoBadge />
        </div>

        {/* Center: Persona Toggle Switch */}
        <div className="flex items-center justify-center">
          <PersonaToggle />
        </div>

        {/* Right: User Profile */}
        <div className="flex-shrink-0">
          <UserProfile />
        </div>
      </div>
    </header>
  );
}
