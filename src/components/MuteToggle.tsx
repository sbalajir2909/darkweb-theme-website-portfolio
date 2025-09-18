import { useSound } from "../state/SoundContext";

export default function MuteToggle() {
  const { muted, toggle } = useSound();
  return (
    <button
      onClick={toggle}
      className={`text-xs font-mono px-2 py-1 border rounded ${muted ? "border-gray-700 text-gray-400" : "border-neon text-neon"}`}
      title={muted ? "Unmute SFX" : "Mute SFX"}
      aria-pressed={muted}
    >
      {muted ? "SFX: OFF" : "SFX: ON"}
    </button>
  );
}
