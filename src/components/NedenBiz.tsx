"use client";

import { useRef, useEffect, useState } from "react";

/* Görseldeki sıra: Sol tek yüksek blok | Sağ üst geniş blok | Sağ alt iki eşit kutu */
const cards = [
  {
    title: "Akıllı Görev Yönetimi",
    description:
      "Görevleri düzenleyin ve önceliklendirin; iş akışınıza uyum sağlayan akıllı otomasyonla daha verimli çalışın.",
    mockup: "projects",
    gridClass: "neden-biz-card-sidebar",
  },
  {
    title: "Ekip İş Birliği",
    description:
      "Entegre iletişim ve paylaşılan alanlarla ekibinizle sorunsuz bağlantı kurun.",
    mockup: "task",
    gridClass: "neden-biz-card-top",
  },
  {
    title: "Gelişmiş Analitik",
    description:
      "Proje performansınız hakkında detaylı analitik ve özelleştirilebilir raporlarla kapsamlı içgörüler elde edin.",
    mockup: "calendar",
    gridClass: "neden-biz-card-bottom-left",
  },
  {
    title: "Proje Zaman Çizelgesi",
    description:
      "Etkileşimli zaman çizelgesi görünümleri ve bağımlılık takibi ile ilerlemeyi ve kilometre taşlarını görselleştirin.",
    mockup: "checklist",
    gridClass: "neden-biz-card-bottom-right",
  },
];

function MockupProjects() {
  return (
    <div className="neden-biz-mockup neden-biz-mockup-projects">
      <div className="neden-biz-mockup-head">
        <span>Son Projeler</span>
        <span className="neden-biz-mockup-badge">3</span>
      </div>
      <div className="neden-biz-mockup-cards">
        <div className="neden-biz-mockup-mini-card">
          <div className="neden-biz-mockup-mini-title">Proje Geçişi</div>
          <span className="neden-biz-mockup-tag">Geliştirme</span>
          <div className="neden-biz-mockup-meta">12 görev · 6+ Üye</div>
        </div>
        <div className="neden-biz-mockup-mini-card">
          <div className="neden-biz-mockup-mini-title">Otomasyon Projesi</div>
          <span className="neden-biz-mockup-tag">UI/UX</span>
          <div className="neden-biz-mockup-meta">12 görev · 6+ Üye</div>
        </div>
      </div>
    </div>
  );
}

function MockupTask() {
  return (
    <div className="neden-biz-mockup neden-biz-mockup-task">
      <div className="neden-biz-mockup-priority">Yüksek Öncelik</div>
      <div className="neden-biz-mockup-task-title">Özellik Bölümü – Web Tasarım</div>
      <div className="neden-biz-mockup-avatars">6+ Üye</div>
      <div className="neden-biz-mockup-progress">
        <div className="neden-biz-mockup-progress-track">
          <div className="neden-biz-mockup-progress-fill" style={{ width: "89%" }} />
        </div>
        <span>%89</span>
      </div>
    </div>
  );
}

function MockupCalendar() {
  return (
    <div className="neden-biz-mockup neden-biz-mockup-calendar">
      <div className="neden-biz-mockup-cal-head">Toplantı Planla</div>
      <div className="neden-biz-mockup-cal-week">
        <span>Pzt 15</span>
        <span>Sal 16</span>
        <span>Çar 17</span>
        <span>Per 18</span>
        <span>Cum 19</span>
      </div>
      <div className="neden-biz-mockup-cal-events">
        <div className="neden-biz-mockup-cal-event">
          <span className="neden-biz-mockup-cal-time">08:00 – 10:00</span>
          <span>Sabah Senkronu</span>
        </div>
        <div className="neden-biz-mockup-cal-event">
          <span className="neden-biz-mockup-cal-time">09:00 – 11:30</span>
          <span>İnceleme Toplantısı</span>
        </div>
      </div>
    </div>
  );
}

function MockupChecklist() {
  return (
    <div className="neden-biz-mockup neden-biz-mockup-checklist">
      <div className="neden-biz-mockup-checklist-head">Kategori AI</div>
      <ul className="neden-biz-mockup-checklist-list">
        <li><span className="neden-biz-mockup-dot neden-biz-mockup-dot-y" />Test</li>
        <li><span className="neden-biz-mockup-dot neden-biz-mockup-dot-r" />Ses Tasarımı</li>
        <li><span className="neden-biz-mockup-dot neden-biz-mockup-dot-g" />Görsel Çıktı</li>
      </ul>
    </div>
  );
}

function CardMockup({ type }: { type: string }) {
  if (type === "projects") return <MockupProjects />;
  if (type === "task") return <MockupTask />;
  if (type === "calendar") return <MockupCalendar />;
  if (type === "checklist") return <MockupChecklist />;
  return null;
}

export default function NedenBiz() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="neden-biz"
      ref={sectionRef}
      className="neden-biz-section relative py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
        <h2 className="neden-biz-title mb-3 text-center text-3xl font-bold tracking-tight text-[#0f0f0f] sm:text-4xl">
          İş akışınıza uygun özellik yönetimi
        </h2>
        <p className="neden-biz-desc mx-auto mb-14 max-w-2xl text-center text-[15px] leading-relaxed text-neutral-600">
          Her özelliği atayın, önceliklendirin ve takip edin. AlgroyCode, geliştirme sürecinize yapı getirerek ekiplerin daha hızlı ilerlemesine yardımcı olur; sizi yavaşlatmadan.
        </p>

        <div className="neden-biz-grid">
          {cards.map((item, index) => (
            <article
              key={item.title}
              className={`neden-biz-card ${item.gridClass} ${visible ? "neden-biz-card-visible" : ""}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="neden-biz-card-visual">
                <CardMockup type={item.mockup} />
              </div>
              <h3 className="neden-biz-card-title">{item.title}</h3>
              <p className="neden-biz-card-desc">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
