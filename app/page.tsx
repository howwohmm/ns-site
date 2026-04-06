"use client";

import { useState } from "react";
import RegisterFlow from "@/components/RegisterFlow";

export default function Home() {
  const [flowOpen, setFlowOpen] = useState(false);
  const [registered, setRegistered] = useState(false);

  return (
    <div
      className="grain"
      style={{
        background: "#0d0d0d",
        color: "#f0ede6",
        minHeight: "100svh",
        height: "100svh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-manrope), sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── TOP BAR ── */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px clamp(20px, 4vw, 48px)",
        flexShrink: 0,
      }}>
        <span style={{ fontSize: "12px", fontWeight: 400, letterSpacing: "0.04em", color: "rgba(240,237,230,0.45)" }}>
          noise&signal
        </span>
        <span style={{ fontSize: "12px", fontWeight: 400, letterSpacing: "0.04em", color: "rgba(240,237,230,0.45)" }}>
          session 01
        </span>
      </div>

      {/* ── POSTER HEADLINE ── */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 clamp(20px, 4vw, 48px)",
      }}>
        <h1 style={{
          fontSize: "clamp(52px, 11.5vw, 160px)",
          fontWeight: 700,
          lineHeight: 0.95,
          letterSpacing: "-0.04em",
          color: "#f0ede6",
          textTransform: "lowercase",
        }}>
          something<br />
          is happening<br />
          <span style={{ color: "#E8FF47" }}>at ruas.</span>
        </h1>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        padding: "clamp(16px, 3vw, 32px) clamp(20px, 4vw, 48px)",
        flexShrink: 0,
        gap: "24px",
        flexWrap: "wrap",
      }}>
        {/* left: description + CTA */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p style={{
            fontSize: "clamp(12px, 1.4vw, 14px)",
            fontWeight: 300,
            lineHeight: 1.65,
            color: "rgba(240,237,230,0.4)",
            maxWidth: "340px",
          }}>
            a 1-hour session on what's actually being built in tech right now.
            no teachers. no slides. no syllabus.
          </p>

          {!registered ? (
            <button
              onClick={() => setFlowOpen(true)}
              style={{
                background: "#E8FF47",
                color: "#0d0d0d",
                border: "none",
                padding: "0 20px",
                height: "40px",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "var(--font-manrope), sans-serif",
                letterSpacing: "0.02em",
                cursor: "pointer",
                borderRadius: "5px",
                transition: "opacity 0.15s",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                alignSelf: "flex-start",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              register to find out when →
            </button>
          ) : (
            <p style={{ fontSize: "13px", fontWeight: 400, color: "rgba(240,237,230,0.5)" }}>
              <span style={{ color: "#E8FF47" }}>you're in.</span> check your email.
            </p>
          )}
        </div>

        {/* right: meta */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <p style={{ fontSize: "12px", fontWeight: 400, color: "rgba(240,237,230,0.25)", lineHeight: 1.8, letterSpacing: "0.02em" }}>
            by ohm. · ruas cse<br />
            bengaluru · 2026<br />
            <a
              href="https://x.com/ohmdreams"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(240,237,230,0.25)", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(240,237,230,0.6)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,237,230,0.25)")}
            >
              x.com/ohmdreams
            </a>
          </p>
          {!registered && (
            <p style={{ fontSize: "11px", fontWeight: 300, color: "rgba(240,237,230,0.18)", marginTop: "8px" }}>
              15 from your class are already in
            </p>
          )}
        </div>
      </div>

      {/* ── MODAL ── */}
      {flowOpen && (
        <RegisterFlow
          onClose={() => setFlowOpen(false)}
          onSuccess={() => { setFlowOpen(false); setRegistered(true); }}
        />
      )}
    </div>
  );
}
