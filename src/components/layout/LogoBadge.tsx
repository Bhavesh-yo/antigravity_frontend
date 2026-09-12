"use client";

import React from "react";
import { Sparkles, Landmark } from "lucide-react";

export function LogoBadge() {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Government Logo / Emblem Placeholder */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 via-slate-800 to-slate-900 border border-amber-400/30 text-amber-300 shadow-inner">
        <Landmark className="w-5 h-5 text-amber-400" />
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0f172a]" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            Govt. of India • MoSPI
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
            e-SAKSHI
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-1">
            MPLADS AI
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-sm font-semibold">
              Dashboard
            </span>
          </h1>
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 opacity-90 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
