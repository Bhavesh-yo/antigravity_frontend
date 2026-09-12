"use client";

import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  PieChart as PieChartIcon,
  BarChart3,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Layers,
  ChevronRight,
} from "lucide-react";
import {
  mockFraudTypologyData,
  mockSectorVulnerabilityData,
  type FraudTypologyItem,
  type SectorVulnerabilityItem,
} from "@/data/mockData";

/* ── Custom Tooltip for Donut Chart ─────────────────────────────── */
interface DonutTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: FraudTypologyItem;
  }>;
}

const DonutTooltip = ({ active, payload }: DonutTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0f172a] text-white p-3 rounded-xl shadow-xl border border-slate-700/80 text-xs min-w-[210px] z-50">
        <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-2">
          <span className="font-bold text-slate-100 flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            {data.name}
          </span>
          <span className="font-extrabold text-rose-400">{data.percentage}%</span>
        </div>
        <div className="space-y-1 text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-400">Total Flagged:</span>
            <span className="font-semibold text-white">{data.flagCount} projects</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Est. Risk Capital:</span>
            <span className="font-semibold text-rose-300">₹ {data.estimatedRiskCr} Cr</span>
          </div>
        </div>
        <p className="mt-2 pt-1.5 border-t border-slate-800 text-[11px] text-slate-400 italic leading-snug">
          {data.description}
        </p>
      </div>
    );
  }
  return null;
};

/* ── Custom Tooltip for Bar Chart ───────────────────────────────── */
interface BarTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: SectorVulnerabilityItem;
  }>;
  label?: string;
}

const BarTooltip = ({ active, payload, label }: BarTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#0f172a] text-white p-3 rounded-xl shadow-xl border border-slate-700/80 text-xs min-w-[220px] z-50">
        <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-2">
          <span className="font-bold text-slate-100">{label}</span>
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
              data.riskLevel === "Critical"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                : data.riskLevel === "High"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
            }`}
          >
            {data.riskLevel} Risk
          </span>
        </div>
        <div className="space-y-1 text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-400">Total Red Flags:</span>
            <span className="font-bold text-white">{data.totalRedFlags} projects</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Share of All Frauds:</span>
            <span className="font-bold text-rose-400">{data.percentage}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Capital at Risk:</span>
            <span className="font-bold text-amber-300">₹ {data.amountAtRiskCr} Cr</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function FraudTypologySection() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedTypology, setSelectedTypology] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section aria-labelledby="typology-vulnerability-heading" className="mb-8">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-rose-600" />
        <h3
          id="typology-vulnerability-heading"
          className="text-lg font-bold text-[#0f172a]"
        >
          Fraud Typology &amp; Sector Vulnerability
        </h3>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          B.3
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── 1. Donut Chart: Fraud Typology ──────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <PieChartIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0f172a]">
                    Fraud Typology Distribution
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Breakdown of ML anomaly detection classifications
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                42 Anomalies
              </span>
            </div>

            {/* Donut Chart Container */}
            <div className="h-[220px] w-full flex items-center justify-center relative">
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockFraudTypologyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="percentage"
                      nameKey="name"
                      cursor="pointer"
                      onClick={(_, idx) => {
                        const item = mockFraudTypologyData[idx];
                        if (item) {
                          setSelectedTypology(
                            selectedTypology === item.id ? null : item.id
                          );
                        }
                      }}
                    >
                      {mockFraudTypologyData.map((entry) => (
                        <Cell
                          key={`cell-${entry.id}`}
                          fill={entry.color}
                          stroke={
                            selectedTypology === entry.id ? "#0f172a" : "#ffffff"
                          }
                          strokeWidth={selectedTypology === entry.id ? 3 : 2}
                          className="transition-all duration-200 hover:opacity-90"
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<DonutTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-400">
                  Loading Typology Chart...
                </div>
              )}

              {/* Center Stat inside Donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-[#0f172a] tracking-tight">
                  100%
                </span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Audit Scope
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Legend / Breakdown Pills */}
          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2">
            {mockFraudTypologyData.map((item) => {
              const isSelected = selectedTypology === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setSelectedTypology(isSelected ? null : item.id)
                  }
                  className={`text-left p-2.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-rose-50/80 border-rose-300 ring-2 ring-rose-400/20"
                      : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/70"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs font-bold text-[#0f172a] truncate">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="text-[11px] font-medium text-slate-700 truncate">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {item.flagCount} projects
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 2. Bar Chart: Sector Vulnerability ──────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0f172a]">
                    Sector Vulnerability Index
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Total red flags detected across project sectors
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                <AlertTriangle className="w-3 h-3" />
                Infra at 60%
              </span>
            </div>

            {/* Bar Chart Container */}
            <div className="h-[220px] w-full">
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockSectorVulnerabilityData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f1f5f9"
                    />
                    <XAxis
                      dataKey="sector"
                      tick={{ fill: "#475569", fontSize: 11, fontWeight: 500 }}
                      axisLine={{ stroke: "#e2e8f0" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#64748b", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 30]}
                      unit=" flags"
                    />
                    <Tooltip content={<BarTooltip />} cursor={{ fill: "#f8fafc" }} />
                    <Bar
                      dataKey="totalRedFlags"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={48}
                    >
                      {mockSectorVulnerabilityData.map((entry) => {
                        const barColor =
                          entry.sector === "Infrastructure"
                            ? "#e11d48" // crimson / rose-600 (60%)
                            : entry.sector === "Sanitation"
                              ? "#f43f5e" // rose-500 (25%)
                              : entry.sector === "Health"
                                ? "#fb7185" // rose-400 (10%)
                                : "#cbd5e1"; // slate-300 (5%)
                        return <Cell key={`bar-${entry.sector}`} fill={barColor} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-400">
                  Loading Vulnerability Chart...
                </div>
              )}
            </div>
          </div>

          {/* Sector Breakdown Badges */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-500">Highest Risk:</span>
              <span className="font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Infrastructure (60%)
              </span>
              <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Sanitation (25%)
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Total: 42 Flags</span>
          </div>
        </div>
      </div>
    </section>
  );
}
