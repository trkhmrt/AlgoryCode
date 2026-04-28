"use client";

import { motion } from "framer-motion";

type SplitTextProps = {
  text: string;
  wordStartIndex: number;
  className?: string;
  wordClassName?: string;
};

export function SplitText({ text, wordStartIndex, className = "", wordClassName = "" }: SplitTextProps) {
  const words = text.split(" ").filter(Boolean);

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${wordStartIndex}-${i}`}
          className={`inline-block ${wordClassName}`.trim()}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: (wordStartIndex + i) * 0.08,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          style={{ marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
