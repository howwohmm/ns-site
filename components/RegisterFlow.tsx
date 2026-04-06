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
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#161616",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          padding: "32px",
          width: "100%",
          maxWidth: "380px",
          position: "relative",
          boxShadow: "0 16px 64px rgba(0,0,0,0.5)",
          fontFamily: "var(--font-manrope), sans-serif",
        }}
      >
        {/* close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.2)",
            fontSize: "16px",
            lineHeight: 1,
            cursor: "pointer",
            padding: "4px 6px",
            borderRadius: "4px",
            transition: "color 0.15s, background 0.15s",
            fontFamily: "var(--font-manrope), sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "none"; }}
        >
          ✕
        </button>

        {/* ── gate step ── */}
        {step === "gate" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8FF47", marginBottom: "12px" }}>
                noise&signal
              </p>
              <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#fafafa", lineHeight: 1.3, marginBottom: "8px" }}>
                get notified when details drop
              </h2>
              <p style={{ fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
                we'll ping you 24hrs, 2hrs, and 20 minutes before it starts.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button
                onClick={requestPushPermission}
                style={btnPrimary}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                turn on notifications →
              </button>
              <button
                onClick={() => setStep("form")}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.35)",
                  height: "40px",
                  fontSize: "12px",
                  fontWeight: 400,
                  fontFamily: "var(--font-manrope), sans-serif",
                  cursor: "pointer",
                  borderRadius: "6px",
                  transition: "border-color 0.15s, color 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
              >
                skip — email only
              </button>
            </div>
          </div>
        )}

        {/* ── form step ── */}
        {step === "form" && (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8FF47", marginBottom: "12px" }}>
                noise&signal
              </p>
              <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#fafafa", lineHeight: 1.3 }}>
                {pushSub ? "notifications on. who are you?" : "we'll reach you by email."}
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <input
                type="text"
                placeholder="your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = "rgba(232,255,71,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(232,255,71,0.08)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
              <input
                type="email"
                placeholder="college email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = "rgba(232,255,71,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(232,255,71,0.08)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            {error && (
              <p style={{ fontSize: "12px", color: "#f87171", fontWeight: 300 }}>{error}</p>
            )}

            <button
              type="submit"
              style={btnPrimary}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              i'm in →
            </button>
          </form>
        )}

        {/* ── loading ── */}
        {step === "loading" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "20px 0" }}>
            <div style={{
              width: "24px",
              height: "24px",
              border: "2px solid rgba(255,255,255,0.06)",
              borderTop: "2px solid #E8FF47",
              borderRadius: "50%",
              animation: "spin 0.7s linear infinite",
            }} />
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", fontWeight: 300 }}>
              locking you in...
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}
      </div>
    </div>
  );
}

const btnPrimary: React.CSSProperties = {
  background: "#E8FF47",
  color: "#0f0f0f",
  border: "none",
  height: "42px",
  padding: "0 20px",
  fontSize: "13px",
  fontWeight: 600,
  fontFamily: "var(--font-manrope), sans-serif",
  cursor: "pointer",
  borderRadius: "6px",
  transition: "opacity 0.15s",
  width: "100%",
};

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fafafa",
  height: "40px",
  padding: "0 12px",
  fontSize: "14px",
  fontFamily: "var(--font-manrope), sans-serif",
  fontWeight: 300,
  outline: "none",
  width: "100%",
  borderRadius: "6px",
  transition: "border-color 0.15s, box-shadow 0.15s",
};
