"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  BOOT_LINES,
  CAPABILITIES,
  DIRECTIONS,
  NAV,
  OPERATING_MODEL,
  STATUS,
} from "@/data/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Cursor() {
  return <span className="cursor-blink" aria-hidden="true" />;
}

export default function TerminalConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [booted, setBooted] = useState(false);
  const [pinged, setPinged] = useState(false);
  const [pingLines, setPingLines] = useState<string[]>([]);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduced) {
        gsap.set(".boot-line", { opacity: 1, y: 0 });
        gsap.set(".boot-title", { opacity: 1 });
        gsap.set(".boot-overlay", { autoAlpha: 0, display: "none" });
        gsap.set(".site-shell", { autoAlpha: 1 });
        gsap.set(".reveal", { opacity: 1, y: 0 });
        gsap.set(".ascii-frame", { opacity: 1 });
        gsap.set(".divider", { scaleX: 1 });
        setBooted(true);
        return;
      }

      gsap.set(".boot-line", { opacity: 0, y: 4 });
      gsap.set(".boot-title", { opacity: 0 });
      gsap.set(".site-shell", { autoAlpha: 0 });
      gsap.set(".reveal", { opacity: 0, y: 10 });
      gsap.set(".hero-reveal", { opacity: 0, y: 8 });
      gsap.set(".ascii-frame", { opacity: 0 });
      gsap.set(".divider", { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        onComplete: () => {
          setBooted(true);
          ScrollTrigger.refresh();
        },
      });

      tl.to(".boot-line", {
        opacity: 1,
        y: 0,
        duration: 0.18,
        stagger: 0.22,
      })
        .to(".boot-title", { opacity: 1, duration: 0.35 }, "+=0.15")
        .to(".boot-overlay", {
          autoAlpha: 0,
          duration: 0.45,
          delay: 0.35,
          onComplete: () => {
            const el = document.querySelector(".boot-overlay");
            if (el instanceof HTMLElement) el.style.display = "none";
          },
        })
        .to(".site-shell", { autoAlpha: 1, duration: 0.4 }, "-=0.2")
        .to(
          ".ascii-frame",
          { opacity: 1, duration: 0.5, ease: "power1.out" },
          "-=0.1",
        )
        .to(
          ".hero-reveal",
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.25",
        );

      gsap.utils.toArray<HTMLElement>(".section-block").forEach((section) => {
        const items = section.querySelectorAll(".reveal");
        const divider = section.querySelector(".divider");

        gsap.fromTo(
          items,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          },
        );

        if (divider) {
          gsap.fromTo(
            divider,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.6,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                once: true,
              },
            },
          );
        }
      });
    },
    { scope: rootRef },
  );

  const handlePing = () => {
    if (pinged) return;
    setPinged(true);
    const lines = [
      "> request received",
      "> rendering company presence",
      "> status: visible",
    ];
    setPingLines([]);
    lines.forEach((line, i) => {
      window.setTimeout(() => {
        setPingLines((prev) => [...prev, line]);
      }, i * 280);
    });
  };

  const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    gsap.fromTo(
      el,
      { opacity: 0.4 },
      { opacity: 1, duration: 0.2, ease: "power1.out" },
    );
  };

  return (
    <div ref={rootRef} className="relative min-h-screen bg-bg text-text">
      <div className="noise" aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />

      <div
        className="boot-overlay fixed inset-0 z-40 flex items-center justify-center bg-bg px-6"
        aria-live="polite"
        aria-busy={!booted}
      >
        <div className="w-full max-w-xl">
          <p className="mb-6 text-muted">
            $ boot interfaces.company
            <Cursor />
          </p>
          <div className="space-y-1.5">
            {BOOT_LINES.map((line) => (
              <p key={line} className="boot-line text-text/90">
                {line}
              </p>
            ))}
          </div>
          <div className="boot-title mt-10 space-y-1">
            <p className="text-lg font-medium tracking-wide text-accent sm:text-xl">
              THE INTERFACES COMPANY
            </p>
            <p className="text-muted">human technology practice</p>
          </div>
        </div>
      </div>

      <div className="site-shell relative z-10 mx-auto max-w-3xl px-5 pb-32 pt-6 sm:px-8 sm:pt-8">
        <header className="hero-reveal mb-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
              interfaces.company
            </p>
            <p className="mt-1 text-[11px] text-muted/70">
              STATUS: ACTIVE · MODE: PUBLIC · {STATUS.location.toUpperCase()}
            </p>
          </div>
          <a
            href="#contact"
            className="nav-item text-[12px] text-muted transition-colors"
            onMouseEnter={handleNavHover}
          >
            [contact]
          </a>
        </header>

        <nav
          aria-label="Primary"
          className="hero-reveal mb-12 flex flex-wrap gap-x-4 gap-y-2 border-b border-line pb-5"
        >
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-item text-[12px] text-muted transition-colors"
              onMouseEnter={handleNavHover}
            >
              <span className="nav-index text-muted/60">[{item.index}]</span>{" "}
              {item.label}
            </a>
          ))}
        </nav>

        <section className="mb-16" aria-labelledby="company-name">
          <p className="hero-reveal mb-4 text-muted">$ boot public_presence</p>
          <div className="hero-reveal mb-6 space-y-1 text-muted">
            <p>&gt; loading...</p>
            <p>&gt; practice: online</p>
            <p>&gt; interface: visible</p>
            <p>
              &gt; status: <span className="text-accent">active</span>
            </p>
          </div>

          <div className="ascii-frame overflow-x-auto border border-line bg-bg-elevated/40 px-4 py-4">
            <pre className="m-0 whitespace-pre text-[11px] leading-relaxed text-text sm:text-[13px]">
{`┌──────────────────────────────────────────────────────────────┐
│ THE INTERFACES COMPANY                                       │
│ A human technology practice making crafted technology         │
│ more accessible.                                             │
└──────────────────────────────────────────────────────────────┘`}
            </pre>
          </div>
          <h1 id="company-name" className="sr-only">
            The Interfaces Company — human technology practice
          </h1>
        </section>

        <section
          id="what-we-do"
          className="section-block mb-16 scroll-mt-8"
          aria-labelledby="what-we-do-heading"
        >
          <div className="divider mb-5 h-px origin-left scale-x-0 bg-line" />
          <p className="reveal mb-3 text-muted">$ cat /what-we-do</p>
          <h2 id="what-we-do-heading" className="sr-only">
            What we do
          </h2>
          <p className="reveal mb-8 max-w-2xl text-text/90">
            We design and build interfaces, tools, and systems that make complex
            work clearer, faster, and more useful.
          </p>
          <ul className="reveal space-y-2">
            {CAPABILITIES.map((item) => (
              <li key={item.index} className="flex gap-3 text-[13px]">
                <span className="w-8 shrink-0 text-accent-dim">{item.index}</span>
                <span className="text-muted">/</span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="operating-model"
          className="section-block mb-16 scroll-mt-8"
          aria-labelledby="operating-model-heading"
        >
          <div className="divider mb-5 h-px origin-left scale-x-0 bg-line" />
          <p className="reveal mb-3 text-muted">$ open /operating-model</p>
          <h2 id="operating-model-heading" className="sr-only">
            Operating model
          </h2>
          <ul className="reveal space-y-3">
            {OPERATING_MODEL.map((item) => (
              <li
                key={item.name}
                className="grid grid-cols-[7rem_1fr] gap-3 text-[13px] sm:grid-cols-[8rem_1fr]"
              >
                <span className="font-medium text-accent">{item.name}</span>
                <span className="text-muted">{item.description}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="current-directions"
          className="section-block mb-16 scroll-mt-8"
          aria-labelledby="directions-heading"
        >
          <div className="divider mb-5 h-px origin-left scale-x-0 bg-line" />
          <p className="reveal mb-3 text-muted">$ list /current-directions</p>
          <h2 id="directions-heading" className="sr-only">
            Current directions
          </h2>
          <p className="reveal mb-4 text-[12px] tracking-wide text-muted">
            CURRENT DIRECTIONS
            <br />
            ------------------
          </p>
          <ul className="reveal mb-8 space-y-3">
            {DIRECTIONS.map((item) => (
              <li
                key={item.index}
                className="grid grid-cols-[2.5rem_9rem_1fr] gap-2 text-[13px] sm:grid-cols-[2.5rem_11rem_1fr]"
              >
                <span className="text-accent-dim">[{item.index}]</span>
                <span className="font-medium">{item.name}</span>
                <span className="text-muted">{item.description}</span>
              </li>
            ))}
          </ul>
          <pre className="reveal m-0 overflow-x-auto text-[12px] leading-relaxed text-muted">
{`/interfaces
├── play
├── screening
├── workbench
├── field_manual
└── postrun`}
          </pre>
        </section>

        <section
          id="point-of-view"
          className="section-block mb-16 scroll-mt-8"
          aria-labelledby="pov-heading"
        >
          <div className="divider mb-5 h-px origin-left scale-x-0 bg-line" />
          <p className="reveal mb-3 text-muted">$ read /point-of-view</p>
          <h2 id="pov-heading" className="sr-only">
            Point of view
          </h2>
          <p className="reveal mb-4 max-w-xl text-lg font-medium leading-snug text-text sm:text-xl">
            Technology should feel legible.
          </p>
          <p className="reveal max-w-xl text-muted">
            The best interfaces reduce confusion, reveal structure, and help
            people act with confidence.
          </p>
        </section>

        <section
          id="contact"
          className="section-block mb-10 scroll-mt-8"
          aria-labelledby="contact-heading"
        >
          <div className="divider mb-5 h-px origin-left scale-x-0 bg-line" />
          <p className="reveal mb-3 text-muted">$ ping /contact</p>
          <h2 id="contact-heading" className="sr-only">
            Contact
          </h2>
          <div className="reveal space-y-4">
            {!pinged ? (
              <button
                type="button"
                onClick={handlePing}
                className="border border-line px-3 py-2 text-[12px] text-muted transition-colors hover:border-accent hover:text-accent"
              >
                run ping
                <Cursor />
              </button>
            ) : (
              <div className="space-y-1 text-muted">
                {pingLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            )}
            {pinged && pingLines.length >= 3 && (
              <div className="space-y-2 pt-2">
                <a
                  href={`mailto:${STATUS.contact}`}
                  className="inline-block text-accent transition-opacity hover:opacity-80"
                >
                  {STATUS.contact}
                </a>
                <p className="text-[12px] text-muted">
                  status: {STATUS.company}
                  <br />
                  build: 0001
                </p>
              </div>
            )}
          </div>
        </section>

        <footer className="mt-20 border-t border-line pt-6 text-[12px] text-muted">
          <p className="mb-3 tracking-wide">
            SYSTEM STATUS
            <br />
            -------------
          </p>
          <dl className="grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1 sm:grid-cols-[7.5rem_1fr]">
            <dt>company:</dt>
            <dd className="text-text">{STATUS.company}</dd>
            <dt>mode:</dt>
            <dd className="text-text">{STATUS.mode}</dd>
            <dt>version:</dt>
            <dd className="text-text">{STATUS.version}</dd>
            <dt>build:</dt>
            <dd className="text-text">{STATUS.build}</dd>
            <dt>operator:</dt>
            <dd className="text-text">{STATUS.operator}</dd>
            <dt>contact:</dt>
            <dd>
              <a
                href={`mailto:${STATUS.contact}`}
                className="text-accent transition-opacity hover:opacity-80"
              >
                {STATUS.contact}
              </a>
            </dd>
          </dl>
        </footer>
      </div>

      <aside
        className="fixed bottom-0 left-0 right-0 z-30 border-t border-line bg-bg/90 px-5 py-2.5 text-[11px] text-muted backdrop-blur-sm sm:px-8"
        aria-label="System status"
      >
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <span>
            <span className="text-accent">●</span> company/{STATUS.company} ·
            mode/{STATUS.mode} · build/{STATUS.build}
          </span>
          <span className="hidden sm:inline">operator/{STATUS.operator}</span>
        </div>
      </aside>
    </div>
  );
}
