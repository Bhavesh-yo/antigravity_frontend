"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  AlertOctagon,
  AlertTriangle,
  Building2,
  Calendar,
  DollarSign,
  MapPin,
  FileCode,
  ShieldBan,
  CheckCircle2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { type AnomalyProject } from "@/data/mockData";

interface InvestigateModalProps {
  project: AnomalyProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InvestigateModal({
  project,
  isOpen,
  onClose,
}: InvestigateModalProps) {
  const [showJsonHistory, setShowJsonHistory] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isFundsFrozen, setIsFundsFrozen] = useState(false);
  const [freezeNotice, setFreezeNotice] = useState<string | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset local state when a new project opens
  useEffect(() => {
    if (isOpen) {
      setShowJsonHistory(false);
      setIsFundsFrozen(false);
      setFreezeNotice(null);
    }
  }, [isOpen, project?.id]);

  if (!isOpen || !project) return null;

  // JSON payload representation formatted to match Section 5 of frontend_specs.md
  const rawJsonData = {
    id: project.id,
    constituency: project.constituency,
    sector: project.sector,
    description: project.description,
    ida_name: project.ida_name,
    sanction_amt: project.sanction_amt,
    actual_amt: project.actual_amt,
    sanction_date: project.sanction_date,
    completion_date: project.completion_date,
    is_anomaly: project.is_anomaly,
    anomaly_type: project.anomaly_type,
    risk_score: project.risk_score,
    benchmark_median: project.benchmark_median,
    variance_pct: project.variance_pct,
    coordinates: project.coordinates || "17.6868° N, 82.5028° E",
    llm_explanation: project.llm_explanation,
    audit_metadata: {
      engine_version: "eSakshi-Vigilance-v2.4",
      isolation_forest_anomaly_score: -0.842,
      semantic_cluster_id: "SEM-INFRA-PARK-08",
      model_confidence: "98.4%",
      flagged_timestamp: "2025-02-14T10:45:00Z",
    },
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(rawJsonData, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleFreezeFunds = () => {
    setIsFundsFrozen(true);
    setFreezeNotice(
      `Electronic disbursement freeze dispatched to PFMS / District Treasury for Project ${project.formattedId}. IDA notified.`
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-inspector-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Red Warning Banner ─────────────────────────────────── */}
        <div className="bg-rose-600 text-white px-5 py-2 flex items-center justify-between text-xs font-bold tracking-wide">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 animate-pulse text-rose-200" />
            <span>
              CRITICAL AUDIT ALERT // ML ISOLATION FOREST &amp; CLUSTERING FLAG (RISK SCORE:{" "}
              {project.risk_score}/100)
            </span>
          </div>
          <span className="hidden sm:inline bg-rose-700 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-mono">
            CONFIDENTIAL // FOR AUDIT EYES ONLY
          </span>
        </div>

        {/* ── Modal Header ────────────────────────────────────────── */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold font-mono text-sm border border-rose-200 shadow-sm">
              AI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="modal-inspector-title"
                  className="text-lg sm:text-xl font-black text-[#0f172a] font-mono tracking-tight"
                >
                  PROJECT INSPECTOR: {project.formattedId}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                  {project.anomaly_type_label}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                AI Deep-Dive Root-Cause Analysis &amp; Historical Expenditure Audit
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Inspector"
            className="w-9 h-9 rounded-full bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Freezing Alert Banner (If triggered) ───────────────── */}
        {isFundsFrozen && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-3 flex items-center gap-3 text-xs text-emerald-900 font-semibold animate-in slide-in-from-top duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <div className="flex-1">{freezeNotice}</div>
            <span className="px-2 py-0.5 rounded bg-emerald-200/80 text-emerald-800 text-[10px] uppercase font-mono">
              FUNDS FROZEN
            </span>
          </div>
        )}

        {/* ── Modal Body: Two Columns (The Facts vs The AI Brain) ──── */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* ── LEFT COLUMN (The Facts - 5 cols) ───────────────── */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <Layers className="w-4 h-4 text-slate-600" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                  The Facts (Sanction Record)
                </h3>
              </div>

              {/* Project Description Box */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Project Title &amp; Scope
                </div>
                <div className="text-sm font-bold text-[#0f172a] leading-snug">
                  {project.description}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
                  <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-700 font-medium">
                    Sector: {project.sector}
                  </span>
                  <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-700 font-medium">
                    Loc: {project.constituency}
                  </span>
                </div>
              </div>

              {/* Financial Facts */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">
                    Sanctioned Amt
                  </div>
                  <div className="text-base font-extrabold text-rose-700 mt-0.5">
                    {project.sanction_amt_formatted}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                    ₹ {project.sanction_amt.toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">
                    Disbursed / Actual
                  </div>
                  <div className="text-base font-extrabold text-slate-800 mt-0.5">
                    {project.actual_amt_formatted}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                    ₹ {project.actual_amt.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              {/* Agency & Dates */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3 text-xs">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-0.5 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-400" />
                    Implementing Agency (IDA)
                  </div>
                  <div className="font-bold text-[#0f172a] leading-tight">
                    {project.ida_name}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-0.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      Sanction Date
                    </div>
                    <div className="font-semibold text-slate-700">
                      {project.sanction_date}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      Status / Timeline
                    </div>
                    <div className="font-semibold text-rose-700 truncate">
                      {project.completion_date}
                    </div>
                  </div>
                </div>

                {project.coordinates && (
                  <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 font-mono">
                    GPS Coordinates: {project.coordinates}
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT COLUMN (The AI Brain - 7 cols) ─────────────── */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-rose-600" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                    The AI Brain (Anomaly Reasoning)
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  LLM Diagnostic Analysis
                </span>
              </div>

              {/* THE LLM EXPLANATION BOX (Prominent AI Card) */}
              <div className="bg-gradient-to-br from-rose-50/90 via-slate-50 to-indigo-50/60 rounded-2xl p-5 border-2 border-rose-200/80 shadow-md relative overflow-hidden">
                {/* AI Sparkle badge in background */}
                <div className="absolute top-2 right-2 text-rose-300/40 pointer-events-none">
                  <Sparkles className="w-20 h-20" />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-rose-600 text-white shadow-sm">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#0f172a] uppercase tracking-wide">
                      Automated Vigilance Narrative
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Evaluated against 10,000+ state MPLADS historical works
                    </p>
                  </div>
                </div>

                {/* Highly readable, prominent typography */}
                <p className="text-sm sm:text-[15px] font-medium text-slate-900 leading-relaxed pt-1 bg-white/70 p-4 rounded-xl border border-rose-100 shadow-inner">
                  &ldquo;{project.llm_explanation}&rdquo;
                </p>
              </div>

              {/* AI Quantitative Benchmarking Variance Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">
                    Cluster Benchmark
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-slate-800 mt-1">
                    {project.benchmark_median}
                  </div>
                  <div className="text-[10px] text-slate-500">Regional Median</div>
                </div>

                <div className="bg-rose-50 rounded-2xl p-3.5 border border-rose-200 text-center">
                  <div className="text-[10px] font-bold text-rose-600 uppercase">
                    Variance Gap
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-rose-700 mt-1">
                    {project.variance_pct}
                  </div>
                  <div className="text-[10px] text-rose-600">Above Standard</div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">
                    AI Confidence
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-indigo-700 mt-1">
                    98.4%
                  </div>
                  <div className="text-[10px] text-slate-500">Isolation Forest</div>
                </div>
              </div>

              {/* Evidence & Recommendation Note */}
              <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Recommended Action:</span> Immediate
                  suspension of second tranche disbursement pending physical audit
                  by independent State Quality Monitors (SQM).
                </div>
              </div>
            </div>
          </div>

          {/* ── FULL JSON HISTORY ACCORDION ────────────────────────── */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-900 text-slate-100 shadow-inner">
            <button
              type="button"
              onClick={() => setShowJsonHistory(!showJsonHistory)}
              className="w-full px-4 py-3 bg-slate-900 hover:bg-slate-800 flex items-center justify-between text-xs font-mono font-bold transition-colors cursor-pointer border-b border-slate-800"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <span>View Full JSON History &amp; DB Trace</span>
                <span className="text-[10px] text-slate-500 font-sans font-normal">
                  (Click to {showJsonHistory ? "collapse" : "expand"})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 font-sans bg-slate-800 px-2 py-0.5 rounded">
                  raw_payload.json
                </span>
                {showJsonHistory ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </button>

            {showJsonHistory && (
              <div className="p-4 bg-slate-950 overflow-x-auto text-[11px] font-mono leading-relaxed relative">
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] border border-slate-700 transition-colors cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
                <pre className="text-cyan-300">
                  {JSON.stringify(rawJsonData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* ── Modal Footer Actions ─────────────────────────────────── */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Audit record logged under Vigilance Case #VIG-2025-089</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              Close Inspector
            </button>

            <button
              type="button"
              onClick={handleFreezeFunds}
              disabled={isFundsFrozen}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold text-white transition-all shadow-md cursor-pointer ${
                isFundsFrozen
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-rose-600 hover:bg-rose-700 active:scale-95 shadow-rose-600/30"
              }`}
            >
              <ShieldBan className="w-4 h-4" />
              <span>{isFundsFrozen ? "Funds Frozen" : "Freeze Funds"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
