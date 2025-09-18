import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [showStamp, setShowStamp] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowStamp(false), 5000); // 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-black text-red-400">
      {/* ===== Stamp Overlay ===== */}
      <AnimatePresence>
        {showStamp && (
          <motion.div
            key="stamp"
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1.2, opacity: 1, rotate: -2 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="text-6xl md:text-8xl font-extrabold tracking-widest text-red-600 border-8 border-red-800 px-8 py-6 uppercase stamp-effect">
              I KNOW WHO YOU ARE
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Contact Section ===== */}
      {!showStamp && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 w-full max-w-2xl text-center"
        >
          <h1
            className="text-3xl md:text-5xl font-mono text-red-500 glitch-anim mb-10"
            data-text="SHAKE HANDS FOR THE TRADE?"
          >
            SHAKE HANDS FOR THE TRADE?
          </h1>

          <div className="bg-black/60 border border-red-900 rounded-xl shadow-lg p-8 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 scanline-thin pointer-events-none" />

            <h2 className="text-xl font-bold text-red-400 mb-4">Dealer Details</h2>
            <p className="text-red-300 font-mono mb-2">
              <span className="text-red-500">Name:</span> Sushmitha Reddy Balaji Reddy
            </p>
            <p className="text-red-300 font-mono mb-2">
              <span className="text-red-500">Contact:</span> +1 (317) 220-1402
            </p>
            <p className="text-red-300 font-mono mb-2">
              <span className="text-red-500">Emails:</span> sbalajir@purdue.edu • 29sushmitha9@gmail.com
            </p>

            <div className="mt-6">
              <a
                href="/Sushmitha_Reddy_Resume.pdf"
                download
                className="inline-block px-6 py-3 text-sm font-bold text-red-200 border border-red-700 rounded-md hover:bg-red-800/30 transition btn-flicker"
              >
                ⬇ DOWNLOAD RESUME
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
