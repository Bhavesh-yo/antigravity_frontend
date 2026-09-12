"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { mockSectorGapData, SectorGapItem } from "@/data/mockData";
import { AlertCircle, Lightbulb, BarChart3, TrendingDown, TrendingUp } from "lucide-react";

interface SectorGapAnalysisProps {
  data?: SectorGapItem[];
  totalFundsCr?: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
    payload: SectorGapItem;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const isUnder = item.gap_amount_cr < 0;
    const absGapCr = Math.abs(item.gap_amount_cr).toFixed(2);
    const absGapPct = Math.abs(item.gap_percentage);

    return (
      <div className="bg-[#0f172a] text-white p-3.5 rounded-xl shadow-xl border border-slate-700/80 text-xs min-w-[240px] z-50">
        <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 mb-2">
          <span className="font-bold text-sm text-slate-100">{item.sector}</span>
          {item.isGapDetected ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30">
              <AlertCircle className="w-2.5 h-2.5" />
              Gap Detected
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
              Optimal
            </span>
          )}
        </div>

        <div className="space-y-1.5 mb-2.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              MP Spend:
            </span>
            <span className="font-bold text-white">{item.mp_spend}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              State Average:
            </span>
            <span className="font-semibold text-slate-300">{item.state_avg}%</span>
          </div>
        </div>

        {/* Calculated Monetary Gap as requested by spec */}
        <div
          className={`p-2 rounded-lg border text-[11px] leading-relaxed ${
            isUnder
              ? "bg-rose-950/40 border-rose-500/30 text-rose-200"
              : "bg-emerald-950/40 border-emerald-500/30 text-emerald-200"
          }`}
        >
          <div className="font-semibold flex items-center gap-1 mb-0.5">
            {isUnder ? (
              <>
                <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                <span>Under-spending Deficit:</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Over-spending Surplus:</span>
              </>
            )}
          </div>
          <p>
            {isUnder
              ? `You are under-spending on ${item.sector} by ₹${absGapCr} Cr compared to the state average (-${absGapPct}% gap).`
              : `You are allocating ₹${absGapCr} Cr (+${absGapPct}%) more than the state average in this sector.`}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function SectorGapAnalysis({
  data = mockSectorGapData,
}: SectorGapAnalysisProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
      {/* Component Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                <BarChart3 className="w-3 h-3 text-blue-600" />
                A.2 Sector Allocation
              </span>
              <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200/60 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Gap Detected: Roads/Infra (-30%)
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#0f172a] tracking-tight">
              Sector Distribution (Constituency vs State)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Side-by-side comparison of your MPLADS expenditure versus benchmark state averages.
            </p>
          </div>
        </div>

        {/* Recharts Bar Chart */}
        <div className="w-full h-64 my-2">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 15, right: 15, left: -10, bottom: 5 }}
                barCategoryGap="28%"
                barGap={6}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="sector"
                  tickLine={false}
                  axisLine={{ stroke: "#cbd5e1" }}
                  tick={{ fill: "#475569", fontSize: 12, fontWeight: 500 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={{ stroke: "#cbd5e1" }}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  unit="%"
                  domain={[0, 50]}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(241, 245, 249, 0.6)" }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingBottom: 12, fontSize: 12, fontWeight: 600 }}
                />
                {/* MP Spend Bar */}
                <Bar
                  dataKey="mp_spend"
                  name="Your MP Spend"
                  fill="#0284c7"
                  radius={[6, 6, 0, 0]}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-mp-${index}`}
                      fill={entry.isGapDetected ? "#f43f5e" : "#0284c7"}
                    />
                  ))}
                </Bar>
                {/* State Avg Bar */}
                <Bar
                  dataKey="state_avg"
                  name="State Average"
                  fill="#94a3b8"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-xl animate-pulse">
              <span className="text-xs text-slate-400 font-medium">Loading Chart...</span>
            </div>
          )}
        </div>

        {/* Sector Breakdown Summary List from Wireframe */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3">
          {data.map((item) => (
            <div
              key={item.sector}
              className={`p-2.5 rounded-xl border text-xs transition-colors ${
                item.isGapDetected
                  ? "bg-rose-50/70 border-rose-200 text-rose-900"
                  : "bg-slate-50 border-slate-200/80 text-slate-800"
              }`}
            >
              <div className="flex items-center justify-between font-semibold mb-1">
                <span className="truncate">{item.sector}</span>
                {item.isGapDetected && (
                  <span className="text-[10px] text-rose-600 font-bold">⚠️ Gap</span>
                )}
              </div>
              <div className="text-[11px] text-slate-600">
                <strong className="text-[#0f172a]">{item.mp_spend}%</strong>{" "}
                <span className="text-slate-400">vs State {item.state_avg}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wireframe AI Insight Callout */}
      <div className="mt-3 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div className="text-xs">
          <span className="font-bold text-amber-900 block mb-0.5">
            AI Insight: Recommended Rebalancing
          </span>
          <p className="text-amber-800 leading-relaxed">
            Your constituency is under-investing in <strong>Roads/Infra by 30% (₹1.50 Cr gap)</strong> compared to the state average. Consider prioritizing your remaining <strong>₹2.50 Cr</strong> available funds towards rural connectivity works.
          </p>
        </div>
      </div>
    </div>
  );
}
