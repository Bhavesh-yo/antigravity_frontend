"use client";

import React, { useState } from "react";
import { Trophy, Building2, MapPin, ChevronRight } from "lucide-react";
import {
  mockConstituencyRisks,
  mockAgencyRisks,
  type ConstituencyRisk,
  type AgencyRisk,
} from "@/data/mockData";

/* ── Severity badge for CRI / Anomaly Rate ─────────────────────── */
function CriBadge({ score }: { score: number }) {
  const color =
    score >= 75
      ? "bg-rose-100 text-rose-700 border-rose-200"
      : score >= 60
        ? "bg-amber-100 text-amber-700 border-amber-200"
        : "bg-emerald-100 text-emerald-700 border-emerald-200";

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${color}`}
    >
      {score}
    </span>
  );
}

function AnomalyBadge({ rate }: { rate: number }) {
  const color =
    rate >= 30
      ? "bg-rose-100 text-rose-700 border-rose-200"
      : rate >= 20
        ? "bg-amber-100 text-amber-700 border-amber-200"
        : "bg-emerald-100 text-emerald-700 border-emerald-200";

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${color}`}
    >
      {rate}%
    </span>
  );
}

/* ── Rank medal helper ──────────────────────────────────────────── */
function RankCell({ rank }: { rank: number }) {
  if (rank === 1)
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-600 text-white text-xs font-extrabold shadow-sm">
        1
      </span>
    );
  if (rank === 2)
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-400 text-white text-xs font-bold">
        2
      </span>
    );
  if (rank === 3)
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-300 text-white text-xs font-bold">
        3
      </span>
    );
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
      {rank}
    </span>
  );
}

/* ── Constituency Table ─────────────────────────────────────────── */
function ConstituencyTable({
  data,
  onRowClick,
}: {
  data: ConstituencyRisk[];
  onRowClick: (item: ConstituencyRisk) => void;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
          <MapPin className="w-[18px] h-[18px]" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#0f172a]">
            Constituencies by CRI Score
          </h3>
          <p className="text-[11px] text-slate-500">
            Constituency Risk Index — ranked highest to lowest
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider w-16">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Constituency
              </th>
              <th className="px-4 py-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                CRI Score
              </th>
              <th className="px-4 py-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                FAR %
              </th>
              <th className="px-4 py-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                FIR %
              </th>
              <th className="px-4 py-3 w-10" />
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={item.rank}
                onClick={() => onRowClick(item)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`border-b border-slate-50 cursor-pointer transition-colors duration-150 ${
                  hoveredIdx === idx
                    ? "bg-rose-50/60"
                    : idx % 2 === 0
                      ? "bg-white"
                      : "bg-slate-50/30"
                }`}
              >
                <td className="px-4 py-3">
                  <RankCell rank={item.rank} />
                </td>
                <td className="px-4 py-3 font-semibold text-[#0f172a]">
                  {item.constituency}
                </td>
                <td className="px-4 py-3 text-center">
                  <CriBadge score={item.criScore} />
                </td>
                <td className="px-4 py-3 text-center text-slate-700 font-medium">
                  {item.farPercent}%
                </td>
                <td className="px-4 py-3 text-center text-slate-700 font-medium">
                  {item.firPercent}%
                </td>
                <td className="px-4 py-3 text-right">
                  <ChevronRight
                    className={`w-4 h-4 transition-colors ${
                      hoveredIdx === idx ? "text-rose-500" : "text-slate-300"
                    }`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 text-[11px] text-slate-500">
        <span className="font-semibold text-slate-600">CRI</span> = Composite
        Risk Index &nbsp;|&nbsp; <span className="font-semibold text-slate-600">FAR</span> = Fund
        At-Risk Rate &nbsp;|&nbsp; <span className="font-semibold text-slate-600">FIR</span> = Fraud
        Incidence Rate
      </div>
    </div>
  );
}

/* ── Agency Table ───────────────────────────────────────────────── */
function AgencyTable({
  data,
  onRowClick,
}: {
  data: AgencyRisk[];
  onRowClick: (item: AgencyRisk) => void;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
          <Building2 className="w-[18px] h-[18px]" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#0f172a]">
            Agencies by Anomaly Rate
          </h3>
          <p className="text-[11px] text-slate-500">
            Implementing District Authorities — ranked by anomaly rate
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider w-16">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Agency Name
              </th>
              <th className="px-4 py-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Anomaly Rate %
              </th>
              <th className="px-4 py-3 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Total Anomalies
              </th>
              <th className="px-4 py-3 w-10" />
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={item.rank}
                onClick={() => onRowClick(item)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`border-b border-slate-50 cursor-pointer transition-colors duration-150 ${
                  hoveredIdx === idx
                    ? "bg-rose-50/60"
                    : idx % 2 === 0
                      ? "bg-white"
                      : "bg-slate-50/30"
                }`}
              >
                <td className="px-4 py-3">
                  <RankCell rank={item.rank} />
                </td>
                <td className="px-4 py-3 font-semibold text-[#0f172a]">
                  {item.agencyName}
                </td>
                <td className="px-4 py-3 text-center">
                  <AnomalyBadge rate={item.anomalyRatePercent} />
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center justify-center min-w-[28px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                    {item.totalAnomalies}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <ChevronRight
                    className={`w-4 h-4 transition-colors ${
                      hoveredIdx === idx ? "text-rose-500" : "text-slate-300"
                    }`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 text-[11px] text-slate-500">
        Anomaly rate = flagged projects ÷ total projects managed by agency
      </div>
    </div>
  );
}

/* ── Main Export ─────────────────────────────────────────────────── */
export function RiskLeaderboards() {
  return (
    <section aria-labelledby="risk-leaderboards-heading" className="mb-8">
      {/* Section title */}
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-rose-600" />
        <h3
          id="risk-leaderboards-heading"
          className="text-lg font-bold text-[#0f172a]"
        >
          Risk Leaderboards
        </h3>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          B.2
        </span>
      </div>

      {/* Dual tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConstituencyTable
          data={mockConstituencyRisks}
          onRowClick={(item) => {
            // Visual-only click handling — routing will be added later
            console.log("[RiskLeaderboards] Constituency clicked:", item.constituency);
          }}
        />
        <AgencyTable
          data={mockAgencyRisks}
          onRowClick={(item) => {
            // Visual-only click handling — routing will be added later
            console.log("[RiskLeaderboards] Agency clicked:", item.agencyName);
          }}
        />
      </div>
    </section>
  );
}
