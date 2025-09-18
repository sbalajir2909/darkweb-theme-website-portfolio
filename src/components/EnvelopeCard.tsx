import { motion } from "framer-motion";

export type ResearchProject = {
  id: string;
  year: string;
  title: string;
  classification?: "CONFIDENTIAL" | "RESTRICTED" | "SECRET";
  abstract: string;
  findings: string[];
  tags: string[];
  methods?: string[];
  artifacts?: string[];
  chainOfCustody?: string;
  link?: string;
};

type Props = {
  project: ResearchProject;
  onOpen: (p: ResearchProject) => void;
};

export default function EnvelopeCard({ project, onOpen }: Props) {
  return (
    <motion.article
      layout
      className="relative group cursor-pointer select-none rounded-lg overflow-hidden"
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* pouch background with vignette */}
      <div className="pouch-bg ring-1 ring-red-900/50 rounded-lg">

        {/* file tab */}
        <div className="absolute -top-3 left-6">
          <div className="file-tab">
            <span className="text-[10px] font-mono tracking-widest">
              FILE #{project.id} • {project.year}
            </span>
          </div>
        </div>

        {/* string clasp + wax seal */}
        <div className="absolute right-6 top-5 flex items-center gap-2">
          <span className="string-tie" />
          <span className="wax-seal" />
        </div>

        {/* torn flap */}
        <div className="pouch-flap" />

        {/* content “peek” layer (blurred until hover) */}
        <div className="p-5 pt-16">
          <div className="peek-window">
            <div className="peek-gradient" />
            <div className="grid gap-2 px-4 py-3">
              <h3 className="text-sm font-semibold text-red-100">
                {project.title}
              </h3>
              <p className="text-xs text-red-200/90 line-clamp-3">
                {project.abstract}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] text-red-200 border border-red-800/70 bg-black/30 px-1.5 py-[2px] rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* footer strip: barcode + chain of custody */}
        <div className="flex items-center justify-between px-5 pb-4">
          <div className="barcode-mini" aria-hidden />
          <div className="text-[10px] font-mono tracking-widest text-red-400/70">
            {project.classification ?? "CONFIDENTIAL"} • {project.chainOfCustody ?? "CHAIN OF CUSTODY"}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
