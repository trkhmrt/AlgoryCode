"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { services } from "@/lib/services";

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
    // Burada API'ye gönderme yapılabilir
    setSent(true);
    setForm({ isim: "", soyisim: "", mail: "", telefon: "", hizmet: "" });
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      <main className="flex-1 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-lg px-4 sm:px-6 md:px-8">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-800"
          >
            ← Ana sayfaya dön
          </Link>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-[#0f0f0f] sm:text-3xl">
            Bize Ulaşın
          </h1>
          <p className="mb-10 text-neutral-600">
            Formu doldurun, en kısa sürede size dönüş yapalım.
          </p>

          {sent ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center text-green-800">
              <p className="font-medium">Mesajınız alındı.</p>
              <p className="mt-1 text-sm">En kısa sürede sizinle iletişime geçeceğiz.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-[#e8e8ec] bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-[#333]">
                    İsim
                  </span>
                  <input
                    type="text"
                    required
                    value={form.isim}
                    onChange={(e) => setForm((f) => ({ ...f, isim: e.target.value }))}
                    className="w-full rounded-lg border border-[#e0e0e0] px-4 py-3 text-[#111] outline-none transition focus:border-[#0f0f0f] focus:ring-2 focus:ring-[#0f0f0f]/20"
                    placeholder="Adınız"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-[#333]">
                    Soyisim
                  </span>
                  <input
                    type="text"
                    required
                    value={form.soyisim}
                    onChange={(e) => setForm((f) => ({ ...f, soyisim: e.target.value }))}
                    className="w-full rounded-lg border border-[#e0e0e0] px-4 py-3 text-[#111] outline-none transition focus:border-[#0f0f0f] focus:ring-2 focus:ring-[#0f0f0f]/20"
                    placeholder="Soyadınız"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-[#333]">
                  E-posta
                </span>
                <input
                  type="email"
                  required
                  value={form.mail}
                  onChange={(e) => setForm((f) => ({ ...f, mail: e.target.value }))}
                  className="w-full rounded-lg border border-[#e0e0e0] px-4 py-3 text-[#111] outline-none transition focus:border-[#0f0f0f] focus:ring-2 focus:ring-[#0f0f0f]/20"
                  placeholder="ornek@email.com"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-[#333]">
                  Telefon numarası
                </span>
                <input
                  type="tel"
                  value={form.telefon}
                  onChange={(e) => setForm((f) => ({ ...f, telefon: e.target.value }))}
                  className="w-full rounded-lg border border-[#e0e0e0] px-4 py-3 text-[#111] outline-none transition focus:border-[#0f0f0f] focus:ring-2 focus:ring-[#0f0f0f]/20"
                  placeholder="+90 5XX XXX XX XX"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-[#333]">
                  Hizmet türü
                </span>
                <select
                  required
                  value={form.hizmet}
                  onChange={(e) => setForm((f) => ({ ...f, hizmet: e.target.value }))}
                  className="w-full rounded-lg border border-[#e0e0e0] bg-white px-4 py-3 text-[#111] outline-none transition focus:border-[#0f0f0f] focus:ring-2 focus:ring-[#0f0f0f]/20"
                >
                  <option value="">Hizmet seçin</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-[#0f0f0f] py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Gönder
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
