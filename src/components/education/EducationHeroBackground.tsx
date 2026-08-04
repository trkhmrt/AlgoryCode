type EducationHeroBackgroundProps = {
  title: string;
  coverImageUrl?: string | null;
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

export function EducationHeroBackground({
  title,
  coverImageUrl,
}: EducationHeroBackgroundProps) {
  const keywords = getAccentKeywords(title);

  if (coverImageUrl) {
    return (
      <div
        className="relative aspect-[16/9] overflow-hidden rounded-[12px] bg-black md:aspect-[21/9]"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverImageUrl}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[16/9] overflow-hidden rounded-[12px] bg-cover bg-center bg-no-repeat md:aspect-[21/9]"
      style={{ backgroundImage: "url(/images/education-card-bg.png)" }}
      aria-hidden
    >
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
