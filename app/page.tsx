"use client";

import { useState } from "react";
import RegisterFlow from "@/components/RegisterFlow";
import ProofSection from "@/components/ProofSection";

export default function Home() {
  const [flowOpen, setFlowOpen] = useState(false);
  const [registered, setRegistered] = useState(false);

  return (
    /* grain overlay lives on this div */
    <div className="grain">
      <main style={{ background: "#09090b", color: "#fafafa", minHeight: "100svh" }}>

        {/* ═══ HERO ════════════════════════════════════════════ */}
        <section style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          background: "#09090b",
          position: "relative",
          overflow: "hidden",
        }}>

          {/* ── top bar (Quartr magazine grid) ── */}
          <div
            className="anim-fade-up anim-delay-1"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "clamp(20px, 3vw, 32px) clamp(24px, 5vw, 56px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span style={meta}>noise&signal</span>
            <span style={meta}>session 01</span>
          </div>

          {/* ── main content ── */}
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(48px, 8vw, 96px) clamp(24px, 5vw, 56px)",
            textAlign: "center",
            gap: "0",
          }}>

            {/* omega with glow */}
            <div
              className="anim-fade-up anim-delay-2 omega-wrap"
              style={{ marginBottom: "clamp(28px, 4vw, 48px)" }}
            >
              <span style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(140px, 26vw, 240px)",
                fontWeight: 900,
                color: "#E8FF47",
                lineHeight: 0.82,
                letterSpacing: "-0.05em",
                display: "block",
                userSelect: "none",
                cursor: "default",
              }}>
                Ω
              </span>
            </div>

            {/* signal line */}
            <span
              className="signal-line anim-fade-up anim-delay-3"
              style={{ margin: "0 auto clamp(28px, 4vw, 44px)" }}
            />

            {/* headline */}
            <h1
              className="anim-fade-up anim-delay-3"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(28px, 5.5vw, 56px)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.18,
                letterSpacing: "-0.025em",
                color: "#fafafa",
                maxWidth: "680px",
                marginBottom: "clamp(14px, 2vw, 20px)",
              }}
            >
              something is happening<br />at ruas. this week.
            </h1>

            {/* sub */}
            <p
              className="anim-fade-up anim-delay-4"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "clamp(12px, 1.8vw, 14px)",
                fontWeight: 300,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.08em",
                textTransform: "lowercase",
                marginBottom: "clamp(36px, 5vw, 56px)",
              }}
            >
              you won't find out by reading the syllabus.
            </p>

            {/* CTA */}
            <div className="anim-fade-up anim-delay-5">
              {!registered ? (
                <button
                  onClick={() => setFlowOpen(true)}
                  style={{
                    background: "#E8FF47",
                    color: "#09090b",
                    border: "none",
                    padding: "0 clamp(28px, 4vw, 44px)",
                    height: "48px",
                    fontSize: "12px",
                    fontWeight: 700,
                    fontFamily: "'Manrope', sans-serif",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    borderRadius: "0",
                    transition: "background 0.15s ease, transform 0.1s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#d4e83c";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#E8FF47";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  i want to know
                  <span style={{ fontSize: "16px", fontWeight: 400 }}>→</span>
                </button>
              ) : (
                <div style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 2,
                  textAlign: "center",
                }}>
                  <span style={{ color: "#E8FF47", fontWeight: 700, letterSpacing: "0.04em" }}>you're in.</span>
                  <br />check your email. details drop 24hrs before.
                </div>
              )}
            </div>

          </div>

          {/* ── bottom bar ── */}
          <div
            className="anim-fade-up anim-delay-6"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "clamp(20px, 3vw, 32px) clamp(24px, 5vw, 56px)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span style={meta}>by ohm.</span>
            <span style={meta}>ruas · cse · bengaluru</span>
          </div>

        </section>

        {/* ═══ PROOF ═══════════════════════════════════════════ */}
        <ProofSection />

      </main>

      {/* ═══ MODAL ═══════════════════════════════════════════ */}
      {flowOpen && (
        <RegisterFlow
          onClose={() => setFlowOpen(false)}
          onSuccess={() => { setFlowOpen(false); setRegistered(true); }}
        />
      )}
    </div>
  );
}

const meta: React.CSSProperties = {
  fontFamily: "'Manrope', sans-serif",
  fontSize: "10px",
  fontWeight: 300,
  color: "rgba(255,255,255,0.22)",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
};
