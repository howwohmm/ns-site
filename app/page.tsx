"use client";

import { useState } from "react";
import RegisterFlow from "@/components/RegisterFlow";

function OhmName() {
  const [hovered, setHovered] = useState(false);
  return (
    <p
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(v => !v)}
      style={{
        fontFamily: "var(--font-playfair), serif",
        fontSize: "clamp(14px, 1.6vw, 18px)",
        fontStyle: "italic",
        color: "#0d0d0d",
        marginBottom: "2px",
        cursor: "default",
        transition: "opacity 0.2s",
      }}
    >
      {hovered ? "Om Mishra." : "ohm."}
    </p>
  );
}

export default function Home() {
  const [flowOpen, setFlowOpen] = useState(false);
  const [registered, setRegistered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          10%  { transform: translate(-4%, -5%) }
          20%  { transform: translate(-8%,  4%) }
          30%  { transform: translate( 4%, -8%) }
          40%  { transform: translate(-4%, 12%) }
          50%  { transform: translate(-8%,  4%) }
          60%  { transform: translate(12%,  0%) }
          70%  { transform: translate( 0%,  8%) }
          80%  { transform: translate(-12%, 0%) }
          90%  { transform: translate( 8%,  4%) }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .card-enter {
          animation: cardIn 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        .salutation-enter {
          animation: fadeIn 0.4s ease both;
          animation-delay: 0.15s;
        }
        .body-enter {
          animation: fadeIn 0.5s ease both;
          animation-delay: 0.25s;
        }
        .footer-enter {
          animation: fadeIn 0.4s ease both;
          animation-delay: 0.4s;
        }
        .paper {
          position: relative;
          overflow: hidden;
        }
        .paper::after {
          content: '';
          position: absolute;
          inset: -100%;
          width: 300%;
          height: 300%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0.09;
          pointer-events: none;
          z-index: 1;
          animation: grain 0.4s steps(2) infinite;
        }
        .paper > * { position: relative; z-index: 2; }
      `}</style>

      {/* ── PAGE: LIME BACKGROUND ── */}
      <div style={{
        background: "#E8200A",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(24px, 5vw, 56px)",
        fontFamily: "var(--font-manrope), sans-serif",
      }}>

        {/* ── CARD: CREAM PAPER ── */}
        <div
          className="paper card-enter"
          style={{
            background: "#f2ede4",
            width: "100%",
            maxWidth: "680px",
            padding: "clamp(28px, 5vw, 52px) clamp(28px, 5vw, 52px) clamp(24px, 4vw, 44px)",
          }}
        >

          {/* salutation */}
          <p className="salutation-enter" style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(14px, 1.6vw, 18px)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "#0d0d0d",
            marginBottom: "clamp(12px, 2vw, 20px)",
          }}>
            noise &amp; signal,
          </p>

          {/* body — fills the card */}
          <p className="body-enter" style={{
            fontSize: "clamp(26px, 3.8vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.025em",
            color: "#0d0d0d",
            marginBottom: "clamp(24px, 4vw, 40px)",
          }}>
            {registered
              ? "you're in. details drop 24hrs before. check your email — we'll tell you exactly when and where."
              : "something is happening at RUAS this week. your professor doesn't know about it. it's an hour of the ground reality — what's being built, what's breaking, and what people your age are building with AI tools right now."}
          </p>

          {/* divider + closing */}
          <div className="footer-enter" style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "clamp(20px, 3vw, 32px)",
          }}>
            <div style={{ flex: 1, height: "1px", background: "#0d0d0d", opacity: 0.2 }} />
            <p style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(14px, 1.6vw, 18px)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "#0d0d0d",
              whiteSpace: "nowrap",
            }}>
              {registered ? "see you there," : "find out before everyone else does,"}
            </p>
          </div>

          {/* bottom: CTA + credit */}
          <div className="footer-enter" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "16px",
            flexWrap: "wrap",
          }}>
            {!registered ? (
              <button
                onClick={() => setFlowOpen(true)}
                style={{
                  background: "#0d0d0d",
                  color: "#f2ede4",
                  border: "none",
                  padding: "0 20px",
                  height: "44px",
                  fontSize: "12px",
                  fontWeight: 600,
                  fontFamily: "var(--font-manrope), sans-serif",
                  letterSpacing: "0.02em",
                  cursor: "pointer",
                  borderRadius: "4px",
                  transition: "opacity 0.15s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                register to find out when →
              </button>
            ) : (
              <span style={{ fontSize: "12px", fontWeight: 400, color: "rgba(13,13,13,0.4)" }}>
                check your email for details
              </span>
            )}

            <div style={{ textAlign: "right", marginLeft: "auto" }}>
              <OhmName />
              <p style={{ fontSize: "12px", fontWeight: 300, color: "rgba(13,13,13,0.4)", letterSpacing: "0.02em" }}>
                ruas · cse · bengaluru
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ── MODAL ── */}
      {flowOpen && (
        <RegisterFlow
          onClose={() => setFlowOpen(false)}
          onSuccess={() => { setFlowOpen(false); setRegistered(true); }}
        />
      )}
    </>
  );
}
