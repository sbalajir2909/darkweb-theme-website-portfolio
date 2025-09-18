import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const PASSWORDS = {
  professional: "givemeajob",
  startup: "givememoney",
  fun: "givemecoffee",
} as const;
type Mode = keyof typeof PASSWORDS;

export default function LoginGate({ onUnlock }:{ onUnlock:(m:Mode)=>void }){
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle"|"ok"|"err">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const boot = useMemo(()=>[
    "Connecting to TOR node... [OK]",
    "Establishing secure channel... [OK]",
    "Loading hidden services... [OK]",
    "Fingerprint: 6C:F1:7A:BD:42:9E:AA:13",
  ],[]);

  useEffect(()=>{
    const m = sessionStorage.getItem("unlockedMode") as Mode | null;
    if (m) onUnlock(m);
    inputRef.current?.focus();
  }, [onUnlock]);

  function submit(){
    const m = (Object.keys(PASSWORDS) as Mode[])
      .find((k)=> input.trim().toLowerCase() === PASSWORDS[k]);
    if (m){
      setStatus("ok");
      sessionStorage.setItem("unlockedMode", m);
      setTimeout(()=> onUnlock(m), 500);
    } else {
      setStatus("err");
      setTimeout(()=> setStatus("idle"), 600);
    }
  }

  return (
    <div className="h-screen w-screen bg-bg text-white font-mono flex items-center justify-center crt scanline">
      <div className="max-w-2xl w-full p-6 flicker">
        <div className="mb-6 text-sm text-gray-400 space-y-1">
          {boot.map((l,i)=><div key={i}>{l}</div>)}
        </div>

        <motion.h1
          className="text-neon text-4xl md:text-5xl mb-4 glitch-anim"
          data-text="ACCESS NODE: SUSHMITHA"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          ACCESS NODE: SUSHMITHA
        </motion.h1>

        <label className="block text-sm text-gray-400 mb-2">Enter password to continue</label>
        <input
          ref={inputRef}
          value={input}
          onChange={(e)=> setInput(e.target.value)}
          onKeyDown={(e)=> e.key==="Enter" && submit()}
          className={`w-full bg-black/60 border px-4 py-3 outline-none tracking-wide
            ${status==="err" ? "border-danger" : "border-gray-700 focus:border-neon"}`}
          placeholder='hint: "givemeajob", "givememoney", or "givemecoffee"'
          autoComplete="off"
        />
        <button onClick={submit} className="mt-4 px-4 py-2 bg-neon text-black font-bold hover:bg-white">
          UNLOCK
        </button>

        {status==="ok" && <div className="mt-3 text-neon">ACCESS GRANTED</div>}
        {status==="err" && <div className="mt-3 text-danger">ACCESS DENIED</div>}
      </div>
    </div>
  );
}
