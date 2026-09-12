"use client";

import React, { useState } from "react";
import { ConvergenceProject } from "@/data/mockData";
import {
  X,
  GitMerge,
  CheckCircle2,
  AlertCircle,
  Building2,
  MapPin,
  Clock,
  IndianRupee,
  ShieldCheck,
  Send,
} from "lucide-react";

interface ConvergenceModalProps {
  project: ConvergenceProject | null;
  isOpen: boolean;
  onClose: () => void;
  availableFundsCr?: number;
}

export function ConvergenceModal({
  project,
  isOpen,
  onClose,
  availableFundsCr = 2.5,
}: ConvergenceModalProps) {
  const [pledgeAmountLakhs, setPledgeAmountLakhs] = useState<number>(15);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize or reset pledge amount when project opens
  React.useEffect(() => {
    if (project) {
      const lakhs = project.fundsNeededRaw / 100000;
      setPledgeAmountLakhs(lakhs);
      setIsSubmitted(false);
    }
  }, [project]);

  if (!isOpen || !project) return null;

  const currentBalanceLakhs = availableFundsCr * 100;
  const newBalanceLakhs = currentBalanceLakhs - pledgeAmountLakhs;
  const newBalanceCr = (newBalanceLakhs / 100).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // Allow user to see confirmation before auto-closing or closing manually
    }, 1500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Modal Header */}
        <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <GitMerge className="w-4 h-4" />
            </div>
            <div>
              <h3 id="modal-title" className="text-base font-bold text-white">
                Offer Convergence Funds
              </h3>
              <p className="text-xs text-slate-400">
                MoSPI Inter-Constituency Co-Financing Protocol
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white rounded-lg p-1 hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {isSubmitted ? (
          <div className="p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4 border border-emerald-200 shadow-inner animate-in zoom-in-90">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-[#0f172a] mb-2">
              Convergence Sanction Dispatched!
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto mb-4 leading-relaxed">
              Order <strong>#CONV-2026-{project.projectId}</strong> for <strong>₹ {pledgeAmountLakhs} Lakhs</strong> has been transmitted via e-SAKSHI to the <strong>{project.hostAgency}</strong>.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>Project status updated: Stalled &rarr; Restarting</span>
            </div>
            <div>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0f172a] text-white font-semibold text-sm hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Target Project Card */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {project.id}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200/80">
                  <Clock className="w-3 h-3 text-rose-500" />
                  Stalled {project.stalledDays} Days
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#0f172a] mb-1">
                {project.description}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mt-2.5 pt-2.5 border-t border-slate-200">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{project.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{project.sector} Sector</span>
                </div>
              </div>
            </div>

            {/* Funds Transfer Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="pledge-amount"
                  className="text-xs font-semibold text-slate-700"
                >
                  Convergence Funds to Sanction:
                </label>
                <span className="text-xs font-medium text-slate-500">
                  Full Deficit: <strong>{project.fundsNeeded}</strong>
                </span>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <IndianRupee className="w-4 h-4 text-emerald-600" />
                </div>
                <input
                  id="pledge-amount"
                  type="number"
                  step="0.5"
                  min="1"
                  max="100"
                  value={pledgeAmountLakhs}
                  onChange={(e) => setPledgeAmountLakhs(Number(e.target.value))}
                  className="w-full pl-9 pr-16 py-2 rounded-xl border border-slate-300 bg-white text-sm font-bold text-[#0f172a] focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:outline-none"
                />
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-semibold text-slate-500 pointer-events-none">
                  Lakhs
                </span>
              </div>
            </div>

            {/* Fund Balance Impact Meter */}
            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/80 text-xs">
              <span className="font-bold text-emerald-900 block mb-1.5">
                Constituency Balance Impact
              </span>
              <div className="flex items-center justify-between text-slate-600 mb-1">
                <span>Current Available Funds:</span>
                <span className="font-semibold text-slate-900">
                  ₹ {availableFundsCr.toFixed(2)} Cr
                </span>
              </div>
              <div className="flex items-center justify-between text-emerald-700 mb-1">
                <span>Convergence Deduction:</span>
                <span className="font-bold">- ₹ {pledgeAmountLakhs} Lakhs</span>
              </div>
              <div className="pt-1.5 border-t border-emerald-200/60 flex items-center justify-between font-bold text-emerald-950">
                <span>Remaining Fund Entitlement:</span>
                <span className="text-emerald-700">₹ {newBalanceCr} Cr</span>
              </div>
            </div>

            {/* Policy Notice */}
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 text-[11px] text-slate-500 border border-slate-200">
              <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <p>
                Under MoSPI guidelines, convergence funds are deposited directly into the designated single-project IDA escrow account and automatically credited in the MPLADS public portal.
              </p>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Confirm &amp; Pool Funds
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
