"use client";

import React from "react";
import { mockOversightKpiData, OversightKpiData } from "@/data/mockData";
import {
  ShieldAlert,
  TrendingDown,
  AlertTriangle,
  Building2,
  ArrowUpRight,
  Flame,
  FileWarning,
} from "lucide-react";

interface OversightKpiRowProps {
  data?: OversightKpiData;
}

export function OversightKpiRow({ data = mockOversightKpiData }: OversightKpiRowProps) {
  return (
    <section
      aria-label="Oversight Key Performance Indicators"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8"
    >
      {/* 1. Total High-Risk Projects (Red Font) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total High-Risk Projects
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-1">
            {/* Red font as explicitly requested in spec and prompt */}
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-600 tracking-tight">
              {data.highRiskProjects.count}
            </span>
            <span className="text-xs font-medium text-slate-500">
              projects flagged
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            {data.highRiskProjects.subtext}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <Flame className="w-3 h-3 text-rose-500" />
            {data.highRiskProjects.threshold}
          </span>
          <span className="text-rose-600 font-semibold text-[11px]">Immediate Audit</span>
        </div>
      </div>

      {/* 2. Estimated Funds at Risk */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Estimated Funds at Risk
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 group-hover:scale-105 transition-transform">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              {data.fundsAtRisk.amount}
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            {data.fundsAtRisk.subtext}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-rose-600 font-semibold">
            <FileWarning className="w-3.5 h-3.5" />
            <span>{data.fundsAtRisk.percentageOfTotalAudit}% of Audited Capital</span>
          </div>
          <span className="text-slate-400">Live DB</span>
        </div>
      </div>

      {/* 3. Highest Risk Constituency */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Highest Risk Constituency
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              {data.highestRiskConstituency.name}
            </span>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              CRI: {data.highestRiskConstituency.criScore}
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            FAR: {data.highestRiskConstituency.farPercent}% • FIR: {data.highestRiskConstituency.firPercent}%
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">
            Ranked #1 in State Vulnerability
          </span>
          <span className="text-rose-600 font-semibold flex items-center gap-0.5 group-hover:underline cursor-pointer">
            Inspect <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* 4. Highest Risk Agency */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Highest Risk Agency
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 group-hover:scale-105 transition-transform">
              <Building2 className="w-4 h-4" />
            </div>
          </div>

          <div className="mb-1">
            <h4 className="text-base sm:text-lg font-bold text-[#0f172a] leading-tight line-clamp-2">
              {data.highestRiskAgency.name}
            </h4>
          </div>

          <p className="text-xs text-slate-500 font-medium mt-1">
            {data.highestRiskAgency.totalAnomalies} flagged anomalies across projects
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
              {data.highestRiskAgency.anomalyRatePercent}% Anomaly Rate
            </span>
          </div>
          <span className="text-xs font-bold text-rose-600">IDA Audit</span>
        </div>
      </div>
    </section>
  );
}
