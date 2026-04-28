"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, FileSignature, Headphones, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

const DOMAINS = [
  "E-Ticaret",
  "Mobil App",
  "AI",
  "Web App",
  "Eğitim",
];

export function CTA() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const valid =
    name.trim() && company.trim() && /\S+@\S+\.\S+/.test(email) && domain;

  function handleSubmit() {
    if (!valid) return;
    setSubmitted(true);
  }

  return (
    <section id="cta" className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#070b0a] via-black to-black" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" aria-hidden />
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative liquid-glass rounded-[22px] p-8 md:p-14 overflow-hidden border border-white/10"
        >
          <div className="absolute inset-0 dot-grid opacity-10" aria-hidden />
          <svg
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[-120px] -translate-x-1/2 w-[720px] h-[240px]"
            viewBox="0 0 720 240"
          >
            <defs>
              <filter id="ctaGlowBlur">
                <feGaussianBlur stdDeviation="25" />
              </filter>
              <linearGradient id="ctaGlowGradient" x1="0%" x2="100%" y1="50%" y2="50%">
                <stop offset="0%" stopColor="#0f2a25" />
                <stop offset="50%" stopColor="#5ed29c" />
                <stop offset="100%" stopColor="#123e35" />
              </linearGradient>
            </defs>
            <ellipse
              cx="360"
              cy="120"
              rx="250"
              ry="62"
              fill="url(#ctaGlowGradient)"
              filter="url(#ctaGlowBlur)"
              opacity="0.28"
            />
          </svg>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p
                className="text-[11px] uppercase tracking-[0.08em] font-bold text-[#5ed29c] mb-4"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Career-Ready Curriculum
              </p>
              <h2
                className="heading text-[36px] md:text-[56px] font-extrabold leading-[1.05] text-white"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800 }}
              >
                Projenizi birlikte
                <br />
                <span className="font-light text-white/70">
                  hayata geçirelim.
                </span>
              </h2>
              <p
                className="mt-6 max-w-[460px] text-[14px] text-white/70 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Hangi alanda olursa olsun — e-ticaret, mobil, AI, web veya
                eğitim — 48 saat içinde ilk adımı atıyoruz.
              </p>

              <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/70">
                {[
                  { icon: Sparkles, label: "Ücretsiz Keşif" },
                  { icon: Headphones, label: "48s Geri Dönüş" },
                  { icon: ShieldCheck, label: "KVKK Uyumlu" },
                  { icon: FileSignature, label: "NDA İmzalarız" },
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-1.5 text-[11px] tracking-tight"
                  >
                    <Icon size={11} />
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="liquid-glass rounded-[16px] p-7 md:p-8 border border-white/10">
                <p
                  className="text-[12px] uppercase tracking-[0.18em] text-white/70 mb-5"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Demo Talep Et
                </p>
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="py-12 grid place-items-center text-center"
                    >
                      <CheckCircle2 size={36} className="text-[#00ff88]" />
                      <p className="mt-5 text-[18px] font-semibold tracking-tight text-white">
                        Talebiniz alındı.
                      </p>
                      <p className="mt-2 text-[14px] text-white/70 max-w-[380px]">
                        48 saat içinde sizinle iletişime geçeceğiz.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      <Field label="Ad Soyad">
                        <input
                          className="input-dark w-full"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Adınız"
                        />
                      </Field>
                      <Field label="Şirket">
                        <input
                          className="input-dark w-full"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Şirket adı"
                        />
                      </Field>
                      <Field label="E-posta" full>
                        <input
                          type="email"
                          className="input-dark w-full"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="mail@şirket.com"
                        />
                      </Field>
                      <Field label="Alan" full>
                        <select
                          className="input-dark w-full appearance-none"
                          value={domain}
                          onChange={(e) => setDomain(e.target.value)}
                        >
                          <option value="" disabled>
                            Seçiniz
                          </option>
                          {DOMAINS.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Proje detayı (opsiyonel)" full>
                        <textarea
                          className="input-dark w-full min-h-[96px] resize-y"
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          placeholder="Projenizi kısaca anlatın (opsiyonel)"
                        />
                      </Field>
                      <div className="sm:col-span-2 mt-1">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={!valid}
                          className="w-full h-12 rounded-full bg-[#5ed29c] text-[#070b0a] text-[13px] font-bold uppercase hover:bg-[#6ee0ac] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5ed29c] disabled:opacity-40 disabled:pointer-events-none transition-colors"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          Demo Talep Et →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span
        className="block text-[11px] uppercase tracking-[0.16em] text-white/65 mb-2"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
