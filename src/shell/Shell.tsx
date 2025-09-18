import type { ReactNode } from "react";
import { useEffect, useState, Suspense, lazy } from "react";
import { Link, useLocation } from "react-router-dom";
import LoginGate from "../components/LoginGate";
import AnimatedLink from "../components/AnimatedLink";
import BtcTicker from "../components/BtcTicker";
import MuteToggle from "../components/MuteToggle";
import { SoundProvider } from "../state/SoundContext";

const TerminalBar = lazy(() => import("../components/TerminalBar"));

export default function Shell({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"professional" | "startup" | "fun" | null>(null);
  const [isClient, setIsClient] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fake login gate
  if (!mode) return <LoginGate onUnlock={setMode} />;

  const tabs = [
    { to: "/education", label: "Education" },
    { to: "/experience", label: "Experience" },
    { to: "/research", label: "Research" },
    { to: "/skills", label: "Skills" },
    { to: "/certificates", label: "Certificates" },
    { to: "/contact", label: "Connect" },
  ];

  return (
    <SoundProvider>
      <div className="min-h-screen bg-bg text-white font-sans">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/60 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
            {/* Brand */}
            <Link
              to="/"
              className="font-mono text-neon nav-glitch"
              data-text=".onion/market"
            >
              .onion/market
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex gap-3 text-sm">
              {tabs.map((t) => (
                <AnimatedLink
                  key={t.to}
                  to={t.to}
                  className={loc.pathname === t.to ? "bg-white/10" : ""}
                >
                  {t.label}
                </AnimatedLink>
              ))}
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* BTC Ticker + Mute toggle */}
            <div className="flex items-center gap-3">
              <div className="text-xs text-gray-400 font-mono overflow-hidden whitespace-nowrap w-40">
                <BtcTicker />
              </div>
              <MuteToggle />
            </div>
          </div>

          {/* Mobile nav */}
          <div className="md:hidden mx-auto max-w-6xl px-4 pb-2">
            <div className="flex flex-wrap gap-2 text-xs">
              {tabs.map((t) => (
                <AnimatedLink
                  key={`m-${t.to}`}
                  to={t.to}
                  className={`px-2 py-1 rounded ${
                    loc.pathname === t.to ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  {t.label}
                </AnimatedLink>
              ))}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

        {/* Footer */}
        <footer className="mx-auto max-w-6xl px-4 py-8 text-xs text-gray-500">
          © {new Date().getFullYear()} Sushmitha • Dark-web themed portfolio.
        </footer>

        {/* Terminal bar */}
        {isClient && (
          <Suspense fallback={null}>
            <TerminalBar />
          </Suspense>
        )}
      </div>
    </SoundProvider>
  );
}
