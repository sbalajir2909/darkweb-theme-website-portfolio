import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ========= Types ========= */
type ResearchProject = {
  id: string;
  year: string;
  classification: "CONFIDENTIAL" | "RESTRICTED" | "SECRET";
  title: string;
  abstract: string;
  methods: string[];
  findings: string[];
  artifacts: string[];
  tags: string[];
  chainOfCustody: string;
};

/* ========= Data ========= */
const PROJECTS: ResearchProject[] = [
  {
    id: "RA-GRAPH-2025",
    year: "2025",
    classification: "CONFIDENTIAL",
    title: "Asset-Aware PageRank-based Security Resource Allocation for Attack Graphs",
    abstract:
      "Defense allocator that weights PageRank by asset criticality, exploit feasibility, and blast radius to steer scarce controls toward consequential nodes.",
    methods: [
      "Graph construction from CVE scan + service inventory",
      "Criticality scoring (CIA-weighted asset values)",
      "Feasibility model from CVSS + reachability",
      "Greedy vs MILP allocation; robustness under topology drift",
    ],
    findings: [
      "12–18% better breach reduction vs degree/PageRank baselines",
      "Greedy ≈95% of MILP optimum at <2% of runtime",
      "Graceful degradation under 10–20% edge perturbation",
    ],
    artifacts: ["Python prototype", "Synthetic + enterprise-like datasets", "Evaluation scripts"],
    tags: ["Attack Graphs", "PageRank", "Resource Allocation", "Risk Modeling"],
    chainOfCustody: "INT ▸ SUSH ▸ FACULTY REVIEW",
  },
  {
    id: "CV2X-2025",
    year: "2025",
    classification: "RESTRICTED",
    title: "Connected Vehicles Traffic Management (Ramp Cast II)",
    abstract:
      "Threat modeling + bench tests for RSU/ramp-meter controllers: signature schemes, beacon storms, and resilience for mixed-vendor C-V2X stacks.",
    methods: [
      "STRIDE + attack-tree modeling",
      "HIL bench with RSU firmware variants",
      "Latency/throughput under ECDSA / Ed25519",
      "Fault injection: packet loss/burst, boot-loop",
    ],
    findings: [
      "Bootstrapping beacon storms raise ramp decision latency by 180–220 ms",
      "Ed25519 adds ~2.1% E2E latency @100 msg/s (safe for ramp decisions)",
      "4 reproducible crash signatures traced to watchdog misconfig",
    ],
    artifacts: ["Bench harness", "Threat model docs", "Packet captures"],
    tags: ["V2X", "Threat Modeling", "Realtime", "Bench"],
    chainOfCustody: "LAB ▸ SUSH ▸ PARTNER",
  },
  {
    id: "CLOUDRISK-2024",
    year: "2024",
    classification: "CONFIDENTIAL",
    title: "Cloud Security Risk Analysis for Data Protection",
    abstract:
      "Multi-tenant data protection risks: IAM misconfigs, exfil paths, KMS isolation; measured mitigation via short-lived creds & envelope encryption.",
    methods: [
      "DFD + control mapping (NIST 800-53, ISO 27001)",
      "KMS isolation & envelope encryption tests",
      "IAM misconfig simulation + attack path enumeration",
    ],
    findings: [
      "~35% drop in exfil likelihood with key isolation + short-lived creds",
      "Alert fatigue reduced 25% through dedup + enrichment",
      "Residual gap: multi-cloud audit trail correlation",
    ],
    artifacts: ["Risk register", "Control matrix", "IaC guardrails (Terraform)"],
    tags: ["Cloud", "Risk", "Encryption", "IAM", "KMS"],
    chainOfCustody: "INT ▸ GRC ▸ ENG",
  },
  {
    id: "LIFI-2023",
    year: "2023",
    classification: "RESTRICTED",
    title: "Secure Information Transmission via Li-Fi",
    abstract:
      "Physical-layer security using randomized OOK timing; reduce eavesdropper SNR on visible-light channels with minimal throughput loss.",
    methods: ["Optical channel modeling", "Randomized OOK + interleaving", "Eavesdropper SNR sweeps"],
    findings: ["Off-axis SNR down 6–9 dB for eavesdroppers", "Throughput −4% @ BER ≤ 1e-5"],
    artifacts: ["MATLAB/NumPy models", "Emitter/receiver PCBs"],
    tags: ["Li-Fi", "Physical Layer", "Mitigations", "Optical Security"],
    chainOfCustody: "LAB ▸ SUSH ▸ ARCHIVE",
  },
  {
    id: "PARI-USAID-2025",
    year: "2025",
    classification: "CONFIDENTIAL",
    title: "Cybersecurity Information Curation for USAID Programs",
    abstract:
      "Curated global frameworks + threat intel to support digital resilience policy for developing nations; overlap + gap analysis across donors.",
    methods: [
      "Framework comparison (NIST, ISO, EU NIS2)",
      "Threat landscape data aggregation",
      "Policy impact assessment",
    ],
    findings: [
      "Detected overlapping donor policies → risk of redundant funding",
      "IR capability gaps in several Sub-Saharan initiatives",
    ],
    artifacts: ["Policy matrices", "Threat briefs", "USAID alignment report"],
    tags: ["Policy", "Cybersecurity Frameworks", "USAID", "Global Research"],
    chainOfCustody: "PARI ▸ SUSH ▸ PROGRAM",
  },
];

/* ========= Terminal Boot (fake onion access) ========= */
function TerminalBoot({ onDone }: { onDone: () => void }) {
  const lines = useMemo(
    () => [
      ">> bootstrapping tor circuits …",
      ">> resolving hidden service: research.sush.onion",
      ">> handshaking: OK     latency: 128ms",
      ">> ACCESSING .onion FILESYSTEM //pouch/*",
      ">> decrypting redacted indices …",
      ">> checksum verif: PASS",
      ">> mount at /mnt/research/pouches  — OK",
      ">> ready. press any key to continue_",
    ],
    []
  );
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => {
        const next = i + 1;
        if (next >= lines.length) {
          clearInterval(id);
          setTimeout(onDone, 450);
        }
        return Math.min(next, lines.length);
      });
    }, 420);

    const go = () => onDone();
    window.addEventListener("keydown", go);
    window.addEventListener("click", go);
    return () => {
      clearInterval(id);
      window.removeEventListener("keydown", go);
      window.removeEventListener("click", go);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-[2px] text-red-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 parallax-sway pointer-events-none" />
      <pre className="relative z-10 max-w-3xl mx-auto mt-24 p-6 border border-red-900/50 rounded bg-black/40 font-mono text-sm leading-6">
        {lines.slice(0, idx).map((l, i) => (
          <div key={i}>{l}</div>
        ))}
        <motion.span
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.0, repeat: Infinity }}
        >
          ▌
        </motion.span>
      </pre>
    </motion.div>
  );
}

/* ========= Envelope (pouch) ========= */
function Envelope({ p, onOpen }: { p: ResearchProject; onOpen: () => void }) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      onClick={onOpen}
      className="file-env p-5 cursor-pointer select-none"
      aria-label={`Open dossier for ${p.title}`}
    >
      <div className="file-tab">FILE • {p.id}</div>

      {/* visible “peek” band under flap */}
      <div className="mt-12">
        <div className="flex items-center justify-between text-[11px] font-mono text-red-300/80">
          <span>{p.year}</span>
          <span>{p.chainOfCustody}</span>
        </div>
        <h3 className="mt-2 text-lg font-bold text-red-200">{p.title}</h3>
        <p className="mt-1 text-sm text-red-400 line-clamp-2">{p.abstract}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[11px] rounded bg-black/40 border border-red-900 text-red-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 rule-bar" aria-hidden />
        <div className="mt-2 text-[10px] tracking-widest text-red-500/70 font-mono">
          {p.classification}
        </div>
      </div>
    </motion.article>
  );
}

/* ========= Dossier Modal ========= */
function Dossier({ p, onClose }: { p: ResearchProject; onClose: () => void }) {
  // Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // lock scroll
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev || "";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}               // backdrop click
      role="dialog"
      aria-modal="true"
      aria-label={`Dossier for ${p.title}`}
    >
      <div
        className="relative w-full max-w-3xl bg-gradient-to-b from-[#2b0005] to-[#210003] border border-red-900/50 rounded-xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()} // prevent backdrop close
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-300 hover:text-red-100"
          aria-label="Close dossier"
        >
          ✖
        </button>

        <div className="mb-3 flex items-center justify-between text-xs font-mono text-red-300/90">
          <span>
            FILE #{p.id} • {p.year}
          </span>
          <span>{p.chainOfCustody}</span>
        </div>

        <div className="mb-4 inline-flex items-center gap-2">
          <span className="px-2 py-0.5 border border-red-900 rounded text-[10px] tracking-widest text-red-200">
            {p.classification}
          </span>
        </div>

        <h2 className="text-2xl font-bold text-red-100">{p.title}</h2>
        <p className="mt-2 text-red-300">{p.abstract}</p>

        <div className="mt-5 grid md:grid-cols-2 gap-6">
          <section>
            <h3 className="text-red-400 font-semibold">Methods</h3>
            <ul className="list-disc pl-5 mt-1 text-sm text-red-300 space-y-1">
              {p.methods.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-red-400 font-semibold">Key Findings</h3>
            <ul className="list-disc pl-5 mt-1 text-sm text-red-300 space-y-1">
              {p.findings.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-5">
          <h3 className="text-red-400 font-semibold">Artifacts</h3>
          <ul className="list-disc pl-5 mt-1 text-sm text-red-300 space-y-1">
            {p.artifacts.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>

        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[11px] rounded bg-black/40 border border-red-900 text-red-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ========= Page ========= */
export default function Research() {
  const [booting, setBooting] = useState(true);
  const [active, setActive] = useState<ResearchProject | null>(null);

  return (
    <div className="relative px-6 py-10">
      <h1
        className="text-3xl font-mono text-red-500 mb-6 glitch-anim glitch-responsive"
        data-text="LEAKED CASE FILES — RESEARCH"
      >
        LEAKED CASE FILES — RESEARCH
      </h1>

      {/* grid appears after terminal boot */}
      {!booting && (
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <Envelope key={p.id} p={p} onOpen={() => setActive(p)} />
          ))}
        </div>
      )}

      <AnimatePresence>
        {booting && <TerminalBoot onDone={() => setBooting(false)} />}
        {active && <Dossier p={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </div>
  );
}
