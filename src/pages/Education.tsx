import { motion, useInView } from "framer-motion";
import SectionReveal from "../components/SectionReveal";
import { useEffect, useRef, useState } from "react";
import { useSound } from "../state/SoundContext";
import GlitchBanner from "../components/GlitchBanner";

/* ---------- Per-campus rotating roast lines ---------- */
const LINES = {
  mcc: [
    "Now Streaming: Emotional Stability Breach – Selling My Live Feed for Internships",
    "Unauthorized AI Detected: Just misses breakfast sometimes",
    "Signal Intercepted: Student Found Debugging Her Feelings at 3:14 A.M.",
  ],
  cluny: [
    "Encrypted Broadcast: Compiler Warnings",
    "Selling My Convent Surveillance Tapes to Fund My Startup ‘Cry & Compile’",
    "Detected: Untouched Tiffin + Perfect Notes + 100% Inner Chaos",
  ],
  bms: [
    "LIVE: Local Engineer Attempts to Override Sleep Function – Unsuccessful",
    "VPN Detected: Probably Escaping Lab Internal with Fake Medical Certificate",
    "Streaming Brain Lag in 4K – Now Accepting Pizza as Debug Support",
  ],
  purdue: [
    "Incident: Kernel Panic in ML Lab — TAs Deploy Emergency Caffeine Patch",
    "Update: AppSec TA Debugs Human Input Validation (Students) in Real Time",
    "Advisory: Research Node Overclocked — Risk Models Screaming Gently",
  ],
} as const;

/* ---------- Data ---------- */
type CampusKey = "purdue" | "mcc" | "bms" | "cluny";

type Campus = {
  key: CampusKey;
  name: string;
  location?: string;
  period?: string;
  img?: string;
  headline: string;
  bullets: string[];
  tags?: string[];
};

const campuses: Campus[] = [
  {
    key: "purdue",
    name: "Purdue University — M.S. Cybersecurity & Trusted Systems",
    location: "West Lafayette, IN",
    period: "Expected May 2026",
    img: "/images/education/purdue.jpg",
    headline: "LIVE: Advanced Cyber Lab pushes systems hardening & ML-sec",
    bullets: [
      "Coursework: Network Security, Cryptography, Cloud Security, Incident Response, ML Security",
      "Research & Teaching: mentoring 160+ students (secure coding & risk assessment)",
      "Security tooling focus: automation-first mindset across coursework & labs",
    ],
    tags: ["Cryptography", "CloudSec", "IR", "AppSec", "ML-Sec"],
  },
  {
    key: "bms",
    name: "BMS College of Engineering — B.E. Electronics & Communication",
    location: "Bengaluru, India",
    period: "May 2023",
    img: "/images/education/bms.jpg",
    headline: "BREAKING: ECE → Security pipelines meet real-world systems",
    bullets: [
      "Hands-on systems & networks background; strong hardware-software perspective",
      "Built end-to-end prototypes & security-flavored projects",
      "Led to early roles in WAF/SOC and later AppSec internships",
    ],
    tags: ["ECE", "Systems", "Networking", "Security"],
  },
  {
    key: "mcc",
    name: "Mount Carmel PU College — Pre-University (PCMB)",
    location: "Bengaluru, India",
    period: "PCMB",
    img: "/images/education/mcc.jpg",
    headline: "UPDATE: PCMB foundation powering modern security analytics",
    bullets: [
      "Core: Physics, Chemistry, Mathematics, Biology",
      "Strong math baseline leading to graph theory & risk modeling later",
      "Collaborative learning culture & academic rigor",
    ],
    tags: ["PCMB", "STEM", "Foundations"],
  },
  {
    key: "cluny",
    name: "Cluny Convent High School",
    location: "Jalahalli, Bengaluru, India",
    period: "",
    img: "/images/education/cluny.jpg",
    headline: "ARCHIVE: the origin story — curiosity, puzzles, discipline",
    bullets: [
      "Early exposure to comps & problem-solving",
      "Built study habits & communication that carry into research & teaching",
      "First sparks of cybersecurity curiosity",
    ],
    tags: ["Discipline", "Curiosity", "Foundations"],
  },
];

/* ---------- Fallback visual (used if image missing or fails) ---------- */
function CamFallback({ code }: { code: string }) {
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-md bg-[#0d0d0f]">
      <div className="absolute inset-0 cam-grid" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
      <div className="absolute bottom-2 left-3 flex items-center gap-2">
        <span className="banner-pill select-none">NO FEED</span>
        <span className="banner-pill select-none">CAM: {code}</span>
      </div>
      <div className="cam-watermark">{code}</div>
    </div>
  );
}

/* ---------- Media helpers ---------- */
function CardImage({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  // Compute short code for watermark / CAM pill
  const code = alt.split("—")[0]?.trim().toUpperCase() || "CAM-001";

  if (!src || failed) {
    return <CamFallback code={code} />;
  }

  return (
    <div className="relative h-40 w-full overflow-hidden rounded-md">
      {/* Bottom-left labels so they never clash with text above */}
      <div className="absolute bottom-2 left-3 flex items-center gap-2 z-10">
        <span className="banner-pill select-none">EDU FEED</span>
        <span className="banner-pill select-none">CAM: {code}</span>
      </div>

      {/* Optional REC HUD (top-right) */}
      <div className="rec-hud">
        <span className="rec-dot" aria-hidden />
        <span>REC</span>
        <span>480p</span>
      </div>

      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}     // hide broken-image icon + alt
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-500 hover:scale-[1.02] darkweb-filter"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
}

function LiveBadge({ inView }: { inView: boolean }) {
  return inView ? (
    <span className="bg-danger text-white px-2 py-0.5 rounded pulse-glow">LIVE</span>
  ) : (
    <span className="bg-gray-700 text-white px-2 py-0.5 rounded">ARCHIVE</span>
  );
}

/* ---------- Card ---------- */
function EduCard({ c, delay }: { c: Campus; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const { muted } = useSound();
  const [audio] = useState<HTMLAudioElement>(() => {
    const a = new Audio("/sounds/shutter.mp3");
    a.preload = "auto";
    a.volume = 0.35;
    return a;
  });

  useEffect(() => {
    return () => { try { audio.pause(); audio.currentTime = 0; } catch {} };
  }, [audio]);

  function onHover() {
    if (!muted) {
      try { audio.currentTime = 0; audio.play(); } catch {}
    }
  }

  const prefix =
    c.key === "mcc" ? "🛰️" :
    c.key === "cluny" ? "🕯️" :
    c.key === "bms" ? "💀" : "🔴";

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 18, filter: "blur(2px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, delay }}
      onMouseEnter={onHover}
      className="border border-gray-800 rounded-lg bg-black/30 overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:bg-black/40 transition-colors"
    >
      <CardImage src={c.img} alt={c.name} />

      {/* readable, slower banner */}
      <div className="px-4 pt-3">
        <GlitchBanner
          phrases={[...(LINES[c.key] ?? ["Transmission unstable"])]}
          prefix={prefix}
          intervalMs={4200}
        />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 text-xs">
          <LiveBadge inView={inView} />
          {c.location && <span className="text-gray-400">{c.location}</span>}
          {c.period && <span className="text-gray-500">• {c.period}</span>}
        </div>

        <h3 className="mt-2 font-semibold">{c.name}</h3>
        <div className="mt-1 text-sm text-gray-300 underline-glitch">{c.headline}</div>

        <ul className="mt-3 list-disc pl-5 space-y-1 text-sm leading-relaxed text-gray-200">
          {c.bullets.map((b, j) => (
            <li key={`${c.key}-b-${j}`}>{b}</li>
          ))}
        </ul>

        {c.tags && (
          <div className="mt-3 flex flex-wrap gap-2">
            {c.tags.map((t) => (
              <span key={`${c.key}-t-${t}`} className="text-[11px] border border-gray-700 px-2 py-0.5 rounded">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* ---------- Page ---------- */
export default function Education() {
  return (
    <SectionReveal>
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <h2
            className="text-2xl md:text-3xl font-mono text-neon glitch-anim glitch-responsive"
            data-text="Education Newsfeed"
          >
            Education Newsfeed
          </h2>
          <div className="hidden sm:block text-xs text-gray-400 font-mono">Node: edu.sush.onion</div>
        </div>

        <div className="caution-tape overflow-hidden">
          <div className="marquee">
            <div className="marquee-track">
              <span>DO NOT CROSS — EDUCATION NODE — AUTHORIZED PERSONNEL ONLY</span>
              <span>DO NOT CROSS — EDUCATION NODE — AUTHORIZED PERSONNEL ONLY</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {campuses.map((c, idx) => (
            <EduCard key={c.key} c={c} delay={idx * 0.05} />
          ))}
        </div>

        <div className="caution-tape overflow-hidden">
          <div className="marquee">
            <div className="marquee-track">
              <span>STAY CLEAR — EDUCATION NODE UNDER ACTIVE REVIEW</span>
              <span>STAY CLEAR — EDUCATION NODE UNDER ACTIVE REVIEW</span>
            </div>
          </div>
        </div>

        {/* bottom ticker */}
        <div className="mt-2">
          <div className="marquee">
            <div className="marquee-track text-xs text-gray-400 font-mono">
              <span>📡 Purdue: Caffeinated zombengineers found all across campus…</span>
              <span>🛰️ Mount Carmel PU College: Scientists baffled as hackers multitask 47 assignments, 12 club roles, and a mental breakdown while still looking like Pinterest boards in motion…</span>
              <span>🔧 BMS: Local engineering college spotted creating compiler errors and hasn’t seen sunlight since 2nd sem…</span>
              <span>🏫 Cluny: Accidentally trains elite socially-anxious overachievers with passive-aggressive penmanship and god-tier notebook aesthetics…</span>
              {/* duplicate once for perfectly seamless loop */}
              <span>📡 Purdue: Caffeinated zombengineers found all across campus…</span>
              <span>🛰️ Mount Carmel PU College: Scientists baffled as hackers multitask 47 assignments, 12 club roles, and a mental breakdown while still looking like Pinterest boards in motion…</span>
              <span>🔧 BMS: Local engineering college spotted creating compiler errors and hasn’t seen sunlight since 2nd sem…</span>
              <span>🏫 Cluny: Accidentally trains elite socially-anxious overachievers with passive-aggressive penmanship and god-tier notebook aesthetics…</span>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
