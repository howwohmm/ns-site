"use client";

import { useEffect, useRef } from "react";

export default function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els?.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#faf8f3",
        color: "#09090b",
        fontFamily: "'Manrope', sans-serif",
        position: "relative",
      }}
    >

      {/* ── section header bar (Quartr grid) ── */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "clamp(20px,3vw,28px) clamp(24px,5vw,56px)",
        borderBottom: "1px solid #e8e3da",
      }}>
        <span style={lightMeta}>about this</span>
        <span style={lightMeta}>ruas, bengaluru · 2026</span>
      </div>

      {/* ── body ── */}
      <div style={{
        maxWidth: "860px",
        margin: "0 auto",
        padding: "clamp(56px,8vw,100px) clamp(24px,5vw,56px) clamp(64px,9vw,112px)",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(48px,7vw,80px)",
      }}>

        {/* big quote */}
        <div className="reveal">
          <blockquote style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(26px,4.5vw,50px)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.22,
            letterSpacing: "-0.02em",
            color: "#09090b",
            marginBottom: "clamp(20px,3vw,32px)",
          }}>
            "a no-bullshit 1-hour session on what's actually being built in tech right now."
          </blockquote>
          <p style={{
            fontSize: "clamp(13px,1.8vw,15px)",
            fontWeight: 300,
            lineHeight: 1.85,
            color: "#71717a",
            maxWidth: "520px",
          }}>
            no teachers. no slides. no syllabus.<br />
            the ground reality — what's shipping on github, what's breaking on twitter, and what people your age are actually building with ai tools right now.
          </p>
        </div>

        {/* divider */}
        <div className="reveal" style={{ height: "1px", background: "#e8e3da" }} />

        {/* who */}
        <div className="reveal reveal-delay-1">
          <span style={{ ...lightMeta, marginBottom: "28px", display: "block" }}>who's running it</span>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(20px,4vw,40px)", flexWrap: "wrap" }}>
            {/* omega badge */}
            <div style={{
              width: "clamp(60px,9vw,80px)",
              height: "clamp(60px,9vw,80px)",
              background: "#09090b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(28px,4.5vw,40px)",
                fontWeight: 900,
                color: "#E8FF47",
                lineHeight: 1,
              }}>Ω</span>
            </div>

            <div style={{ flex: 1, minWidth: "200px", paddingTop: "4px" }}>
              <div style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(22px,3.5vw,32px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#09090b",
                marginBottom: "10px",
              }}>
                Om Mishra
              </div>
              <div style={{
                fontSize: "13px",
                fontWeight: 300,
                color: "#a1a1aa",
                lineHeight: 1.9,
                letterSpacing: "0.01em",
              }}>
                B.Tech CSE · Ramaiah University of Applied Sciences<br />
                <a
                  href="https://x.com/ohmdreams"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#71717a", textDecoration: "none", borderBottom: "1px solid #e4e4e7", paddingBottom: "1px", transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#09090b")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#71717a")}
                >
                  x.com/ohmdreams
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="reveal" style={{ height: "1px", background: "#e8e3da" }} />

        {/* what you'll get */}
        <div className="reveal reveal-delay-1">
          <span style={{ ...lightMeta, marginBottom: "28px", display: "block" }}>what happens inside</span>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "clamp(16px,3vw,24px)",
          }}>
            {[
              { n: "01", t: "one thing from twitter", d: "a thread, a launch, or a drama. what's actually happening right now." },
              { n: "02", t: "one deep demo", d: "claude code, open source projects, tools you can try tonight." },
              { n: "03", t: "you build live", d: "pitch a problem. we scaffold it in real-time. no finished products." },
              { n: "04", t: "open floor", d: "questions, chaos, people showing stuff on their phones." },
            ].map(({ n, t, d }) => (
              <div key={n} style={{
                padding: "clamp(18px,3vw,24px)",
                border: "1px solid #e8e3da",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                background: "#ffffff",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#09090b")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#e8e3da")}
              >
                <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "22px", fontWeight: 900, color: "#E8FF47", background: "#09090b", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {n}
                </span>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#09090b", letterSpacing: "-0.01em", textTransform: "lowercase" }}>{t}</div>
                <div style={{ fontSize: "12px", fontWeight: 300, color: "#71717a", lineHeight: 1.7 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* divider */}
        <div className="reveal" style={{ height: "1px", background: "#e8e3da" }} />

        {/* social proof + CTA */}
        <div
          className="reveal reveal-delay-2"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "clamp(24px,4vw,48px)",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(24px,4vw,40px)",
              fontWeight: 400,
              color: "#09090b",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              marginBottom: "12px",
            }}>
              15 people from our class<br />already know.
            </p>
            <p style={{ fontSize: "12px", fontWeight: 300, color: "#a1a1aa", letterSpacing: "0.04em" }}>
              details drop 24 hrs before. register to find out when.
            </p>
          </div>

          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "#09090b",
              color: "#E8FF47",
              padding: "0 clamp(24px,3.5vw,40px)",
              height: "48px",
              fontSize: "11px",
              fontWeight: 700,
              fontFamily: "'Manrope', sans-serif",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "opacity 0.15s, transform 0.1s",
              flexShrink: 0,
              borderRadius: "0",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            register ↑
          </a>
        </div>

      </div>

      {/* ── footer bar ── */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "clamp(20px,3vw,24px) clamp(24px,5vw,56px)",
        borderTop: "1px solid #e8e3da",
      }}>
        <span style={lightMeta}>noise&signal</span>
        <span style={lightMeta}>ohm. © 2026</span>
      </div>

    </section>
  );
}

const lightMeta: React.CSSProperties = {
  fontFamily: "'Manrope', sans-serif",
  fontSize: "10px",
  fontWeight: 300,
  color: "#a1a1aa",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
};
