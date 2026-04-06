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
    <>
      <style>{`
        @keyframes grain2 {
          0%, 100% { transform: translate(0, 0) }
          10%  { transform: translate(-4%, -5%) }
          30%  { transform: translate( 4%, -8%) }
          60%  { transform: translate(12%,  0%) }
          80%  { transform: translate(-12%, 0%) }
        }
        .modal-paper { position: relative; overflow: hidden; }
        .modal-paper::after {
          content: '';
          position: absolute;
          inset: -100%;
          width: 300%;
          height: 300%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          opacity: 0.08;
          pointer-events: none;
          z-index: 1;
          animation: grain2 0.4s steps(2) infinite;
        }
        .modal-paper > * { position: relative; z-index: 2; }
        .modal-input::placeholder { color: rgba(13,13,13,0.3); }
        .modal-input:focus { outline: none; border-color: rgba(13,13,13,0.4); }
      `}</style>

      {/* backdrop */}
      <div
        onClick={e => e.target === e.currentTarget && onClose()}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(232,32,10,0.75)",
          backdropFilter: "blur(2px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          zIndex: 9999,
        }}
      >
        {/* card — same cream paper as the main letter */}
        <div
          className="modal-paper"
          style={{
            background: "#f2ede4",
            width: "100%",
            maxWidth: "440px",
            padding: "36px 36px 32px",
            position: "relative",
            fontFamily: "var(--font-manrope), sans-serif",
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
              color: "rgba(13,13,13,0.25)",
              fontSize: "16px",
              cursor: "pointer",
              padding: "4px",
              lineHeight: 1,
              transition: "color 0.15s",
              fontFamily: "var(--font-manrope), sans-serif",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(13,13,13,0.7)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(13,13,13,0.25)")}
          >
            ✕
          </button>

          {/* ── gate ── */}
          {step === "gate" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <p style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "15px",
                  fontStyle: "italic",
                  color: "#0d0d0d",
                  marginBottom: "12px",
                }}>
                  noise &amp; signal,
                </p>
                <h2 style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  color: "#0d0d0d",
                  marginBottom: "8px",
                }}>
                  we'll ping you when details drop.
                </h2>
                <p style={{ fontSize: "13px", fontWeight: 300, color: "rgba(13,13,13,0.5)", lineHeight: 1.65 }}>
                  24hrs before, 2hrs, and 20 minutes. turn on notifications so we reach you instantly.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <button
                  onClick={requestPushPermission}
                  style={btnDark}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  turn on notifications →
                </button>
                <button
                  onClick={() => setStep("form")}
                  style={btnGhost}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,0.3)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(13,13,13,0.12)")}
                >
                  skip — email only
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ flex: 1, height: "1px", background: "rgba(13,13,13,0.15)" }} />
                <p style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "14px",
                  fontStyle: "italic",
                  color: "rgba(13,13,13,0.4)",
                }}>ohm.</p>
              </div>
            </div>
          )}

          {/* ── form ── */}
          {step === "form" && (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <p style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "15px",
                  fontStyle: "italic",
                  color: "#0d0d0d",
                  marginBottom: "12px",
                }}>
                  noise &amp; signal,
                </p>
                <h2 style={{
                  fontSize: "26px",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  color: "#0d0d0d",
                }}>
                  {pushSub ? "notifications on. who are you?" : "we'll reach you by email."}
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <input
                  className="modal-input"
                  type="text"
                  placeholder="your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  style={inputStyle}
                />
                <input
                  className="modal-input"
                  type="email"
                  placeholder="college email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>

              {error && <p style={{ fontSize: "12px", color: "#cc2200", fontWeight: 400 }}>{error}</p>}

              <button
                type="submit"
                style={btnDark}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                i'm in →
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ flex: 1, height: "1px", background: "rgba(13,13,13,0.15)" }} />
                <p style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "14px",
                  fontStyle: "italic",
                  color: "rgba(13,13,13,0.4)",
                }}>ohm.</p>
              </div>
            </form>
          )}

          {/* ── loading ── */}
          {step === "loading" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "16px 0 8px" }}>
              <div style={{
                width: "22px",
                height: "22px",
                border: "2px solid rgba(13,13,13,0.1)",
                borderTop: "2px solid #0d0d0d",
                borderRadius: "50%",
                animation: "spin 0.7s linear infinite",
              }} />
              <p style={{ fontSize: "13px", fontWeight: 300, color: "rgba(13,13,13,0.45)" }}>
                locking you in...
              </p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const btnDark: React.CSSProperties = {
  background: "#0d0d0d",
  color: "#f2ede4",
  border: "none",
  height: "42px",
  padding: "0 20px",
  fontSize: "13px",
  fontWeight: 600,
  fontFamily: "var(--font-manrope), sans-serif",
  cursor: "pointer",
  borderRadius: "4px",
  transition: "opacity 0.15s",
  width: "100%",
};

const btnGhost: React.CSSProperties = {
  background: "transparent",
  color: "rgba(13,13,13,0.5)",
  border: "1px solid rgba(13,13,13,0.12)",
  height: "40px",
  padding: "0 20px",
  fontSize: "13px",
  fontWeight: 400,
  fontFamily: "var(--font-manrope), sans-serif",
  cursor: "pointer",
  borderRadius: "4px",
  transition: "border-color 0.15s",
  width: "100%",
};

const inputStyle: React.CSSProperties = {
  background: "rgba(13,13,13,0.05)",
  border: "1px solid rgba(13,13,13,0.12)",
  color: "#0d0d0d",
  height: "40px",
  padding: "0 12px",
  fontSize: "14px",
  fontFamily: "var(--font-manrope), sans-serif",
  fontWeight: 300,
  width: "100%",
  borderRadius: "4px",
  transition: "border-color 0.15s",
};
