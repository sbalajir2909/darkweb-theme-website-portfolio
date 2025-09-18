// src/pages/Certificates.tsx
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- Types ---------------- */
type Cert = {
  id: string;
  title: string;
  issuer: string;
  level?: "FOUNDATION" | "INTERMEDIATE" | "ADVANCED";
  skills: string[];
  issued?: string;           // ISO date for completed certs
  credentialId?: string;
  status?: "ONGOING";        // set for in-progress items
};

/* ---------------- Data (your list) ---------------- */
const CERTS: Cert[] = [
  {
    id: "EXH-001",
    title: "CEH — Certified Ethical Hacker",
    issuer: "EC-Council",
    level: "ADVANCED",
    skills: ["Ethical Hacking", "Recon", "Exploitation", "Reporting"],
    issued: "2024-07-01",
    credentialId: "CEH-XXXX-REDACTED",
  },
  {
    id: "EXH-002",
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google",
    level: "FOUNDATION",
    skills: ["Security Fundamentals", "SIEM", "IR Basics", "Linux", "Python"],
    issued: "2024-06-15",
  },
  {
    id: "EXH-003",
    title: "Advanced Cybersecurity Program",
    issuer: "Intellipaat & IIT Guwahati",
    level: "INTERMEDIATE",
    skills: ["Network Security", "IAM", "Cloud Sec", "Vuln Mgmt"],
    issued: "2024-11-20",
  },
  {
    id: "EXH-004",
    title: "OSINT Training Certification",
    issuer: "Rivi Hacks",
    level: "FOUNDATION",
    skills: ["OSINT", "Profiling", "Attribution", "Investigation"],
    issued: "2023-09-10",
  },
  {
    id: "EXH-005",
    title: "Web Development Professional",
    issuer: "Crio.do",
    level: "FOUNDATION",
    skills: ["HTML5", "CSS3", "JavaScript", "Nginx/Apache Basics"],
    issued: "2021-10-05",
  },
  {
    id: "EXH-006",
    title: "IBM Cybersecurity Analyst",
    issuer: "IBM",
    level: "INTERMEDIATE",
    skills: ["SIEM", "QRadar", "Threat Analysis", "IR Playbooks"],
    issued: "2024-03-22",
  },
  {
    id: "EXH-007",
    title: "CCNA — Cisco Certified Network Associate",
    issuer: "Cisco",
    level: "INTERMEDIATE",
    skills: ["Routing & Switching", "TCP/IP", "VPN", "Firewalling"],
    issued: "2023-06-01",
    credentialId: "CCNA-XXXX-REDACTED",
  },
  {
    id: "EXH-008",
    title: "OSCP — Offensive Security Certified Professional",
    issuer: "OffSec",
    level: "ADVANCED",
    skills: ["Penetration Testing", "Privilege Escalation", "Buffer Overflows"],
    status: "ONGOING",
  },
  {
    id: "EXH-009",
    title: "AWS Security Specialist",
    issuer: "Amazon Web Services",
    level: "INTERMEDIATE",
    skills: ["IAM", "KMS", "CSPM", "Encryption", "Cloud Threats"],
    issued: "2024-12-02",
  },
  {
    id: "EXH-010",
    title: "CompTIA Security+",
    issuer: "CompTIA",
    level: "FOUNDATION",
    skills: ["Risk", "Controls", "Network Sec", "Cryptography"],
    status: "ONGOING",
  },
  {
    id: "EXH-011",
    title: "ISC2 Certification",
    issuer: "ISC2",
    level: "FOUNDATION",
    skills: ["Security Principles", "Access Control", "Network Security"],
    issued: "2024-05-10",
  },
];

/* -------------- Small bits -------------- */
function LevelPill({ lv }: { lv?: Cert["level"] }) {
  const map = {
    FOUNDATION: "bg-red-900/20 border-red-900/50 text-red-300",
    INTERMEDIATE: "bg-yellow-900/10 border-yellow-700/40 text-yellow-300",
    ADVANCED: "bg-green-900/20 border-green-900/50 text-green-300",
  } as const;
  const cls = lv ? map[lv] : "bg-black/30 border-gray-700 text-gray-300";
  return (
    <span className={`text-[10px] tracking-widest uppercase px-2 py-0.5 border rounded ${cls}`}>
      {lv ?? "UNSPEC"}
    </span>
  );
}

function StatusPill({ status }: { status?: Cert["status"] }) {
  if (!status) return null;
  return (
    <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 border rounded border-yellow-700/40 bg-yellow-900/10 text-yellow-300">
      {status}
    </span>
  );
}

/* -------------- Exhibit Card -------------- */
function ExhibitCard({
  c,
  i,
  onOpen,
}: {
  c: Cert;
  i: number;
  onOpen: (c: Cert) => void;
}) {
  // const rightSide = c.status === "ONGOING"
  //   ? <span className="text-[10px] font-mono text-yellow-300/90">ONGOING</span>
  //   : c.issued
  //     ? <span className="text-[10px] font-mono text-red-300/90">{new Date(c.issued).toLocaleDateString()}</span>
  //     : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className="evidence-bag relative overflow-hidden rounded-lg border border-red-900/50 bg-gradient-to-b from-[#1a0004] to-[#120003] p-4 cursor-pointer"
      onClick={() => onOpen(c)}
      aria-label={`Open certificate ${c.title}`}
    >
      <div className="tamper-tape" aria-hidden />
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-mono text-red-400/80">EXHIBIT #{c.id}</div>
          <h3 className="text-red-100 font-semibold leading-5">{c.title}</h3>
          <div className="mt-1 text-xs text-red-300/90">{c.issuer}</div>
        </div>
        <div className="flex items-center gap-2">
          <LevelPill lv={c.level} />
          <StatusPill status={c.status} />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {c.skills.slice(0, 5).map((s) => (
          <span key={s} className="px-2 py-0.5 text-[11px] rounded bg-black/40 border border-red-900 text-red-300">
            {s}
          </span>
        ))}
        {c.skills.length > 5 && (
          <span className="px-2 py-0.5 text-[11px] rounded bg-black/30 border border-red-900/40 text-red-400/80">
            +{c.skills.length - 5} more
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-[10px] font-mono text-red-500/70">CHAIN: SUSH ▸ VERIFY ▸ LOCKER</div>
        <div className="verify-stamp">VERIFY</div>
      </div>

      <div className="bag-scanline" aria-hidden />
    </motion.article>
  );
}

/* -------------- Modal -------------- */
function CertModal({ c, onClose }: { c: Cert; onClose: () => void }) {
  const issued = useMemo(
    () => (c.issued ? new Date(c.issued).toLocaleDateString() : undefined),
    [c.issued]
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-full max-w-3xl rounded-xl border border-red-900/50 bg-gradient-to-b from-[#2b0005] to-[#210003] shadow-2xl p-6"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-300 hover:text-red-100"
          aria-label="Close"
        >
          ✖
        </button>

        <div className="flex items-center justify-between text-xs font-mono text-red-300/90 mb-2">
          <span>EXHIBIT #{c.id}</span>
          <span>{c.status === "ONGOING" ? "ONGOING" : issued}</span>
        </div>

        <h2 className="text-2xl font-bold text-red-100">{c.title}</h2>
        <div className="mt-1 text-red-300">{c.issuer}</div>

        {c.credentialId && (
          <div className="mt-2 text-xs text-red-400">
            Credential ID: <span className="font-mono">{c.credentialId}</span>
          </div>
        )}

        <div className="mt-5">
          <h3 className="text-red-400 font-semibold">Skills</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {c.skills.map((s) => (
              <span key={s} className="px-2 py-0.5 text-[11px] rounded bg-black/40 border border-red-900 text-red-300">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LevelPill lv={c.level} />
            <StatusPill status={c.status} />
          </div>
          <div className="flex items-center gap-2 text-xs text-red-400 font-mono">
            <span className="pgp-dot" /> PGP SIG: OK
          </div>
        </div>

        {/* No download/view button per your request */}
      </motion.div>
    </motion.div>
  );
}

/* -------------- Page -------------- */
export default function Certificates() {
  const [active, setActive] = useState<Cert | null>(null);

  return (
    <div className="relative px-6 py-10">
      <h1
        className="text-3xl font-mono text-red-500 mb-6 glitch-anim glitch-responsive"
        data-text="EVIDENCE LOCKER — CERTS"
      >
        EVIDENCE LOCKER — CERTS
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CERTS.map((c, i) => (
          <ExhibitCard key={c.id} c={c} i={i} onOpen={setActive} />
        ))}
      </div>

      <AnimatePresence>
        {active && <CertModal c={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </div>
  );
}
