"use client";

import React, { useState, useEffect, useMemo } from "react";
import { mockBenchmarks, BenchmarkItem } from "@/data/mockData";
import {
  Search,
  Sparkles,
  AlertTriangle,
  Clock,
  Building2,
  Sliders,
  CheckCircle2,
  Layers,
  X,
  Loader2,
} from "lucide-react";

interface CostBenchmarkingToolProps {
  initialQuery?: string;
}

export function CostBenchmarkingTool({
  initialQuery = "Water RO Plant",
}: CostBenchmarkingToolProps) {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce input by 300ms
  useEffect(() => {
    setIsSearching(true);
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  // Find matching benchmark based on keywords or project title
  const activeBenchmark: BenchmarkItem = useMemo(() => {
    const cleanQ = debouncedQuery.trim().toLowerCase();
    if (!cleanQ) {
      return mockBenchmarks[0]; // default to Water RO Plant
    }

    const directMatch = mockBenchmarks.find((b) =>
      b.projectType.toLowerCase().includes(cleanQ)
    );
    if (directMatch) return directMatch;

    const keywordMatch = mockBenchmarks.find((b) =>
      b.keywords.some((k) => cleanQ.includes(k) || k.includes(cleanQ))
    );
    if (keywordMatch) return keywordMatch;

    // Default fallback if no match found
    return mockBenchmarks[0];
  }, [debouncedQuery]);

  const quickPills = [
    "Water RO Plant",
    "Water Tank",
    "CC Road (1 km)",
    "Community Hall",
    "Solar Street Lights",
    "Public Toilet Block",
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                A.3 ML Cost Benchmarking
              </span>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                Semantic Clustering Engine
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#0f172a] tracking-tight">
              Smart Cost Benchmarking Tool
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Query mathematically computed median costs and confidence intervals to prevent inflated sanction estimates.
            </p>
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            {isSearching ? (
              <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-slate-400" />
            )}
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search project type (e.g., 'Water RO Plant', 'Water Tank', 'CC Road')..."
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-300 bg-slate-50/50 hover:bg-white text-sm sm:text-base font-semibold text-[#0f172a] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:bg-white transition-all shadow-xs"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-1.5 flex-wrap mb-5">
          <span className="text-[11px] font-medium text-slate-400 mr-0.5">
            Quick Examples:
          </span>
          {quickPills.map((pill) => (
            <button
              key={pill}
              type="button"
              onClick={() => setQuery(pill)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                query.toLowerCase() === pill.toLowerCase()
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs"
                  : "bg-slate-100/90 text-slate-600 hover:bg-slate-200 border border-slate-200/80"
              }`}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Result Card */}
        <div className="rounded-xl p-4 bg-slate-50 border border-slate-200/80 transition-all">
          {/* Top row: Matched Project & Semantic Cluster */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-3 border-b border-slate-200/80 mb-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                Calculated Regional Benchmark
              </span>
              <h4 className="text-base font-bold text-[#0f172a] flex items-center gap-1.5">
                {activeBenchmark.projectType}
              </h4>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200 shadow-xs">
                <Layers className="w-3 h-3 text-cyan-600" />
                {activeBenchmark.semanticCluster}
              </span>
            </div>
          </div>

          {/* Core Metrics: Median Cost & Confidence Interval */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Median Cost */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-xs">
              <span className="text-xs font-medium text-slate-500 block mb-1">
                Median Cost
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
                {activeBenchmark.medianCost}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3" />
                Based on {activeBenchmark.sampleSize} historical sanctions
              </span>
            </div>

            {/* Confidence Interval */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-xs">
              <span className="text-xs font-medium text-slate-500 block mb-1">
                Confidence Interval
              </span>
              <div className="text-lg sm:text-xl font-bold text-slate-700 tracking-tight">
                {activeBenchmark.confidenceInterval}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Standard statistical cost tolerance range
              </p>
            </div>
          </div>

          {/* Operational Attributes: Expected Time & Recommended Agency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Expected Time:</span>
                <span className="font-bold text-[#0f172a]">
                  {activeBenchmark.expectedTimeDays} Days
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 text-[11px] block">Recommended Agency:</span>
                <span className="font-bold text-[#0f172a] truncate block">
                  {activeBenchmark.recommendedAgency}
                </span>
              </div>
            </div>
          </div>

          {/* Warning Badge / Justification Note */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/90 flex items-start gap-2.5 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">
                Benchmark Threshold Policy
              </span>
              <p className="text-amber-800 leading-relaxed font-medium">
                {activeBenchmark.warningText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
