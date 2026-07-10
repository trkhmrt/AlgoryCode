"use client";

import Link from "next/link";
import {
  EDUCATION_LIST_ANCHOR_ID,
  markEducationReturnToList,
} from "@/components/education/EducationScrollManager";

export function EducationBackToListLink() {
  return (
    <Link
      href={`/education#${EDUCATION_LIST_ANCHOR_ID}`}
      scroll={false}
      onClick={markEducationReturnToList}
      className="text-sm text-[#888] transition-colors hover:text-foreground"
    >
      ← Tüm Eğitimler
    </Link>
  );
}
