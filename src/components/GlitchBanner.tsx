import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  phrases: string[];
  prefix?: string;        // emoji like 🔴 🛰️
  intervalMs?: number;    // how often to rotate
  speed?: number;         // animation timing multiplier (1 = default)
};

export default function GlitchBanner({
  phrases,
  prefix = "🔴",
  intervalMs = 6000,
  speed = 1,
}: Props) {
  const safe = useMemo(() => (phrases?.length ? phrases : ["TRANSMISSION LOST"]), [phrases]);
  const [i, setI] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    function tick() {
      setI((v) => (v + 1) % safe.length);
    }
    timer.current = window.setInterval(tick, intervalMs);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [safe.length, intervalMs]);

  const text = safe[i];

  return (
    <div className="glitch-banner overflow-hidden">
      <span className="feed-dot" aria-hidden />
      <AnimatePresence mode="wait">
        <motion.span
          key={text}
          className="line inline-block whitespace-nowrap"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 8 * speed,
            ease: "linear",
          }}
          title={text}
        >
          {prefix} {text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
