"use client";

import React from "react";
import { ShieldAlert, AlertTriangle, Layers, Table2, PieChart } from "lucide-react";
import { OversightKpiRow } from "@/components/oversight/OversightKpiRow";
import { RiskLeaderboards } from "@/components/oversight/RiskLeaderboards";
import { FraudTypologySection } from "@/components/oversight/FraudTypologySection";
import { LiveAnomalyFeed } from "@/components/oversight/LiveAnomalyFeed";
import { InvestigateModal } from "@/components/oversight/InvestigateModal";
import type { AnomalyProject } from "@/data/mockData";

export function OversightShell() {
  const [selectedAnomaly, setSelectedAnomaly] = React.useState<AnomalyProject | null>(null);

  const handleSelectProject = (project: AnomalyProject) => {
    setSelectedAnomaly(project);
    console.log("[OversightShell] Project selected for investigation:", project.formattedId);
  };

  const handleCloseModal = () => {
    setSelectedAnomaly(null);
  };

  return (
    <main
      id="main-content-panel"
      role="tabpanel"
      aria-labelledby="tab-oversight"
      className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-opacity duration-300"
    >
      {/* View Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Oversight Mode Active
            </span>
            <span className="text-xs font-medium text-slate-500">Theme B</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#0f172a] tracking-tight">
            Fraud &amp; Anomaly Detection Console
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Audit engine, constituency risk indices (CRI), agency anomaly rates, and live ML fraud inspection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-slate-700 border border-slate-200 shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            Vigilance Engine Armed
          </span>
        </div>
      </div>

      {/* B.1. Top KPI Row (4 Cards) */}
      <OversightKpiRow />

      {/* B.2. Risk Leaderboards */}
      <RiskLeaderboards />

      {/* B.3. Fraud Typology & Sector Vulnerability */}
      <FraudTypologySection />

      {/* B.4. Live Anomaly Feed */}
      <LiveAnomalyFeed onSelectProject={handleSelectProject} />

      {/* Section 4: The "Investigate" Modal (AI Drill-Down Overlay) */}
      <InvestigateModal
        project={selectedAnomaly}
        isOpen={Boolean(selectedAnomaly)}
        onClose={handleCloseModal}
      />
    </main>
  );
}

