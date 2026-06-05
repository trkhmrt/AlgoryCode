type EducationHeroBackgroundProps = {
  title: string;
};

function getAccentKeywords(title: string): string[] {
  const candidates = [
    "Next-Gen",
    "AI",
    "Cursor",
    "OpenAI",
    "Developer",
    "React",
    "Python",
    "JavaScript",
    "Yazılım",
  ];

  const matched = candidates.filter((keyword) =>
    title.toLowerCase().includes(keyword.toLowerCase()),
  );

  if (matched.length > 0) {
    return matched.slice(0, 4);
  }

  return title.split(/\s+/).slice(0, 3);
}

export function EducationHeroBackground({ title }: EducationHeroBackgroundProps) {
  const keywords = getAccentKeywords(title);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[12px]"
      aria-hidden
    >
      <div className="absolute inset-0 dot-grid opacity-[0.18]" />

      <div
        className="absolute -right-16 -top-20 h-56 w-56 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-24 -left-12 h-48 w-48 rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute right-1/4 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full opacity-25 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,136,0.12) 0%, transparent 70%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full text-[#1a1a1a]"
        viewBox="0 0 400 280"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M0 140 H120 M280 140 H400 M200 0 V90 M200 190 V280"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.35"
        />
        <path
          d="M120 140 C160 100, 240 100, 280 140"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.25"
        />
        <circle cx="120" cy="140" r="3" fill="currentColor" opacity="0.4" />
        <circle cx="200" cy="140" r="4" fill="currentColor" opacity="0.5" />
        <circle cx="280" cy="140" r="3" fill="currentColor" opacity="0.4" />
        <circle cx="200" cy="90" r="2.5" fill="currentColor" opacity="0.35" />
        <circle cx="200" cy="190" r="2.5" fill="currentColor" opacity="0.35" />
      </svg>

      <div className="absolute inset-0">
        {keywords.map((keyword, index) => (
          <span
            key={keyword}
            className="absolute select-none font-mono text-[11px] uppercase tracking-[0.2em] text-[#ededed]/[0.04] md:text-xs"
            style={{
              top: `${12 + index * 18}%`,
              left: `${8 + index * 22}%`,
              transform: `rotate(${-6 + index * 4}deg)`,
            }}
          >
            {keyword}
          </span>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#333]/40 to-transparent" />
    </div>
  );
}
