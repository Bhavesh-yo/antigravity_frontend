"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type PersonaMode = "mp_planner" | "oversight";

export interface PersonaContextType {
  persona: PersonaMode;
  setPersona: (mode: PersonaMode) => void;
  togglePersona: () => void;
  isMpPlanner: boolean;
  isOversight: boolean;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

interface PersonaProviderProps {
  children: ReactNode;
  defaultMode?: PersonaMode;
}

export function PersonaProvider({
  children,
  defaultMode = "mp_planner",
}: PersonaProviderProps) {
  const [persona, setPersona] = useState<PersonaMode>(defaultMode);

  const togglePersona = () => {
    setPersona((prev) => (prev === "mp_planner" ? "oversight" : "mp_planner"));
  };

  const value: PersonaContextType = {
    persona,
    setPersona,
    togglePersona,
    isMpPlanner: persona === "mp_planner",
    isOversight: persona === "oversight",
  };

  return (
    <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>
  );
}

export function usePersona(): PersonaContextType {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error("usePersona must be used within a PersonaProvider");
  }
  return context;
}
