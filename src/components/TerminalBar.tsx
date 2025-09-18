import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Log = { id: number; text: string };

const HELP = [
  "help                -> show this help",
  "whoami              -> short bio",
  "ls -a               -> hidden facts",
  "decrypt --full      -> reveal secret case study",
  "resume              -> open resume",
  "clear               -> clear the terminal",
  "exit                -> hide the terminal",
].join("\n");

export default function TerminalBar() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<Log[]>([
    { id: 0, text: "[*] Hidden service console loaded. Type 'help' to begin." },
  ]);
  const [counter, setCounter] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Toggle with tilde/backtick
    function onKey(e: KeyboardEvent) {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  function push(text: string) {
    setLogs((prev) => [...prev, { id: counter, text }]);
    setCounter((n) => n + 1);
  }

  function handle(cmd: string) {
    const c = cmd.trim();

    if (!c) return;
    push(`$ ${c}`);

    // ROUTER OF FUN COMMANDS
    if (c === "help") {
      push(HELP);
    } else if (c === "whoami") {
      push(
        [
          "Name: Sushmitha Reddy",
          "Role: Cybersecurity engineer • AppSec • Risk & Research",
          "Pitch: I build secure systems and I hack. Sometimes.",
          "Contact: Top right corner. Thank you.",
        ].join("\n")
      );
    } else if (c === "ls -a") {
      push(
        [
          ".bash_history     fun-facts.txt",
          ".ssh              caffeine-level=HIGH",
          "fav-tools         burp, nmap, wireshark, splunk, laptop",
          "fun-facts.txt     Fun fact I don't know but Bangalore's weather is the best",
        ].join("\n")
      );
    } else if (c === "decrypt --full") {
      push(
        [
          "-----BEGIN CASE STUDY-----",
          "Project: Integ (TLSChecker x Touchdown)",
          "Impact: ~85% manual verification overhead eliminated; adopted by pentesters & VOF engineers AWS-wide.",
          "Notes: cross-team tooling, hardware+software validation pipeline.",
          "-----END CASE STUDY-----",
        ].join("\n")
      );
    } else if (c === "decrypt") {
      push("Usage: decrypt --full");
    } else if (c === "resume") {
      push("Opening resume in new tab…");
      window.open("/Sushmitha_Reddy_Resume.pdf", "_blank");
    } else if (c === "clear") {
      setLogs([]);
    } else if (c === "exit") {
      setOpen(false);
    } else {
      push(`command not found: ${c}`);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    handle(input);
    setInput("");
  }

  return (
    <>
      {/* Toggle button (for mouse users) */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-3 right-3 z-50 px-3 py-1.5 bg-black/70 border border-gray-700 text-xs font-mono rounded hover:bg-black/80"
        aria-label="Toggle terminal"
        title="Toggle terminal (press `)"
      >
        ` Console
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed left-0 right-0 bottom-0 z-50 bg-black/85 border-t border-gray-800 font-mono"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="mx-auto max-w-6xl px-4 py-3">
              <div className="text-xs text-gray-400 mb-2">
                Hidden Service Console — type <span className="text-neon">help</span> • press <span className="text-neon">`</span> to hide
              </div>

              {/* LOG AREA */}
              <div className="max-h-48 overflow-auto space-y-1 text-sm text-gray-200">
                {logs.map((l) => (
                  <pre key={l.id} className="whitespace-pre-wrap leading-relaxed">
                    {l.text}
                  </pre>
                ))}
              </div>

              {/* INPUT */}
              <form onSubmit={onSubmit} className="mt-2 flex items-center gap-2">
                <span className="text-neon">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-black/60 border border-gray-700 px-3 py-2 outline-none focus:border-neon"
                  placeholder="type a command… (help)"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-neon text-black font-bold hover:bg-white btn-flicker"
                >
                  RUN
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
