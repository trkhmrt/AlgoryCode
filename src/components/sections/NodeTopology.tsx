import { Space_Grotesk } from "next/font/google";
import { Brain, Network, Shield, Zap } from "lucide-react";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const NODES = [
  { id: "01", label: "Hız", Icon: Zap },
  { id: "02", label: "Güvenlik", Icon: Shield },
  { id: "03", label: "Deneyim", Icon: Brain },
] as const;

function BeamConnector() {
  return (
    <div className="relative mx-auto h-32 w-full max-w-[400px] shrink-0 overflow-visible lg:mx-0 lg:h-[400px] lg:max-w-[128px] lg:w-32">
      <svg
        className="absolute left-1/2 top-1/2 h-[400px] w-32 -translate-x-1/2 -translate-y-1/2 rotate-90 lg:inset-0 lg:h-full lg:w-full lg:translate-x-0 lg:translate-y-0 lg:rotate-0"
        viewBox="0 0 128 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M0 60 C 64 60, 64 200, 128 200"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth={1}
        />
        <path
          d="M0 200 L 128 200"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth={1}
        />
        <path
          d="M0 340 C 64 340, 64 200, 128 200"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth={1}
        />
        <path
          className="node-topology-beam"
          d="M0 60 C 64 60, 64 200, 128 200"
          pathLength={1000}
          stroke="url(#node-topology-beam-grad)"
          strokeDasharray="120 180"
          strokeLinecap="round"
          strokeWidth={2}
          fill="none"
        />
        <path
          className="node-topology-beam"
          d="M0 200 L 128 200"
          pathLength={1000}
          stroke="url(#node-topology-beam-grad)"
          strokeDasharray="120 180"
          strokeLinecap="round"
          strokeWidth={2.5}
          fill="none"
        />
        <path
          className="node-topology-beam"
          d="M0 340 C 64 340, 64 200, 128 200"
          pathLength={1000}
          stroke="url(#node-topology-beam-grad)"
          strokeDasharray="120 180"
          strokeLinecap="round"
          strokeWidth={2}
          fill="none"
        />
        <defs>
          <linearGradient
            id="node-topology-beam-grad"
            gradientUnits="userSpaceOnUse"
            x1={0}
            y1={200}
            x2={128}
            y2={200}
          >
            <stop offset="0%" stopColor="rgba(0,255,255,0)" />
            <stop offset="50%" stopColor="#00ffff" />
            <stop offset="100%" stopColor="rgba(0,255,255,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function NodeTopology() {
  return (
    <section
      className={`section border-b border-border bg-[#f3efe9] text-[#121212] ${spaceGrotesk.className}`}
      aria-labelledby="node-topology-heading"
    >
      <div className="container-x relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(800px,120vw)] w-[min(800px,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f97316]/10 opacity-40 blur-[120px]"
          aria-hidden
        />

        <div className="relative z-10 mb-12 max-w-[640px]">
          <p className="mb-4 text-[12px] uppercase tracking-[0.18em] text-[#8a8378]">
          NEDEN BİZ?
          </p>
          <h2
            id="node-topology-heading"
            className="heading text-[32px] font-extrabold tracking-tight md:text-[40px]"
          >
           Deneyimle Kanıtlanmış Yaklaşım
          </h2>
          <p className="section-desc mt-3 max-w-xl leading-relaxed">
          Fikirden yayına, her aşamayı birbirine bağlayan, deneyimle şekillenmiş bir geliştirme süreci.
          </p>
        </div>

        <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-16 xl:gap-24">
          <div className="grid w-full grid-cols-3 gap-2 sm:gap-3 lg:flex lg:max-w-none lg:flex-col lg:items-end lg:gap-8">
            {NODES.map(({ id, label, Icon }) => (
              <div
                key={id}
                className="group relative flex min-w-0 flex-col items-center gap-2 overflow-hidden rounded-xl border border-black/10 bg-white/55 p-3 backdrop-blur-[12px] sm:p-4 lg:max-w-64 lg:w-full lg:flex-row lg:items-center lg:gap-4 lg:p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/5 transition-colors group-hover:bg-black/10 sm:h-11 sm:w-11 lg:h-12 lg:w-12">
                  <Icon className="h-5 w-5 text-[#121212] sm:h-6 sm:w-6 lg:h-7 lg:w-7" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 text-center lg:text-left">
                  <span className="block text-xs font-medium leading-tight text-[#121212] sm:text-sm lg:text-lg">
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <BeamConnector />

          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-80 overflow-hidden rounded-2xl border border-black/10 bg-white/60 p-10 text-center shadow-[0_8px_40px_rgba(0,0,0,0.06)] backdrop-blur-[24px]">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
              <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-black/15 bg-white/70">
                <span
                  aria-hidden
                  className="absolute inset-0 scale-110 rounded-full border border-black/10"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 scale-125 rounded-full border border-black/5"
                />
                <Network className="relative h-12 w-12 text-[#121212]" strokeWidth={1.25} />
              </div>
              <h3 className="heading mb-2 text-2xl font-medium uppercase tracking-tight md:text-[28px]">
                
                AlgoryCode
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
