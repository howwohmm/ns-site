"use client";

import { useState } from "react";

type Step = "gate" | "form" | "loading";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function RegisterFlowV2({ onClose, onSuccess }: Props) {
  const notificationsSupported =
    typeof window !== "undefined" &&
    "Notification" in window &&
    "serviceWorker" in navigator &&
    Notification.permission !== "denied";

  const [step, setStep] = useState<Step>(
    notificationsSupported && Notification.permission === "default" ? "gate" : "form"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [error, setError] = useState("");
  const [pushSub, setPushSub] = useState<PushSubscription | null>(null);

  async function requestPushPermission() {
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
    if (!name.trim() || !email.trim() || !rollNumber.trim()) { setError("all fields are required."); return; }
    setStep("loading");
    setError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), rollNumber: rollNumber.trim(), pushSubscription: pushSub ? JSON.stringify(pushSub) : null }),
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
        @keyframes v2-backdrop-in { from { opacity:0 } to { opacity:1 } }
        @keyframes v2-modal-up {
          from { opacity:0; transform: translateY(16px) scale(0.98); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
        @keyframes v2-spin { to { transform: rotate(360deg); } }
        .v2-modal-backdrop { animation: v2-backdrop-in 0.2s ease both; }
        .v2-modal-card     { animation: v2-modal-up 0.35s cubic-bezier(0.16,1,0.3,1) both; }
        .v2-inp::placeholder { color: rgba(255,255,255,0.22); }
        .v2-inp:focus { outline: none; border-color: rgba(255,255,255,0.38); }
        .v2-btn-primary:hover { opacity: 0.88; }
        .v2-btn-ghost:hover { color: rgba(255,255,255,0.7); }
      `}</style>

      {/* backdrop */}
      <div
        className="v2-modal-backdrop"
        onClick={e => e.target === e.currentTarget && onClose()}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          zIndex: 9999,
        }}
      >
        {/* card */}
        <div
          className="v2-modal-card"
          style={{
            background: "rgba(0,0,0,0.32)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.1)",
            width: "100%",
            maxWidth: "440px",
            padding: "clamp(28px, 5vw, 40px)",
            position: "relative",
            fontFamily: "'Inter', 'Manrope', sans-serif",
          }}
        >
          {/* close */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "14px",
              right: "16px",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.28)",
              fontSize: "15px",
              cursor: "pointer",
              padding: "4px",
              lineHeight: 1,
              transition: "color 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
          >
            ✕
          </button>

          {/* ── gate ── */}
          {step === "gate" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <p style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "14px",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "12px",
                  letterSpacing: "0.02em",
                }}>
                  noise&amp;signal,
                </p>
                <h2 style={{
                  fontSize: "clamp(22px, 3.5vw, 30px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  color: "#fff",
                  marginBottom: "8px",
                }}>
                  we&apos;ll ping you when details drop.
                </h2>
                <p style={{ fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>
                  we&apos;ll ping you 24hrs before, 2hrs before, and 20 minutes before it starts. don&apos;t miss it.
                </p>
              </div>

              <button
                className="v2-btn-primary"
                onClick={requestPushPermission}
                style={btnPrimary}
              >
                turn on notifications →
              </button>

              <button
                className="v2-btn-ghost"
                onClick={() => setStep("form")}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "12px", fontFamily: "var(--font-inter), sans-serif", cursor: "pointer", padding: 0, textDecoration: "underline", textUnderlineOffset: "3px", transition: "color 0.15s" }}
              >
                skip, just use email
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", fontStyle: "italic", fontWeight: 300, color: "rgba(255,255,255,0.25)" }}>ohm.</p>
              </div>
            </div>
          )}

          {/* ── form ── */}
          {step === "form" && (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <p style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "14px",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "12px",
                }}>
                  noise&amp;signal,
                </p>
                <h2 style={{
                  fontSize: "clamp(20px, 3vw, 28px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  color: "#fff",
                }}>
                  {pushSub ? "notifications on. who are you?" : "we'll reach you by email."}
                </h2>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <input
                  className="v2-inp"
                  type="text"
                  placeholder="your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  style={inputStyle}
                />
                <input
                  className="v2-inp"
                  type="email"
                  placeholder="your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                />
                <input
                  className="v2-inp"
                  type="text"
                  placeholder="roll number"
                  value={rollNumber}
                  onChange={e => setRollNumber(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>

              {error && <p style={{ fontSize: "12px", color: "#ff6b6b", fontWeight: 400 }}>{error}</p>}

              <button className="v2-btn-primary" type="submit" style={btnPrimary}>
                i&apos;m in →
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
                <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "13px", fontStyle: "italic", fontWeight: 300, color: "rgba(255,255,255,0.25)" }}>ohm.</p>
              </div>
            </form>
          )}

          {/* ── loading ── */}
          {step === "loading" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "24px 0 16px" }}>
              <div style={{
                width: "22px",
                height: "22px",
                border: "2px solid rgba(255,255,255,0.1)",
                borderTop: "2px solid rgba(255,255,255,0.8)",
                borderRadius: "50%",
                animation: "v2-spin 0.7s linear infinite",
              }} />
              <p style={{ fontSize: "13px", fontWeight: 300, color: "rgba(255,255,255,0.4)" }}>
                locking you in...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const btnPrimary: React.CSSProperties = {
  background: "#fff",
  color: "#080808",
  border: "none",
  height: "44px",
  padding: "0 20px",
  fontSize: "13px",
  fontWeight: 600,
  fontFamily: "var(--font-inter), sans-serif",
  letterSpacing: "0.03em",
  cursor: "pointer",
  transition: "opacity 0.15s",
  width: "100%",
};

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
  height: "44px",
  padding: "0 14px",
  fontSize: "14px",
  fontFamily: "var(--font-inter), sans-serif",
  fontWeight: 300,
  width: "100%",
  transition: "border-color 0.15s",
};
