"use client";

import { useState } from "react";
import RegisterFlow from "@/components/RegisterFlow";
import ProofSection from "@/components/ProofSection";

export default function Home() {
  const [flowOpen, setFlowOpen] = useState(false);
  const [registered, setRegistered] = useState(false);

  return (
    <main style={{ background: "#080808", color: "#f0f0f0" }}>

      {/* grain overlay — applied via pseudo-element in globals.css */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Manrope:wght@300;400;700&display=swap');

        .hero-grain::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0.035;
          pointer-events: none;
          z-index: 0;
        }

        .hero-section {
          position: relative;
          z-index: 1;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-up { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.25s; }
        .fade-up-3 { animation-delay: 0.4s; }
        .fade-up-4 { animation-delay: 0.55s; }

        .cta-btn {
          background: #E8FF47;
          color: #080808;
          padding: 15px 40px;
          font-size: 13px;
          font-weight: 700;
          font-family: 'Manrope', sans-serif;
          border: none;
          cursor: pointer;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: background 0.15s, transform 0.1s;
          display: inline-block;
        }
        .cta-btn:hover { background: #d4e83c; transform: translateY(-1px); }
        .cta-btn:active { transform: translateY(0); }

        .scroll-hint {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          color: #333;
          font-size: 10px;
          font-family: 'Manrope', sans-serif;
          font-weight: 300;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          animation: fadeUp 1s 1.2s both;
        }
      `}</style>

      {/* ─── HERO ───────────────────────────────────────────── */}
      <section
        className="hero-grain hero-section"
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          padding: "0",
          position: "relative",
          background: "#080808",
        }}
      >
        {/* top bar — Quartr magazine grid */}
        <div
          className="fade-up fade-up-1"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "28px 40px",
            borderBottom: "1px solid #1a1a1a",
          }}
        >
          <span style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "11px",
            fontWeight: 300,
            color: "#555",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}>
            noise&signal
          </span>
          <span style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "11px",
            fontWeight: 300,
            color: "#333",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}>
            session 01
          </span>
        </div>

        {/* center content */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 24px",
          textAlign: "center",
          gap: "0",
        }}>

          {/* omega — editorial serif, HUGE */}
          <div
            className="fade-up fade-up-2"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(120px, 22vw, 200px)",
              fontWeight: 900,
              color: "#E8FF47",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              marginBottom: "48px",
              userSelect: "none",
            }}
          >
            Ω
          </div>

          {/* headline */}
          <h1
            className="fade-up fade-up-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 52px)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "#f0f0f0",
              maxWidth: "640px",
              marginBottom: "20px",
            }}
          >
            something is happening<br />at ruas. this week.
          </h1>

          {/* subline */}
          <p
            className="fade-up fade-up-3"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "clamp(13px, 2vw, 15px)",
              fontWeight: 300,
              color: "#555",
              letterSpacing: "0.06em",
              marginBottom: "52px",
            }}
          >
            you won't find out by reading the syllabus.
          </p>

          {/* CTA */}
          <div className="fade-up fade-up-4">
            {!registered ? (
              <button className="cta-btn" onClick={() => setFlowOpen(true)}>
                i want to know →
              </button>
            ) : (
              <div style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "#555",
                lineHeight: 2,
                textAlign: "center",
              }}>
                <span style={{ color: "#E8FF47", fontWeight: 700 }}>you're in.</span><br />
                check your email. details drop 24hrs before.
              </div>
            )}
          </div>
        </div>

        {/* bottom bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "28px 40px",
          borderTop: "1px solid #1a1a1a",
          animation: "fadeUp 0.9s 0.8s both",
        }}>
          <span style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "11px",
            fontWeight: 300,
            color: "#333",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}>
            by ohm.
          </span>
          <span style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "11px",
            fontWeight: 300,
            color: "#333",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}>
            ruas · cse
          </span>
        </div>

        <div className="scroll-hint">scroll ↓</div>
      </section>

      {/* ─── PROOF ──────────────────────────────────────────── */}
      <ProofSection />

      {/* ─── MODAL ──────────────────────────────────────────── */}
      {flowOpen && (
        <RegisterFlow
          onClose={() => setFlowOpen(false)}
          onSuccess={() => { setFlowOpen(false); setRegistered(true); }}
        />
      )}
    </main>
  );
}
