"use client";

import { useState } from "react";

type Step = "gate" | "form" | "loading";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function RegisterFlow({ onClose, onSuccess }: Props) {
  const [step, setStep] = useState<Step>("gate");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [pushSub, setPushSub] = useState<PushSubscription | null>(null);

  async function requestPushPermission() {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      setStep("form");
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js");
        await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        });
        setPushSub(sub);
      } catch { /* continue without push */ }
    }
    setStep("form");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) { setError("both fields are required."); return; }
    setStep("loading");
    setError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), pushSubscription: pushSub ? JSON.stringify(pushSub) : null }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "something went wrong"); }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "something went wrong. try again.");
      setStep("form");
    }
  }

  return (
    /* backdrop */
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(9,9,11,0.88)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        zIndex: 9999,
      }}
    >
      {/* card — shadcn card language on dark */}
      <div
        className="modal-enter"
        style={{
          background: "#09090b",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "0",
          padding: "clamp(28px,5vw,44px) clamp(24px,4vw,40px)",
          width: "100%",
          maxWidth: "400px",
          position: "relative",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "18px",
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.25)",
            fontSize: "18px",
            lineHeight: 1,
            cursor: "pointer",
            padding: "4px",
            transition: "color 0.15s",
            fontFamily: "'Manrope', sans-serif",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
        >
          ✕
        </button>

        {/* omega */}
        <div style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "36px",
          fontWeight: 900,
          color: "#E8FF47",
          lineHeight: 1,
          marginBottom: "24px",
        }}>
          Ω
        </div>

        {/* ── gate step ── */}
        {step === "gate" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <h2 style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(18px,3vw,22px)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#fafafa",
                lineHeight: 1.35,
                marginBottom: "10px",
              }}>
                we'll ping you when details drop.
              </h2>
              <p style={{ fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.35)", lineHeight: 1.75 }}>
                turn on notifications so we can reach you instantly — 24hrs before, 10hrs, 2hrs, and 20 minutes before it starts.
              </p>
            </div>

            <button
              onClick={requestPushPermission}
              style={btnPrimary}
              onMouseEnter={e => (e.currentTarget.style.background = "#d4e83c")}
              onMouseLeave={e => (e.currentTarget.style.background = "#E8FF47")}
            >
              turn on notifications →
            </button>

            <p style={{ fontSize: "11px", fontWeight: 300, color: "rgba(255,255,255,0.2)", textAlign: "center", letterSpacing: "0.02em" }}>
              skip this and you'll only get email reminders
            </p>
          </div>
        )}

        {/* ── form step ── */}
        {step === "form" && (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <h2 style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(18px,3vw,22px)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#fafafa",
                lineHeight: 1.35,
                marginBottom: "6px",
              }}>
                {pushSub ? "you're set. now tell us who you are." : "we'll reach you by email."}
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* shadcn-spec input */}
              <input
                type="text"
                placeholder="your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = "#E8FF47"; e.target.style.boxShadow = "0 0 0 2px rgba(232,255,71,0.12)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
              <input
                type="email"
                placeholder="college email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = "#E8FF47"; e.target.style.boxShadow = "0 0 0 2px rgba(232,255,71,0.12)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            {error && (
              <p style={{ fontSize: "12px", color: "#f87171", fontWeight: 300 }}>{error}</p>
            )}

            <button
              type="submit"
              style={btnPrimary}
              onMouseEnter={e => (e.currentTarget.style.background = "#d4e83c")}
              onMouseLeave={e => (e.currentTarget.style.background = "#E8FF47")}
            >
              i'm in →
            </button>
          </form>
        )}

        {/* ── loading ── */}
        {step === "loading" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", padding: "24px 0" }}>
            <div style={{
              width: "28px",
              height: "28px",
              border: "2px solid rgba(255,255,255,0.08)",
              borderTop: "2px solid #E8FF47",
              borderRadius: "50%",
              animation: "spin 0.75s linear infinite",
            }} />
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", fontWeight: 300, letterSpacing: "0.06em" }}>
              locking you in...
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

      </div>
    </div>
  );
}

/* ── shared styles ── */
const btnPrimary: React.CSSProperties = {
  background: "#E8FF47",
  color: "#09090b",
  border: "none",
  height: "44px",
  padding: "0 24px",
  fontSize: "12px",
  fontWeight: 700,
  fontFamily: "'Manrope', sans-serif",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
  borderRadius: "0",
  transition: "background 0.15s ease",
  width: "100%",
};

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fafafa",
  height: "42px",
  padding: "0 14px",
  fontSize: "14px",
  fontFamily: "'Manrope', sans-serif",
  fontWeight: 300,
  outline: "none",
  width: "100%",
  borderRadius: "0",
  transition: "border-color 0.15s, box-shadow 0.15s",
};
