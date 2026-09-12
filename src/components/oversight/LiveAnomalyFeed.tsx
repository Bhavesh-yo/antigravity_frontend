"use client";

import React, { useState, useMemo } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  AlertOctagon,
  Search,
  Filter,
  ArrowUpDown,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Eye,
  CheckCircle2,
} from "lucide-react";
import {
  mockAnomalyProjects,
  type AnomalyProject,
} from "@/data/mockData";

interface LiveAnomalyFeedProps {
  onSelectProject?: (project: AnomalyProject) => void;
}

type SortField = "risk_score" | "sanction_amt" | "id";
type SortDirection = "asc" | "desc";

export function LiveAnomalyFeed({ onSelectProject }: LiveAnomalyFeedProps) {
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortField, setSortField] = useState<SortField>("risk_score");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  // Available sectors for filter pills
  const sectors = ["All", "Infrastructure", "Sanitation", "Health", "Education"];

  // Filtered & Sorted list
  const filteredProjects = useMemo(() => {
    return mockAnomalyProjects
      .filter((project) => {
        const matchesSector =
          selectedSector === "All" || project.sector === selectedSector;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          q === "" ||
          project.formattedId.toLowerCase().includes(q) ||
          project.description.toLowerCase().includes(q) ||
          project.constituency.toLowerCase().includes(q) ||
          project.anomaly_type_label.toLowerCase().includes(q) ||
          project.ida_name.toLowerCase().includes(q);

        return matchesSector && matchesSearch;
      })
      .sort((a, b) => {
        let diff = 0;
        if (sortField === "risk_score") {
          diff = a.risk_score - b.risk_score;
        } else if (sortField === "sanction_amt") {
          diff = a.sanction_amt - b.sanction_amt;
        } else if (sortField === "id") {
          diff = a.id - b.id;
        }
        return sortDirection === "desc" ? -diff : diff;
      });
  }, [selectedSector, searchQuery, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleRowClick = (project: AnomalyProject) => {
    setSelectedRowId(project.id);
    if (onSelectProject) {
      onSelectProject(project);
    } else {
      console.log("[LiveAnomalyFeed] Row clicked for inspection:", project.formattedId);
    }
  };

  return (
    <section aria-labelledby="live-anomaly-feed-heading" className="mb-8">
      {/* Section Header & Live Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-600" />
          <h3
            id="live-anomaly-feed-heading"
            className="text-lg font-bold text-[#0f172a]"
          >
            Live Anomaly Feed
          </h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            B.4
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-rose-600" />
            Live ML Stream
          </span>
        </div>

        <div className="text-xs text-slate-500">
          Showing <span className="font-bold text-slate-800">{filteredProjects.length}</span> of{" "}
          <span className="font-bold text-slate-800">{mockAnomalyProjects.length}</span> flagged
          sanctions
        </div>
      </div>

      {/* Control Bar: Sector Filters & Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Sector Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Sector:
            </span>
            {sectors.map((sector) => {
              const isActive = selectedSector === sector;
              return (
                <button
                  key={sector}
                  type="button"
                  onClick={() => setSelectedSector(sector)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-[#0f172a] text-white shadow-sm"
                      : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80"
                  }`}
                >
                  {sector}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, keyword, constituency..."
              className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-[#0f172a] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-28">Alert</th>
                <th
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-800 transition-colors w-28"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center gap-1">
                    <span>Project ID</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4 min-w-[280px]">Description &amp; IDA</th>
                <th
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-800 transition-colors text-right w-36"
                  onClick={() => handleSort("sanction_amt")}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Sanctioned</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4 w-40 text-center">Anomaly Type</th>
                <th className="py-3.5 px-4 text-right w-36">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-xs">
                    No anomalies found matching the current sector or query filters.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => {
                  const isRedAlert = project.alert_severity === "red";
                  const isSelected = selectedRowId === project.id;

                  return (
                    <tr
                      key={project.id}
                      onClick={() => handleRowClick(project)}
                      className={`cursor-pointer transition-colors duration-150 ${
                        isSelected
                          ? "bg-rose-50/80 ring-1 ring-inset ring-rose-300"
                          : "hover:bg-rose-50/40"
                      }`}
                    >
                      {/* Alert Icon & Severity */}
                      <td className="py-3.5 px-4">
                        {isRedAlert ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-200 shadow-sm">
                            <AlertOctagon className="w-3.5 h-3.5 text-rose-600 animate-pulse flex-shrink-0" />
                            <span>High Risk</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                            <span>Warning</span>
                          </span>
                        )}
                      </td>

                      {/* Project ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-xs text-rose-700">
                        {project.formattedId}
                      </td>

                      {/* Description & Metadata */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#0f172a] text-xs leading-snug">
                          {project.description}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                          <span className="font-semibold text-slate-700">
                            {project.constituency}
                          </span>
                          <span>•</span>
                          <span className="truncate max-w-[220px]" title={project.ida_name}>
                            {project.ida_name}
                          </span>
                        </div>
                      </td>

                      {/* Sanctioned Amount */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="font-extrabold text-[#0f172a] text-xs">
                          {project.sanction_amt_formatted}
                        </div>
                        {project.actual_amt > project.sanction_amt ? (
                          <div className="text-[10px] font-bold text-rose-600">
                            Exp: {project.actual_amt_formatted}
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-400">
                            Benchmark: {project.benchmark_median}
                          </div>
                        )}
                      </td>

                      {/* Anomaly Type Badge */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border ${
                            project.anomaly_type === "Estimate_Fraud"
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : project.anomaly_type === "Execution_Overrun"
                                ? "bg-orange-50 text-orange-700 border-orange-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {project.anomaly_type_label}
                        </span>
                      </td>

                      {/* Action Button */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRowClick(project);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0f172a] text-white hover:bg-rose-700 hover:shadow-md transition-all duration-150 cursor-pointer shadow-sm"
                        >
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          <span>Investigate</span>
                          <ChevronRight className="w-3 h-3 text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-5 py-3.5 bg-slate-50/60 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-rose-500" />
            <span>Click any row to open the AI Inspector &amp; root-cause diagnosis.</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Powered by Isolation Forest + Semantic Variance ML models
          </div>
        </div>
      </div>
    </section>
  );
}
