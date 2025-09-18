import React from "react";

/**
 * Floating Bitcoin medallion (always visible).
 * - Has its own z-index and size box
 * - Solid gold face + gradient shine (fallback safe)
 * - Uses .btc-3d-spin and .btc-bounce (from globals.css) if present
 */
type Props = {
  size?: number;
  className?: string;
};

export default function BtcMedallion({ size = 220, className = "" }: Props) {
  const box = { width: size, height: size };

  return (
    <div
      className={`relative z-20 flex items-center justify-center select-none ${className}`}
      style={box}
      aria-hidden="true"
    >
      {/* 3D spin + bounce wrapper */}
      <div
        className="btc-3d-spin btc-bounce"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Coin face */}
        <svg
          viewBox="0 0 200 200"
          width={size}
          height={size}
          className="btc-coin"
          style={{ display: "block", borderRadius: "50%" }}
          role="img"
          aria-label="bitcoin"
        >
          <defs>
            <radialGradient id="bm_shine" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fff5b8" />
              <stop offset="55%" stopColor="#ffd24a" />
              <stop offset="100%" stopColor="#b57f00" />
            </radialGradient>
            <linearGradient id="bm_edge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff7cc" />
              <stop offset="100%" stopColor="#e2b007" />
            </linearGradient>
          </defs>

          {/* Solid face as fallback */}
          <circle cx="100" cy="100" r="92" fill="#f6c141" />
          {/* Gradient face + edge */}
          <circle cx="100" cy="100" r="90" fill="url(#bm_shine)" stroke="url(#bm_edge)" strokeWidth="8" />

          {/* ₿ glyph */}
          <text
            x="100"
            y="120"
            textAnchor="middle"
            fontSize="80"
            fontWeight="bold"
            fill="#f7b731"
            style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,.35))" }}
          >
            ₿
          </text>

          {/* highlights */}
          <ellipse cx="100" cy="78" rx="62" ry="16" fill="#fff" opacity="0.16" />
          <ellipse cx="100" cy="142" rx="42" ry="10" fill="#fff" opacity="0.10" />
        </svg>
      </div>
    </div>
  );
}
