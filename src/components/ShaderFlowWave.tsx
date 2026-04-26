"use client";

export default function ShaderFlowWave() {
  return (
    <svg
      className="startup-shader-wave"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <filter id="startup-wave-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="20" result="blurred" />
          <feMerge>
            <feMergeNode in="blurred" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="1600" height="900" fill="#00040b" />

      <path
        d="M-120 740 C 190 760, 420 420, 710 430 C 980 440, 1240 190, 1730 230"
        stroke="rgba(114, 206, 255, 0.58)"
        strokeWidth="44"
        fill="none"
        filter="url(#startup-wave-glow)"
      />
      <path
        d="M-120 740 C 190 760, 420 420, 710 430 C 980 440, 1240 190, 1730 230"
        stroke="rgba(255, 193, 129, 0.42)"
        strokeWidth="34"
        fill="none"
        filter="url(#startup-wave-glow)"
      />
      <path
        d="M-120 740 C 190 760, 420 420, 710 430 C 980 440, 1240 190, 1730 230"
        stroke="#ffffff"
        strokeWidth="26"
        fill="none"
        filter="url(#startup-wave-glow)"
      />
    </svg>
  );
}
