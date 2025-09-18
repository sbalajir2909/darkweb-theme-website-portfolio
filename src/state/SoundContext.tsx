import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Ctx = { muted: boolean; toggle: () => void; setMuted: (m: boolean) => void; };
const SoundCtx = createContext<Ctx | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState<boolean>(() => {
    try { return localStorage.getItem("soundMuted") === "1"; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem("soundMuted", muted ? "1" : "0"); } catch {}
  }, [muted]);

  const value = useMemo<Ctx>(() => ({
    muted,
    toggle: () => setMuted(m => !m),
    setMuted
  }), [muted]);

  return <SoundCtx.Provider value={value}>{children}</SoundCtx.Provider>;
}

export function useSound() {
  const ctx = useContext(SoundCtx);
  if (!ctx) throw new Error("useSound must be used within <SoundProvider>");
  return ctx;
}
