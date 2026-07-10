"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EDUCATION_TECH_LANGUAGES } from "@/lib/education";

function TechMark({ name }: { name: string }) {
  return (
    <Link
      href={`/education?tech=${encodeURIComponent(name)}`}
      className="group inline-flex shrink-0 items-center gap-2 px-7 text-[16px] font-semibold tracking-tight text-[#121212]/70 transition-colors duration-300 hover:text-[#e85d04] md:text-[17px]"
    >
      <span
        className="inline-block h-2 w-2 rounded-full bg-[#121212]/50 transition-colors duration-300 group-hover:bg-[#e85d04]"
        aria-hidden
      />
      {name}
    </Link>
  );
}

export function EducationTechStream() {
  const items = [...EDUCATION_TECH_LANGUAGES, ...EDUCATION_TECH_LANGUAGES];

  return (
    <div className="w-full pt-10" aria-labelledby="education-tech-stream-title">
      <motion.p
        id="education-tech-stream-title"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8 text-center text-[11px] uppercase tracking-[0.2em] text-[#121212]/45"
      >
        Yazılım dilleri ve teknolojiler
      </motion.p>

      <div className="mx-auto w-full max-w-[640px] md:max-w-[720px]">
        <div className="marquee-viewport relative overflow-hidden">
          <div className="marquee-track flex w-max">
            {items.map((name, index) => (
              <TechMark key={`${name}-${index}`} name={name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
