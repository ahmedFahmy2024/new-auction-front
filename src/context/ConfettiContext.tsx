"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ConfettiContextType = {
  showConfetti: boolean;
  setShowConfetti: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfettiContext = createContext<ConfettiContextType | undefined>(
  undefined
);

export function ConfettiProvider({ children }: { children: ReactNode }) {
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <ConfettiContext.Provider
      value={{
        showConfetti,
        setShowConfetti,
      }}
    >
      {children}
    </ConfettiContext.Provider>
  );
}

export function useConfettiSwitch() {
  const context = useContext(ConfettiContext);
  if (context === undefined) {
    throw new Error(
      "useConfettiSwitch must be used within an ConfettiProvider"
    );
  }
  return context;
}
