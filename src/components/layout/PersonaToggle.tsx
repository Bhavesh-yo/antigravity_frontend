"use client";

import React from "react";
import { usePersona, PersonaMode } from "@/context/PersonaContext";
import { Compass, ShieldAlert, CheckCircle2 } from "lucide-react";

export function PersonaToggle() {
  const { persona, setPersona } = usePersona();

  return (
    <div
      role="tablist"
      aria-label="Dashboard Persona Selector"
      className="inline-flex items-center p-1 rounded-xl bg-slate-950/80 border border-slate-800/90 shadow-inner backdrop-blur-sm"
    >
      {/* MP Planner Mode Tab */}
      <button
        type="button"
        role="tab"
        id="tab-mp-planner"
        aria-selected={persona === "mp_planner"}
        aria-controls="main-content-panel"
        onClick={() => setPersona("mp_planner")}
        className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
          persona === "mp_planner"
            ? "bg-slate-800 text-emerald-300 shadow-sm border border-emerald-500/40"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
        }`}
      >
        <span
          className={`flex items-center justify-center w-5 h-5 rounded-md transition-colors ${
            persona === "mp_planner"
              ? "bg-emerald-500/20 text-emerald-400"
              : "text-slate-500 group-hover:text-slate-300"
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
        </span>
        <span>MP Planner Mode</span>
        {persona === "mp_planner" && (
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        )}
      </button>

      {/* Oversight Mode Tab */}
      <button
        type="button"
        role="tab"
        id="tab-oversight"
        aria-selected={persona === "oversight"}
        aria-controls="main-content-panel"
        onClick={() => setPersona("oversight")}
        className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${
          persona === "oversight"
            ? "bg-slate-800 text-rose-300 shadow-sm border border-rose-500/40"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
        }`}
      >
        <span
          className={`flex items-center justify-center w-5 h-5 rounded-md transition-colors ${
            persona === "oversight"
              ? "bg-rose-500/20 text-rose-400"
              : "text-slate-500 group-hover:text-slate-300"
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
        </span>
        <span>Oversight Mode</span>
        {persona === "oversight" && (
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
        )}
      </button>
    </div>
  );
}
