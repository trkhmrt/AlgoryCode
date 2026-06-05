import { Github, Linkedin } from "lucide-react";

type InstructorSocialLinksProps = {
  githubUrl?: string | null;
  linkedinUrl?: string | null;
};

const linkClassName =
  "inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#1a1a1a] text-[#888] transition-colors hover:border-[#333] hover:text-[#ededed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#333]";

export function InstructorSocialLinks({
  githubUrl,
  linkedinUrl,
}: InstructorSocialLinksProps) {
  const githubHref = githubUrl?.trim() || "#";
  const linkedinHref = linkedinUrl?.trim() || "#";

  return (
    <div className="mt-2 flex items-center gap-1.5">
      <a
        href={githubHref}
        {...(githubUrl?.trim()
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        aria-label="GitHub"
        className={linkClassName}
      >
        <Github size={14} />
      </a>
      <a
        href={linkedinHref}
        {...(linkedinUrl?.trim()
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        aria-label="LinkedIn"
        className={linkClassName}
      >
        <Linkedin size={14} />
      </a>
    </div>
  );
}
