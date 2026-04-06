"use client";

import { useState } from "react";
import RegisterFlow from "@/components/RegisterFlow";
import ProofSection from "@/components/ProofSection";

export default function Home() {
  const [flowOpen, setFlowOpen] = useState(false);
  const [registered, setRegistered] = useState(false);

  return (
    <main style={{ background: "#1a1a1a", color: "#f0f0f0", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* hero — full viewport */}
      <section style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100svh",
        padding: "0 24px",
        textAlign: "center",
        gap: "40px",
        position: "relative",
      }}>

        {/* omega */}
        <span style={{
          fontSize: "clamp(52px, 12vw, 88px)",
          fontWeight: 700,
          color: "#E8FF47",
          lineHeight: 1,
          userSelect: "none",
        }}>
          Ω
        </span>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "420px" }}>
          <h1 style={{
            fontSize: "clamp(22px, 5vw, 34px)",
            fontWeight: 300,
            lineHeight: 1.35,
            letterSpacing: "-0.02em",
            textTransform: "lowercase",
          }}>
            something is happening<br />at ruas. this week.
          </h1>
          <p style={{
            color: "#8a8a8a",
            fontSize: "clamp(14px, 2.5vw, 16px)",
            fontWeight: 300,
            lineHeight: 1.7,
          }}>
            you won't find out by reading the syllabus.
          </p>
        </div>

        {!registered ? (
          <button
            onClick={() => setFlowOpen(true)}
            style={{
              background: "#E8FF47",
              color: "#1a1a1a",
              padding: "14px 36px",
              fontSize: "15px",
              fontWeight: 700,
              fontFamily: "inherit",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.01em",
              textTransform: "lowercase",
              transition: "opacity 0.15s",
            }}
            onMouseOver={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseOut={e => (e.currentTarget.style.opacity = "1")}
          >
            i want to know →
          </button>
        ) : (
          <div style={{ color: "#8a8a8a", fontSize: "14px", fontWeight: 300, lineHeight: 2, textTransform: "lowercase" }}>
            <span style={{ color: "#E8FF47" }}>you're in.</span><br />
            check your email. details drop 24hrs before.<br />
            watch for the ping.
          </div>
        )}

        {/* scroll hint */}
        {!registered && (
          <div style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#444",
            fontSize: "11px",
            fontWeight: 300,
            letterSpacing: "0.12em",
            textTransform: "lowercase",
          }}>
            scroll ↓
          </div>
        )}
      </section>

      {/* proof section */}
      <ProofSection />

      {/* register modal */}
      {flowOpen && (
        <RegisterFlow
          onClose={() => setFlowOpen(false)}
          onSuccess={() => {
            setFlowOpen(false);
            setRegistered(true);
          }}
        />
      )}
    </main>
  );
}
