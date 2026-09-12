"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { TopKpiRow } from "@/components/mp-planner/TopKpiRow";
import { SectorGapAnalysis } from "@/components/mp-planner/SectorGapAnalysis";
import { CostBenchmarkingTool } from "@/components/mp-planner/CostBenchmarkingTool";
import { ConvergenceBoard } from "@/components/mp-planner/ConvergenceBoard";

export function MpPlannerShell() {
  return (
    <main
      id="main-content-panel"
      role="tabpanel"
      aria-labelledby="tab-mp-planner"
      className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-opacity duration-300"
    >
      {/* View Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              MP Planner Mode Active
            </span>
            <span className="text-xs font-medium text-slate-500">Theme A</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#0f172a] tracking-tight">
            Smart Fund Utilization Dashboard
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Optimizing fund allocation, detecting development gaps, and enabling inter-constituency convergence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-slate-700 border border-slate-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            AI Recommendations Ready
          </span>
        </div>
      </div>

      {/* A.1. Top KPI Row (4 Cards) */}
      <TopKpiRow />

      {/* Main Content Grid: A.2 Sector Gap Analysis & A.3 Cost Benchmarking Tool */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-stretch">
        {/* A.2. Sector Gap Analysis (Live Recharts Bar Chart) */}
        <SectorGapAnalysis />

        {/* A.3. Cost Benchmarking Tool (Live Debounced Search Component) */}
        <CostBenchmarkingTool />
      </div>

      {/* A.4. Convergence Board (Paginated Data Table with Modal Action) */}
      <ConvergenceBoard />
    </main>
  );
}
