"use client";

import React from "react";
import { usePersona } from "@/context/PersonaContext";
import { MpPlannerShell } from "@/components/shells/MpPlannerShell";
import { OversightShell } from "@/components/shells/OversightShell";

export default function Home() {
  const { persona } = usePersona();

  return (
    <div className="flex-1 flex flex-col w-full">
      {persona === "mp_planner" ? (
        <MpPlannerShell key="mp-planner-shell" />
      ) : (
        <OversightShell key="oversight-shell" />
      )}
    </div>
  );
}
