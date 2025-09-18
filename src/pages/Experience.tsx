import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useInView } from "framer-motion";
import SectionReveal from "../components/SectionReveal";

/* =========================
   Types & Data
   ========================= */
type Listing = {
  title: string;
  org: string;
  location: string;
  when: string;
  vendor?: string;
  tags: string[];
  metric?: string;
  bullets: string[];
};

const listings: Listing[] = [
  {
    title: "Application Security Intern",
    org: "Amazon AWS",
    location: "Seattle, WA",
    when: "May 2025 – Aug 2025",
    vendor: "Pentest & VOF teams",
    tags: ["AppSec", "Automation", "TLSChecker", "AWS"],
    metric: "Reduced manual verification overhead by ~85% with 'Integ'.",
    bullets: [
      "Developed “Integ,” integrating TLSChecker with Touchdown to streamline verification between fix engineers and builders; adopted by pentesters and VOF engineers across Amazon/AWS.",
      "Discovered a Sev-3 hardware vulnerability in the IOMMU BIOS while assessing a hardware pentest project, strengthening system-level security posture.",
      "Led cross-team tooling efforts, enhancing TLSChecker and collaboration across hardware/software teams to improve fix validation efficiency.",
    ],
  },
  {
    title: "Teaching Assistant (CNIT-271: Cybersecurity II)",
    org: "Purdue University",
    location: "West Lafayette, IN",
    when: "Aug 2025 – Present",
    tags: ["Education", "Secure Coding", "Risk Assessment"],
    bullets: [
      "Led lab sessions and mentored 160+ students on vulnerability analysis, risk assessment, and secure coding within established processes.",
      "Coordinated peer learning groups and contributed to consistent application of security standards; implemented workflow improvements to enhance quality and reliability of security exercises.",
    ],
  },
  {
    title: "Associate Security Risk Analyst",
    org: "Purdue University",
    location: "West Lafayette, IN",
    when: "Feb 2025 – May 2025",
    tags: ["Risk", "NIST", "ISO 27001", "SOC 2", "SIEM"],
    bullets: [
      "Performed cybersecurity risk assessments—identifying threats, vulnerabilities, and compliance gaps—aligned to NIST, ISO 27001, and SOC 2.",
      "Monitored/analyzed security incidents using SIEM; partnered cross-functionally to implement mitigation strategies and improve incident response protocols.",
    ],
  },
  {
    title: "Research Assistant (PARI)",
    org: "Purdue University",
    location: "West Lafayette, IN",
    when: "Dec 2024 – Feb 2025",
    tags: ["Research", "Policy", "Cybersecurity Frameworks"],
    bullets: [
      "Collected and curated cybersecurity information for USAID programs.",
      "Analyzed global cybersecurity frameworks to support digital resilience policy development for international aid initiatives.",
    ],
  },
  {
    title: "System Engineer — Cybersecurity",
    org: "Prophaze",
    location: "Bengaluru, India",
    when: "May 2023 – Jun 2024",
    tags: ["WAF", "Automation", "Threat Analysis"],
    bullets: [
      "Created JSON formats for Prophaze WAF to standardize data flow and improve processing efficiency.",
      "Analyzed attack patterns with security tooling to identify vulnerabilities and refine defenses, reducing response time to threats by ~30%.",
      "Contributed to software design, security scripts, and automation to improve SecOps and WAF architecture.",
    ],
  },
  {
    title: "SOC Intern",
    org: "Prophaze",
    location: "Bengaluru, India",
    when: "Feb 2023 – May 2023",
    tags: ["SOC", "SIEM", "IDS/IPS", "WAF"],
    bullets: [
      "Monitored and responded to 100+ incidents; conducted vulnerability assessments and web app testing via Prophaze WAF, improving detection/mitigation efficiency by ~35%.",
      "Reduced false positives ~40% and improved alert accuracy ~25% by analyzing traffic patterns and tuning WAF rules; improved IPS performance.",
      "Integrated threat intelligence and updated protocols—cutting MTTD by ~30% and MTTR by ~20%.",
    ],
  },
  {
    title: "Web Development Intern",
    org: "Compsoft Technologies",
    location: "Remote, India",
    when: "Jul 2020 – Oct 2020",
    tags: ["Web", "Automation"],
    bullets: [
      "Supported research and content curation for cybersecurity-related initiatives.",
      "Assisted with scripts and tooling to improve reliability and delivery of features across small web projects.",
    ],
  },
];

/* =========================
   Small UI bits
   ========================= */
function Pill({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "good" | "bad";
}) {
  const toneClass =
    tone === "good"
      ? "bg-green-600/20 text-green-300 border-green-600/40"
      : tone === "bad"
      ? "bg-red-600/20 text-red-300 border-red-600/40"
      : "bg-black/30 text-gray-300 border-gray-700/60";
  return (
    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 border rounded ${toneClass}`}>
      {children}
    </span>
  );
}

function Chip({ children }: { children: string }) {
  return <span className="text-[11px] border border-gray-700/80 px-2 py-0.5 rounded">{children}</span>;
}

/* =========================
   Vendor ID Card
   ========================= */
function VendorCard({ l, idx }: { l: Listing; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: 60, rotate: 2, skewX: -2 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0, skewX: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: 0.08 + idx * 0.06, ease: "easeOut" }}
      className="idcard relative rounded-lg p-0 overflow-hidden"
    >
      <div className="id-holo pointer-events-none" />
      <span className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-neon/70 to-transparent" />

      <div className="relative z-10 p-4 grid gap-3">
        <header className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="nfc-chip" />
            <h4 className="font-semibold">Vendor: {l.org} — {l.title}</h4>
          </div>
          <span className="text-xs text-gray-400">{l.when}</span>
        </header>

        <div className="text-xs text-gray-400">
          {l.location}
          {l.vendor && <span className="ml-2 text-gray-500">• Vendor group: {l.vendor}</span>}
        </div>

        {l.metric && (
          <div className="flex items-center gap-2">
            <span className="vendor-rating">Vendor Rating</span>
            <span className="text-sm text-gray-200">{l.metric}</span>
          </div>
        )}

        <div>
          <div className="text-xs text-gray-400 font-mono mb-1">Reviews</div>
          <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed">
            {l.bullets.map((b, i) => (
              <li key={`b-${idx}-${i}`} className="text-gray-200">{b}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs text-gray-400 font-mono mb-1">Accepted Payment</div>
          <div className="flex flex-wrap gap-2">
            {l.tags.map((t) => <Chip key={`${t}-${idx}`}>{t}</Chip>)}
          </div>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <Pill tone={inView ? "good" : "bad"}>{inView ? "Online" : "Offline"}</Pill>
          <div className="barcode" aria-hidden />
        </div>
      </div>
    </motion.article>
  );
}

/* =========================
   Portal Overlay (flashing “BUY BITCOIN”)
   ========================= */
function BuyBitcoinOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Prevent body scroll while the overlay is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  const node = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
      aria-label="Enter experience vendor board"
      role="button"
      style={{ cursor: "pointer" }}
    >
      {/* ambient blobs */}
      <div className="absolute inset-0 parallax-sway pointer-events-none" />
      <div className="absolute inset-0 scanline-thin pointer-events-none" />

      <div className="relative z-10 mx-4 max-w-xl w-full flex flex-col items-center text-center">
        {/* Flashing panel */}
        <div className="w-full rounded-xl border border-red-500/50 bg-gradient-to-b from-red-600/25 to-black/40 shadow-[0_0_40px_rgba(255,0,70,.25)] p-6 animate-pulse">
          <div className="text-[10px] uppercase tracking-[0.2em] text-red-300/90 mb-2">warning</div>
          <h1 className="text-2xl md:text-4xl font-mono font-bold text-red-200 glitch-anim" data-text="BUY BITCOIN">
            BUY BITCOIN
          </h1>
          <div className="mt-3 text-sm text-gray-200">
            Click anywhere to view my portfolio — <span className="text-red-300">verified dealers</span> only.
          </div>
        </div>

        <div className="mt-4 text-[11px] font-mono text-gray-400">
          (Tap or click to continue)
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}

/* =========================
   Page
   ========================= */
export default function Experience() {
  const [overlayOpen, setOverlayOpen] = useState(true);

  return (
    <>
      {/* Portal overlay lives at <body> level so it can never be hidden */}
      <BuyBitcoinOverlay open={overlayOpen} onClose={() => setOverlayOpen(false)} />

      <SectionReveal>
        {/* Header / intro */}
        <section className={`mb-8 relative overflow-hidden rounded-lg border border-gray-800 bg-black/30 p-6 ${overlayOpen ? "blur-[1px] pointer-events-none" : ""}`}>
          <div className="absolute inset-0 parallax-sway pointer-events-none" />
          <div className="absolute inset-0 scanline-thin pointer-events-none" />
          <div className="relative z-10">
            <h2
              className="text-2xl md:text-3xl font-mono text-neon glitch-anim glitch-responsive"
              data-text="BUY BTC — Darknet Vendor Listings"
            >
              BUY BTC — Darknet Vendor Listings
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              Trusted vendors operating on the <span className="text-neon">SUSH/XP Marketplace</span>. Escrow protected, vendor ratings verif’d.
              Click a profile to inspect “goods” — aka my work.
            </p>
          </div>
        </section>

        {/* Vendor grid */}
        <section aria-hidden={overlayOpen} className={overlayOpen ? "pointer-events-none blur-[1px]" : ""}>
          <h3 className="text-xl font-mono text-neon mb-2">Verified Vendors</h3>
          <p className="text-sm text-gray-400 mb-4">
            Each listing is a <span className="text-gray-200">BTC vendor profile</span> (role) with vendor rating, accepted payment (skills), and reviews.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {listings.map((l, idx) => (
              <VendorCard key={`${l.org}-${l.title}-${idx}`} l={l} idx={idx} />
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Tip: Don't click on some random link I say. 
          </p>
        </section>
      </SectionReveal>
    </>
  );
}
