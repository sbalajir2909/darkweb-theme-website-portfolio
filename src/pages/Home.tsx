import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const bootLines = [
  "[*] Decrypting node data...",
  "[+] Onion routes established.",
  "[!] Warning: unauthorized access detected...",
  "[+] Market access granted."
];

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < bootLines.length) setLogs(prev => [...prev, bootLines[i++]]);
      else clearInterval(id);
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-screen w-full bg-bg text-white font-mono flex flex-col items-center justify-center crt scanline overflow-hidden">
      <motion.h1
        className="text-5xl md:text-7xl text-neon glitch-anim z-10"
        data-text="SUSHMITHA'S ONION MARKET"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
      >
        SUSHMITHA'S ONION MARKET
      </motion.h1>

      <motion.p
        className="mt-6 text-gray-300 z-10 max-w-xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Beware of any jobs, projects, or even skills sold on the darkweb. I'M WATCHING.
      </motion.p>

      <div className="mt-8 flex gap-4 z-10">
        <a href="/experience" className="px-4 py-2 bg-neon text-black font-bold hover:bg-white transition">
          Enter Market
        </a>
        <a href="/research" className="px-4 py-2 border border-neon text-neon hover:bg-neon hover:text-black transition">
          Deep Web Archive
        </a>
      </div>

      <div className="absolute bottom-4 left-4 text-xs text-gray-500 z-10">
        {logs.map((line, i) => (<div key={i}>{line}</div>))}
      </div>
    </section>
  );
}
