"use client";

import React, { useState } from "react";
import { mockConvergenceProjects, ConvergenceProject } from "@/data/mockData";
import { ConvergenceModal } from "./ConvergenceModal";
import {
  GitMerge,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Layers,
  HandCoins,
  Building,
} from "lucide-react";

interface ConvergenceBoardProps {
  projects?: ConvergenceProject[];
}

export function ConvergenceBoard({
  projects = mockConvergenceProjects,
}: ConvergenceBoardProps) {
  const [selectedProject, setSelectedProject] =
    useState<ConvergenceProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  const handleOpenModal = (project: ConvergenceProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const getSectorBadge = (sector: string) => {
    switch (sector.toLowerCase()) {
      case "health":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "infra":
      case "infrastructure":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "education":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/80";
      case "drinking water":
      case "water":
        return "bg-cyan-50 text-cyan-700 border-cyan-200/80";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <section
      aria-label="Convergence Board for Stalled Projects"
      className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <GitMerge className="w-3 h-3 text-emerald-600" />
              A.4 Convergence Board
            </span>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
              Inter-Constituency Opportunities
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#0f172a] tracking-tight">
            Convergence Board (Stalled Neighboring Projects)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            High-priority projects in neighboring constituencies stalled due to lack of funds. Pool unspent balances to complete vital community infrastructure.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            {projects.length} Stalled Works Found
          </span>
        </div>
      </div>

      {/* Wireframe Info Alert Banner */}
      <div className="mb-5 p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-blue-900">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>
            <strong>Collaboration Opportunities:</strong> These projects are &gt;60% complete but stalled. Pooling convergence funds grants co-signatory attribution on project plaques and official reports.
          </span>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/90 text-slate-600 border-b border-slate-200 uppercase font-bold text-[11px] tracking-wider">
            <tr>
              <th scope="col" className="py-3.5 px-4">
                Project ID
              </th>
              <th scope="col" className="py-3.5 px-4">
                Description
              </th>
              <th scope="col" className="py-3.5 px-4">
                Sector
              </th>
              <th scope="col" className="py-3.5 px-4">
                Funds Needed
              </th>
              <th scope="col" className="py-3.5 px-4">
                Location
              </th>
              <th scope="col" className="py-3.5 px-4 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentProjects.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-slate-50/80 transition-colors group"
              >
                {/* 1. Project ID */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-xs">
                      {project.id}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-rose-600 font-medium">
                      <Clock className="w-2.5 h-2.5" />
                      {project.stalledDays}d
                    </span>
                  </div>
                </td>

                {/* 2. Description */}
                <td className="py-3.5 px-4 max-w-xs">
                  <div className="font-bold text-[#0f172a] line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {project.description}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                    <span className="truncate">IDA: {project.hostAgency}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-medium">
                      {project.progressPercent}% built
                    </span>
                  </div>
                </td>

                {/* 3. Sector */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${getSectorBadge(
                      project.sector
                    )}`}
                  >
                    {project.sector}
                  </span>
                </td>

                {/* 4. Funds Needed */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="text-sm font-extrabold text-[#0f172a]">
                    {project.fundsNeeded}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Critical Gap
                  </span>
                </td>

                {/* 5. Location */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{project.location}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 pl-5">
                    Beneficiaries: {project.beneficiaryCount}
                  </span>
                </td>

                {/* 6. Action Column */}
                <td className="py-3.5 px-4 whitespace-nowrap text-right">
                  <button
                    type="button"
                    onClick={() => handleOpenModal(project)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-300 hover:border-emerald-600 transition-all cursor-pointer shadow-2xs group/btn"
                  >
                    <HandCoins className="w-3.5 h-3.5 text-emerald-600 group-hover/btn:text-white transition-colors" />
                    <span>Offer Convergence Funds</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-500">
        <div>
          Showing <strong>{startIndex + 1}</strong> to{" "}
          <strong>{Math.min(startIndex + itemsPerPage, projects.length)}</strong> of{" "}
          <strong>{projects.length}</strong> stalled projects
        </div>

        <div className="flex items-center gap-1 self-end sm:self-auto">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  currentPage === page
                    ? "bg-[#0f172a] text-white"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConvergenceModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
