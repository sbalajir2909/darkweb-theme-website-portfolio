import { useEffect, useMemo, useState } from "react";

function fmt(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export default function BtcTicker() {
  const [usd, setUsd] = useState<number | null>(null);
  const [status, setStatus] = useState<"ok" | "offline" | "loading">("loading");

  // Build the line to scroll
  const line = useMemo(() => {
    const base = usd ? `₿ ${fmt(usd)} USD` : status === "offline" ? "₿ offline" : "₿ loading…";
    // you can add more “assets” here if you want a longer tape
    return `${base}  •  TLSChecker ▲ 12%  •  Risk Analysis ▲ 5%  •  Bug Hunting ▼ 3%`;
  }, [usd, status]);

  useEffect(() => {
    let alive = true;

    async function fetchPrice() {
      async function withTimeout<T>(p: Promise<T>, ms = 5000) {
        return await Promise.race([
          p,
          new Promise<T>((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)),
        ]);
      }
      try {
        // Try CoinDesk
        const r1 = await withTimeout(fetch("https://api.coindesk.com/v1/bpi/currentprice/USD.json"));
        const j1 = await r1.json();
        const p1 = Number(j1?.bpi?.USD?.rate_float);
        if (alive && isFinite(p1)) {
          setUsd(p1);
          setStatus("ok");
          return;
        }
        throw new Error("coindesk no price");
      } catch {
        try {
          // Fallback: CoinGecko
          const r2 = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
            { headers: { accept: "application/json" } }
          );
          const j2 = await r2.json();
          const p2 = Number(j2?.bitcoin?.usd);
          if (alive && isFinite(p2)) {
            setUsd(p2);
            setStatus("ok");
            return;
          }
          throw new Error("coingecko no price");
        } catch {
          if (alive) setStatus("offline");
        }
      }
    }

    fetchPrice();
    const id = setInterval(fetchPrice, 30000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  // Two copies back-to-back = seamless loop with -50% translate
  return (
    <div className="marquee w-40"> 
      <div className="marquee-track text-xs text-gray-400 font-mono">
        <span>{line}</span>
        <span>{line}</span>
      </div>
    </div>
  );
}
