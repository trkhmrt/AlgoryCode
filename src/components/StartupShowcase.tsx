"use client";

import Link from "next/link";
import HeroOrbScene from "@/components/HeroOrbScene";
import DarkVeilScene from "@/components/DarkVeilScene";
import GradientProScene from "@/components/GradientProScene";
const chips = ["AI code generation", "Live code review", "Autofix pipelines", "MCP ready"];

const gradientProFeatures = [
  {
    title: "Real time WebGL rendering",
    text: "High performance shader powered gradients with smooth animation and hardware acceleration.",
  },
  {
    title: "Preset theme system",
    text: "Multiple curated color themes including Aurora, Sunset, Ocean, Cyber, Space, and more.",
  },
  {
    title: "Custom color mode",
    text: "Full manual control over primary, secondary, and background tones.",
  },
  {
    title: "Interactive theme picker",
    text: "Optional canvas and site level theme switching with polished UI.",
  },
  {
    title: "Dynamic distortion engine",
    text: "Adjustable warp strength, detail, speed, and range for organic movement.",
  },
  {
    title: "Advanced blending modes",
    text: "Normal, Multiply, Screen, and Overlay mix styles with angle and softness control.",
  },
  {
    title: "Flow and rotation control",
    text: "Noise driven motion fields with adjustable rotation behavior.",
  },
  {
    title: "Cinematic grain system",
    text: "Configurable grain amount, size, and optional animation for film like texture.",
  },
  {
    title: "Professional color grading",
    text: "Contrast, gamma, and saturation adjustments for refined final output.",
  },
  {
    title: "Framing and focus controls",
    text: "Offset focal point positioning and zoom scaling for composition tuning.",
  },
  {
    title: "Responsive device presets",
    text: "Automatic scaling, distortion strength, and grain tuning for mobile, tablet, and desktop.",
  },
  {
    title: "Fallback support",
    text: "Graceful CSS gradient fallback when WebGL is unavailable.",
  },
];

const gradientCustomizationOptions = [
  "Hue Shift",
  "Noise",
  "Scanlines",
  "Speed",
  "Scanline Amount",
  "Warp",
  "Resolution",
];

export default function StartupShowcase() {
  return (
    <div className="ac-shell">
      <section className="ac-hero" id="top">
        <HeroOrbScene />
        <div className="ac-hero-grid">
          <div className="ac-hero-copy">
            <p className="ac-kicker">Introducing AI-native engineering workflow</p>
            <h1>Ship startup SaaS products 10x faster with one intelligent workspace</h1>
            <p>
              Build, review, test, and deploy from the same command layer. Code context, team
              standards, and production insights stay connected at every step.
            </p>
            <div className="ac-hero-actions">
              <Link href="#pricing" className="ac-btn ac-btn-primary">
                Start free
              </Link>
              <Link href="#features" className="ac-btn ac-btn-ghost">
                Explore platform
              </Link>
            </div>
            <div className="ac-chip-row">
              {chips.map((chip) => (
                <span key={chip} className="ac-chip">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ac-section" id="mouse-text-demo">
        <div className="ac-publish-stage">
          <div className="ac-publish-copy">
            <h2>Become a Framer Creator today</h2>
            <p>Sell products, make referrals, and keep all your earnings.</p>
            <Link href="#pricing" className="ac-publish-learn-btn">
              Learn More
            </Link>
          </div>
          <div className="ac-publish-focus">
            <div className="ac-publish-glow" aria-hidden />
            <button type="button" className="ac-publish-button" aria-label="Publish">
              Publish
            </button>
          </div>
        </div>
      </section>

      <section className="ac-section" id="webgl-gradient">
        <div className="ac-gradient-pro">
          <div className="ac-gradient-pro-head">
            <p>Marketplace › Components › Categories › Backgrounds</p>
            <div className="ac-gradient-pro-head-row">
              <h3>Gradient Pro — Cinematic</h3>
              <button type="button">Buy for $10</button>
            </div>
            <span>WebGL gradients with depth.</span>
          </div>
          <div className="ac-gradient-pro-stage">
            <div className="ac-gradient-pro-badge">Space</div>
            <GradientProScene className="ac-gradient-pro-scene" />
          </div>
          <div className="ac-gradient-docs">
            <article className="ac-gradient-doc-card">
              <h4>Key Features & Capabilities</h4>
              <ul>
                {gradientProFeatures.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="ac-gradient-doc-card">
              <h4>Customization Options</h4>
              <ul>
                {gradientCustomizationOptions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href="/iletisim" className="ac-btn ac-btn-primary">
                Iletisime Gec
              </Link>
            </article>
          </div>
          <div className="ac-gradient-pro-foot">
            <ul>
              <li>Frame Craft</li>
              <li>Updated 15 hours ago</li>
              <li>190 installs</li>
              <li>Made with Workshop</li>
              <li>Category: Backgrounds</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="ac-section" id="dark-veil-bg">
        <div className="ac-veil-card">
          <div className="ac-veil-head">
            <p>Marketplace › Components › Categories › Backgrounds</p>
            <div className="ac-veil-head-row">
              <h3>Dark Veil BG</h3>
              <button type="button">Buy for $10</button>
            </div>
          </div>
          <div className="ac-veil-stage">
            <DarkVeilScene className="ac-veil-scene" />
            <div className="ac-veil-title">Dark Veil Animated Mesh Background</div>
          </div>
          <div className="ac-veil-grid">
            <article className="ac-veil-info-card">
              <h4>Key Features</h4>
              <ul>
                <li>Animated Mesh Motion - Smooth, flowing veil effect that adds depth.</li>
                <li>Full Customization - Adjust hue, noise, speed, scanlines, warp, and more.</li>
                <li>Responsive Scaling - Looks great on any screen size.</li>
                <li>Optimized Performance - Lightweight for seamless site experience.</li>
                <li>Easy Setup - Works instantly inside Framer.</li>
              </ul>
            </article>
            <article className="ac-veil-info-card">
              <h4>Customization Options</h4>
              <ul>
                <li>Hue Shift - Rotate the mesh colors by changing degree values.</li>
                <li>Noise - Add grainy texture for subtle motion or intensity.</li>
                <li>Scanlines - Overlay scanline effects for a retro or futuristic aesthetic.</li>
                <li>Speed - Adjust how fast the mesh animates.</li>
                <li>Scanline Amount - Control the density and spacing of scanlines.</li>
                <li>Warp - Modify distortion levels for smooth or dramatic mesh flow.</li>
                <li>Resolution - Balance sharpness and performance by adjusting detail level.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="ac-cta" id="contact">
        <h2>Build your next SaaS release with AI-first execution</h2>
        <p>Launch a modern engineering workflow in days, not quarters.</p>
        <div className="ac-hero-actions">
          <Link href="/iletisim" className="ac-btn ac-btn-primary">
            Book a demo
          </Link>
          <Link href="#top" className="ac-btn ac-btn-ghost">
            Back to top
          </Link>
        </div>
      </section>
    </div>
  );
}
