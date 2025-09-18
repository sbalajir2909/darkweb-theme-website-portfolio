import { AnimatePresence, motion } from "framer-motion";
import type { ResearchProject } from "./EnvelopeCard";

type Props = {
  open: boolean;
  data?: ResearchProject | null;
  onClose: () => void;
};

export default function ResearchModal({ open, data, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && data && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-[#0b0003]/85 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* dossier */}
          <motion.div
            className="relative z-10 w-[min(900px,92vw)] dossier"
            initial={{ y: 30, scale: .98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: .98, opacity: 0 }}
            transition={{ duration: .25, ease: 'easeOut' }}
          >
            {/* dossier header */}
            <div className="flex items-start justify-between gap-4 border-b border-red-900/50 pb-3">
              <div className="space-y-1">
                <div className="text-[10px] font-mono tracking-widest text-red-300/90">
                  FILE #{data.id} • {data.year}
                </div>
                <h3 className="text-xl font-semibold text-red-100">{data.title}</h3>
                <div className="text-[10px] font-mono tracking-widest text-black bg-red-400/90 px-2 py-0.5 rounded inline-block">
                  {data.classification ?? "CONFIDENTIAL"}
                </div>
              </div>
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-sm rounded border border-red-900/60 text-red-200 hover:bg-red-900/20"
              >
                Close
              </button>
            </div>

            {/* body */}
            <div className="grid gap-4 pt-4">
              <p className="text-sm text-red-200/90">{data.abstract}</p>

              {data.methods?.length ? (
                <section>
                  <h4 className="sect-title">Methods</h4>
                  <ul className="sect-list">
                    {data.methods.map((m, i) => <li key={i}>{m}</li>)}
                  </ul>
                </section>
              ) : null}

              <section>
                <h4 className="sect-title">Key Findings</h4>
                <ul className="sect-list">
                  {data.findings.map((f, i) => (
                    <li key={i}>
                      {f} <span className="redact" />
                    </li>
                  ))}
                </ul>
              </section>

              {data.artifacts?.length ? (
                <section>
                  <h4 className="sect-title">Artifacts</h4>
                  <ul className="sect-list">
                    {data.artifacts.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                </section>
              ) : null}

              <div className="flex flex-wrap gap-2">
                {data.tags.map((t) => (
                  <span key={t} className="pill">{t}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="barcode-wide" aria-hidden />
                <div className="text-[10px] font-mono tracking-widest text-red-400/70">
                  {data.chainOfCustody ?? "CHAIN OF CUSTODY • LOGGED"}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
