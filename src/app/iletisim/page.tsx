"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { services } from "@/lib/services";

const CONTACT_EMAIL = "info@algorycode.com";
const CONTACT_ADDRESS =
  "Gültepe Mah., Serhat Sok., No:20, Daire:2";

export default function IletisimPage() {
  const [form, setForm] = useState({
    isim: "",
    soyisim: "",
    mail: "",
    telefon: "",
    hizmet: "",
  });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setForm({ isim: "", soyisim: "", mail: "", telefon: "", hizmet: "" });
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <main className="site-contact-page flex-1">
        <div className="site-contact-layout">
          <div>
            <Link href="/" className="site-contact-back">
              ← Ana sayfa
            </Link>
            <div className="site-contact-panel">
              <h1>Bize ulaşın</h1>
              <p>
                Formu doldurun veya doğrudan e-posta gönderin. Adres bilgimiz
                aşağıda.
              </p>
              <dl className="site-contact-dl">
                <div>
                  <dt>E-posta</dt>
                  <dd>
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                  </dd>
                </div>
                <div>
                  <dt>Adres</dt>
                  <dd>{CONTACT_ADDRESS}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="site-contact-success" role="status">
                <p style={{ margin: 0, fontWeight: 600 }}>Mesajınız alındı.</p>
                <p style={{ margin: "0.5rem 0 0", opacity: 0.85 }}>
                  En kısa sürede sizinle iletişime geçeceğiz.
                </p>
              </div>
            ) : (
              <form className="site-contact-form" onSubmit={handleSubmit}>
                <div className="site-contact-form-row2">
                  <div className="site-field">
                    <span>İsim</span>
                    <input
                      type="text"
                      required
                      value={form.isim}
                      onChange={(e) => setForm((f) => ({ ...f, isim: e.target.value }))}
                      placeholder="Adınız"
                      autoComplete="given-name"
                    />
                  </div>
                  <div className="site-field">
                    <span>Soyisim</span>
                    <input
                      type="text"
                      required
                      value={form.soyisim}
                      onChange={(e) => setForm((f) => ({ ...f, soyisim: e.target.value }))}
                      placeholder="Soyadınız"
                      autoComplete="family-name"
                    />
                  </div>
                </div>
                <div className="site-field">
                  <span>E-posta</span>
                  <input
                    type="email"
                    required
                    value={form.mail}
                    onChange={(e) => setForm((f) => ({ ...f, mail: e.target.value }))}
                    placeholder="ornek@email.com"
                    autoComplete="email"
                  />
                </div>
                <div className="site-field">
                  <span>Telefon</span>
                  <input
                    type="tel"
                    value={form.telefon}
                    onChange={(e) => setForm((f) => ({ ...f, telefon: e.target.value }))}
                    placeholder="+90 5XX XXX XX XX"
                    autoComplete="tel"
                  />
                </div>
                <div className="site-field">
                  <span>Hizmet türü</span>
                  <select
                    required
                    value={form.hizmet}
                    onChange={(e) => setForm((f) => ({ ...f, hizmet: e.target.value }))}
                  >
                    <option value="">Seçin</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="site-btn-sweep">
                  <span>Gönder</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
