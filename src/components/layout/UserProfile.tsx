"use client";

import React from "react";
import { usePersona } from "@/context/PersonaContext";
import { User, ShieldCheck, Award } from "lucide-react";

export function UserProfile() {
  const { persona } = usePersona();

  return (
    <div className="flex items-center gap-3">
      {/* Role / Context Badge */}
      <div className="hidden md:flex flex-col items-end text-right">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-200">
            Welcome, Admin
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </div>
        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
          {persona === "mp_planner" ? (
            <>
              <Award className="w-3 h-3 text-emerald-400" />
              <span>Lok Sabha MP / District Planning</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-3 h-3 text-rose-400" />
              <span>MoSPI Central Oversight / Audit</span>
            </>
          )}
        </span>
      </div>

      {/* Avatar Icon */}
      <div className="relative group">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-800 border border-slate-700 text-slate-200 hover:border-slate-500 transition-colors cursor-pointer shadow-sm">
          <User className="w-4 h-4 text-slate-300" />
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0f172a]" />
      </div>
    </div>
  );
}
