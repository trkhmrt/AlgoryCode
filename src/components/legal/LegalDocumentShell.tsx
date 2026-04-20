import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type LegalDocumentShellProps = {
  title: string;
  updated: string;
  children: React.ReactNode;
};

export default function LegalDocumentShell({ title, updated, children }: LegalDocumentShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <main className="site-legal-page flex-1">
        <div className="site-legal-inner">
          <Link href="/" className="site-contact-back">
            ← Ana sayfa
          </Link>
          <article className="site-legal-prose">
            <header className="site-legal-header">
              <h1>{title}</h1>
              <p className="site-legal-meta">Son güncelleme: {updated}</p>
            </header>
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
