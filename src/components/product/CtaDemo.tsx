"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Headphones, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

const SIZES = ["1-10", "11-50", "51-200", "201-1000", "1000+"];

export function CtaDemo() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const valid = name.trim() && company.trim() && /\S+@\S+\.\S+/.test(email) && size;

  function handleSubmit() {
    if (!valid) return;
    setSubmitted(true);
  }

  return (
    <section
      id="demo"
      className="relative section border-b border-[#1a1a1a] overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)",
        }}
        aria-hidden
      />

      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <p className="text-[12px] uppercase tracking-[0.18em] text-[#666] mb-4">
            Demo
          </p>
          <h2 className="heading text-[28px] font-semibold tracking-tight md:text-[36px]">
            Hazır mısınız?
          </h2>
          <p className="mt-6 text-[15px] text-[#888] max-w-[440px] leading-relaxed">
            Ekibinize özel hazırlanmış canlı bir demo planlayalım. 30 dakikada
            kullanım senaryolarınızı birlikte gözden geçirelim.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-[12px] p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="py-10 grid place-items-center text-center"
                >
                  <CheckCircle2 size={36} className="text-[#00ff88]" />
                  <p className="mt-5 text-[18px] font-semibold tracking-tight">
                    Talebiniz alındı.
                  </p>
                  <p className="mt-2 text-[14px] text-[#888] max-w-[360px]">
                    24 saat içinde ekibimiz size dönecek. E-posta kutunuzu kontrol etmeyi unutmayın.
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
                      className="input-dark"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Mert Aydın"
                    />
                  </Field>
                  <Field label="Şirket">
                    <input
                      className="input-dark"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Volthane"
                    />
                  </Field>
                  <Field label="E-posta" full>
                    <input
                      type="email"
                      className="input-dark"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="mert@volthane.com"
                    />
                  </Field>
                  <Field label="Şirket büyüklüğü" full>
                    <select
                      className="input-dark appearance-none"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    >
                      <option value="" disabled>
                        Seçiniz
                      </option>
                      {SIZES.map((s) => (
                        <option key={s} value={s}>
                          {s} kişi
                        </option>
                      ))}
                    </select>
                  </Field>
                  <div className="sm:col-span-2 mt-2">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!valid}
                      className="w-full h-12 rounded-md bg-white text-black text-[15px] font-medium hover:bg-[#ededed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    >
                      Demo Talep Et
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[#333]">
            {[
              { icon: Lock, label: "256-bit SSL" },
              { icon: ShieldCheck, label: "KVKK Uyumlu" },
              { icon: Headphones, label: "7/24 Destek" },
              { icon: Sparkles, label: "Ücretsiz Kurulum" },
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
      <span className="block text-[11px] uppercase tracking-[0.16em] text-[#666] mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}
