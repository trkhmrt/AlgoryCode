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
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/education-card-bg.png)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-black/5" />

      <div className="absolute inset-0">
        {keywords.map((keyword, index) => (
          <span
            key={keyword}
            className="absolute select-none font-mono text-[11px] uppercase tracking-[0.2em] text-white/[0.06] md:text-xs"
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
    </div>
  );
}
