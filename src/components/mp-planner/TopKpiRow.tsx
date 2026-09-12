"use client";

import React from "react";
import { mockMpKpiData, MpKpiData } from "@/data/mockData";
import {
  IndianRupee,
  Activity,
  AlertTriangle,
  Trophy,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface TopKpiRowProps {
  data?: MpKpiData;
}

export function TopKpiRow({ data = mockMpKpiData }: TopKpiRowProps) {
  return (
    <section
      aria-label="MP Key Performance Indicators"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8"
    >
      {/* 1. Total Funds Available */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Funds Available
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/80 group-hover:scale-105 transition-transform">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              {data.totalFunds.formatted}
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            Out of {data.totalFunds.entitlement} annual entitlement
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-emerald-600 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{data.totalFunds.utilizationRate}% Utilized</span>
          </div>
          <span className="text-slate-400">FY 2026-27</span>
        </div>
      </div>

      {/* 2. Active Projects */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Active Projects
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/80 group-hover:scale-105 transition-transform">
              <Activity className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              {data.activeProjects.count}
            </span>
            <span className="text-xs font-medium text-slate-500">
              works ongoing
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            {data.activeProjects.onSchedule} on schedule • {data.activeProjects.underReview} under review
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
            status != "Completed"
          </span>
          <span className="text-slate-400">Live API</span>
        </div>
      </div>

      {/* 3. Stalled Projects Nearby */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Stalled Projects Nearby
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100/80 group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 tracking-tight">
              {data.stalledProjectsNearby.count}
            </span>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Convergence Pool
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium line-clamp-1">
            {data.stalledProjectsNearby.neighboringDistricts.join(", ")}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-600 font-medium">
            Funding Gap: <strong className="text-[#0f172a]">{data.stalledProjectsNearby.potentialConvergenceAmt}</strong>
          </span>
          <span className="text-amber-600 font-semibold flex items-center gap-0.5 group-hover:underline cursor-pointer">
            View <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* 4. Top Implementing Agency */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Top Implementing Agency
            </span>
            <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100/80 group-hover:scale-105 transition-transform">
              <Trophy className="w-4 h-4" />
            </div>
          </div>

          <div className="mb-1">
            <h4 className="text-base sm:text-lg font-bold text-[#0f172a] leading-tight line-clamp-2">
              {data.topImplementingAgency.name}
            </h4>
          </div>

          <p className="text-xs text-slate-500 font-medium mt-1">
            District: {data.topImplementingAgency.district}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-violet-50 text-violet-700 border border-violet-200/60">
              <Sparkles className="w-3 h-3 text-violet-500" />
              {data.topImplementingAgency.rating} ★
            </span>
            <span className="text-slate-500 font-medium">
              {data.topImplementingAgency.onTimeRate}% on-time
            </span>
          </div>
          <span className="text-xs font-semibold text-emerald-600">Top IDA</span>
        </div>
      </div>
    </section>
  );
}
