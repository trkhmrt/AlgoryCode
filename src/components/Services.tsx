"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { services } from "@/lib/services";

type ServiceItem = (typeof services)[number];

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <Link
      href={`/${item.slug}`}
      className="site-service-card group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-mist)]"
    >
      <h3 className="site-service-name">{item.title}</h3>
      <p className="site-service-desc">{item.description}</p>
      <span className="site-service-card-circle" aria-hidden>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    for (const item of items) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="site-services" aria-labelledby="site-services-title">
      <div className="site-services-head" data-reveal>
        <h2 id="site-services-title" className="site-services-title">
          Hizmetlerimiz
        </h2>
        <p className="site-services-lead">
          AI agent, e-ticaret ve özel yazılım ihtiyaçlarınız için uçtan uca ürün geliştirme.
        </p>
      </div>

      <div className="site-services-grid">
        {services.map((item, index) => (
          <div key={item.slug} data-reveal style={{ transitionDelay: `${index * 70}ms` }}>
            <ServiceCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
