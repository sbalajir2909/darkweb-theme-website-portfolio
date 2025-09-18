import { useMemo } from "react";
import { motion } from "framer-motion";

/* ---------------------- Data ---------------------- */
type SkillListing = {
  category: string;
  name: string;
  price: string;
  tagline: string;
};

const SKILLS: SkillListing[] = [
  // Cybersecurity Tools & Frameworks
  { category: "Cybersecurity Tools", name: "Metasploit Framework", price: "$3,500", tagline: "Exploits Verified" },
  { category: "Cybersecurity Tools", name: "Burp Suite", price: "$2,800", tagline: "Fresh Capture" },
  { category: "Cybersecurity Tools", name: "Nessus", price: "$2,400", tagline: "Vulns Tagged" },
  { category: "Cybersecurity Tools", name: "Nmap", price: "$1,900", tagline: "Ports Open" },
  { category: "Cybersecurity Tools", name: "Wireshark", price: "$1,700", tagline: "Traffic Sniffed" },
  { category: "Cybersecurity Tools", name: "Maltego", price: "$2,200", tagline: "Links Mapped" },
  { category: "Cybersecurity Tools", name: "Snort", price: "$2,000", tagline: "Packets Trapped" },
  { category: "Cybersecurity Tools", name: "OpenVAS", price: "$2,300", tagline: "Scans Complete" },
  { category: "Cybersecurity Tools", name: "Splunk", price: "$3,800", tagline: "Logs Infiltrated" },

  // Programming
  { category: "Programming Languages", name: "Python", price: "$4,000", tagline: "Obfuscation Ready" },
  { category: "Programming Languages", name: "JavaScript", price: "$3,200", tagline: "Client Hook" },
  { category: "Programming Languages", name: "SQL", price: "$3,500", tagline: "Injection Grade" },
  { category: "Programming Languages", name: "HTML5", price: "$1,200", tagline: "Static Mask" },
  { category: "Programming Languages", name: "CSS3", price: "$1,200", tagline: "Stealth Styling" },
  { category: "Programming Languages", name: "C++", price: "$3,600", tagline: "Exploit Engine" },
  { category: "Programming Languages", name: "JSON Formats", price: "$1,000", tagline: "Payload Ready" },
  { category: "Programming Languages", name: "Bash/Shell Scripting", price: "$2,200", tagline: "Automation Scripts" },

  // Network
  { category: "Network Security & Protocols", name: "TCP/IP", price: "$2,100", tagline: "Raw Stack" },
  { category: "Network Security & Protocols", name: "SSL/TLS Handshake", price: "$2,600", tagline: "Handshake Verified" },
  { category: "Network Security & Protocols", name: "DHCP", price: "$1,500", tagline: "Spoofable" },
  { category: "Network Security & Protocols", name: "DNS", price: "$2,000", tagline: "Poisoned Records" },
  { category: "Network Security & Protocols", name: "IPsec", price: "$2,400", tagline: "Tunnelled Access" },
  { category: "Network Security & Protocols", name: "VPN", price: "$2,800", tagline: "Exit Node Clean" },
  { category: "Network Security & Protocols", name: "Network Firewalls", price: "$2,600", tagline: "Bypassed Rules" },
  { category: "Network Security & Protocols", name: "IDS/IPS", price: "$2,700", tagline: "Alert Surge" },
  { category: "Network Security & Protocols", name: "Zero Trust Architecture", price: "$3,400", tagline: "Trustless State" },
  { category: "Network Security & Protocols", name: "Network Engineering", price: "$3,000", tagline: "Stack Forged" },

  // Data
  { category: "Data Analysis & Visualization", name: "Excel", price: "$1,200", tagline: "Pivoted & Cracked" },
  { category: "Data Analysis & Visualization", name: "Jupyter Notebook", price: "$2,200", tagline: "Interactive Exploits" },
  { category: "Data Analysis & Visualization", name: "Anaconda", price: "$2,000", tagline: "Packaged Payloads" },
  { category: "Data Analysis & Visualization", name: "Tableau", price: "$2,400", tagline: "Visual Breach" },

  // Operating Systems
  { category: "Operating Systems", name: "Linux (Ubuntu, Kali)", price: "$3,600", tagline: "Root Access" },
  { category: "Operating Systems", name: "Windows Server", price: "$3,200", tagline: "AD Compromised" },
  { category: "Operating Systems", name: "macOS", price: "$2,800", tagline: "Rooted Shell" },

  // Web Dev/Sec
  { category: "Web Development & Web Security", name: "Nginx", price: "$2,100", tagline: "Reverse Proxy Ready" },
  { category: "Web Development & Web Security", name: "Apache", price: "$2,000", tagline: "Legacy Backdoors" },
  { category: "Web Development & Web Security", name: "JavaScript", price: "$3,200", tagline: "XSS Loaded" },
  { category: "Web Development & Web Security", name: "Content Security Policy (CSP)", price: "$2,600", tagline: "Bypass Kit" },
  { category: "Web Development & Web Security", name: "SQL", price: "$3,500", tagline: "Injection Grade" },
  { category: "Web Development & Web Security", name: "HTML5/CSS3", price: "$1,600", tagline: "Stealth UI" },

  // Other Relevant Skills
  { category: "Other Skills", name: "Vulnerability Assessment", price: "$3,000", tagline: "Exploit Tested" },
  { category: "Other Skills", name: "Risk Analysis", price: "$2,900", tagline: "Exposure Calc" },
  { category: "Other Skills", name: "Penetration Testing", price: "$3,500", tagline: "Verified Breach" },
  { category: "Other Skills", name: "Digital Forensics", price: "$3,600", tagline: "Evidence Extract" },
  { category: "Other Skills", name: "Incident Response", price: "$3,400", tagline: "Breach Contained" },
  { category: "Other Skills", name: "Threat Modelling", price: "$3,200", tagline: "Attack Trees Built" },
  { category: "Other Skills", name: "AWS", price: "$3,800", tagline: "Cloud Rooted" },
  { category: "Other Skills", name: "SIEM (Splunk/QRadar/Sentinel)", price: "$3,500", tagline: "Log Breaches" },
  { category: "Other Skills", name: "IAM", price: "$3,200", tagline: "Identity Forged" },
  { category: "Other Skills", name: "Secure Coding", price: "$2,800", tagline: "Hardened" },
  { category: "Other Skills", name: "NIST CSF / ISO 27001", price: "$2,600", tagline: "Framework Ready" },
  { category: "Other Skills", name: "MITRE ATT&CK", price: "$2,900", tagline: "TTP Verified" },
  { category: "Other Skills", name: "OWASP Top 10", price: "$2,400", tagline: "Web Breach Set" },
  { category: "Other Skills", name: "CIS Benchmarks", price: "$2,200", tagline: "Config Hardening" },
  { category: "Other Skills", name: "Docker", price: "$2,600", tagline: "Container Escape" },
  { category: "Other Skills", name: "Kubernetes", price: "$3,200", tagline: "Cluster Hijacked" },
];

/* ---------------------- Helpers ---------------------- */
const categories = (arr: SkillListing[]) =>
  Array.from(new Set(arr.map((s) => s.category)));

function groupBy<T extends { category: string }>(arr: T[]) {
  return arr.reduce<Record<string, T[]>>((acc, x) => {
    (acc[x.category] ||= []).push(x);
    return acc;
  }, {});
}

/* 3D tilt math: set CSS vars for rotateX/rotateY */
function handleTilt(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rx = ((y / rect.height) - 0.5) * -6; // -3..3
  const ry = ((x / rect.width) - 0.5) * 6;   // -3..3
  el.style.setProperty("--rx", `${rx}deg`);
  el.style.setProperty("--ry", `${ry}deg`);
}
function resetTilt(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  const el = e.currentTarget;
  el.style.setProperty("--rx", `0deg`);
  el.style.setProperty("--ry", `0deg`);
}

/* ---------------------- Ticker ---------------------- */
function Ticker() {
  const items = useMemo(
    () =>
      SKILLS.slice(0, 18).map(
        (s) => `NEW LISTING: ${s.name} — ${s.price} • ${s.tagline}`
      ),
    []
  );
  return (
    <div className="mt-10 border-t border-red-900/40 pt-3">
      <div className="marquee">
        <div className="marquee-track text-xs font-mono text-red-400">
          {items.concat(items).map((t, i) => (
            <span key={i} className="ticker-spark">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------- Card ---------------------- */
function SkillCard({
  s,
  delay,
}: {
  s: SkillListing;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.42, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      className="tilt-card relative bg-black/40 border border-red-900/50 rounded-lg p-4 shadow-md cursor-pointer neon-border"
      onMouseMove={handleTilt}
      onMouseLeave={resetTilt}
    >
      {/* scanline */}
      <div className="card-scanline" aria-hidden />

      <div className="flex items-start justify-between gap-2">
        <h3 className="text-red-100 font-semibold leading-5">{s.name}</h3>
        <span className="text-[10px] px-2 py-0.5 rounded bg-red-900/30 border border-red-900/60 text-red-300 uppercase tracking-wider">
          {s.category.split(" ")[0]}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="text-sm text-red-400 italic">{s.tagline}</div>
        <div className="text-sm text-red-200 font-mono price-pulse">{s.price}</div>
      </div>
    </motion.div>
  );
}

/* ---------------------- Page ---------------------- */
export default function Skills() {
  const grouped = useMemo(() => groupBy(SKILLS), []);

  return (
    <div className="relative px-6 py-10">
      <h1
        className="text-3xl font-mono text-red-500 mb-6 glitch-anim glitch-responsive"
        data-text="SKILLS FOR SALE"
      >
        SKILLS FOR SALE
      </h1>

      <div className="space-y-10">
        {categories(SKILLS).map((cat, i) => {
          const items = grouped[cat] || [];
          return (
            <section key={cat}>
              <motion.h2
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.35 }}
                className="text-lg font-mono text-red-400 mb-3"
              >
                [{cat}]
              </motion.h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((s, j) => (
                  <SkillCard key={s.name} s={s} delay={i * 0.25 + j * 0.07} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <Ticker />
    </div>
  );
}
