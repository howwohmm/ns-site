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
      // fallback — skip push, go straight to form
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
      } catch {
        // push setup failed, continue without it
      }
      setStep("form");
    } else {
      // denied — allow fallback to email-only
      setStep("form");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("name and email are required.");
      return;
    }

    setStep("loading");
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          pushSubscription: pushSub ? JSON.stringify(pushSub) : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "something went wrong");
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "something went wrong. try again.");
      setStep("form");
    }
  }

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        zIndex: 100,
        backdropFilter: "blur(4px)",
      }}
    >
      <div style={{
        background: "#1f1f1f",
        border: "1px solid #2a2a2a",
        padding: "40px 32px",
        width: "100%",
        maxWidth: "420px",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        position: "relative",
      }}>

        {/* close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "20px",
            background: "none",
            border: "none",
            color: "#666",
            fontSize: "20px",
            cursor: "pointer",
            lineHeight: 1,
            fontFamily: "inherit",
          }}
        >
          ×
        </button>

        {/* omega */}
        <span style={{ fontSize: "32px", fontWeight: 700, color: "#E8FF47", lineHeight: 1 }}>Ω</span>

        {/* gate step */}
        {step === "gate" && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 300, lineHeight: 1.4, textTransform: "lowercase", letterSpacing: "-0.01em" }}>
                we'll ping you when details drop.
              </h2>
              <p style={{ fontSize: "13px", fontWeight: 300, color: "#8a8a8a", lineHeight: 1.7 }}>
                turn on notifications for this site so we can reach you instantly —
                24hrs before, 10hrs before, 2hrs before, and 20 mins before it starts.
              </p>
            </div>

            <button
              onClick={requestPushPermission}
              style={{
                background: "#E8FF47",
                color: "#1a1a1a",
                padding: "14px 24px",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "inherit",
                border: "none",
                cursor: "pointer",
                textTransform: "lowercase",
                letterSpacing: "0.01em",
                transition: "opacity 0.15s",
              }}
              onMouseOver={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseOut={e => (e.currentTarget.style.opacity = "1")}
            >
              turn on notifications →
            </button>

            <p style={{ fontSize: "11px", fontWeight: 300, color: "#555", textAlign: "center", lineHeight: 1.6 }}>
              you can skip this but you'll only get email reminders.
            </p>
          </>
        )}

        {/* form step */}
        {step === "form" && (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 300, lineHeight: 1.4, textTransform: "lowercase", letterSpacing: "-0.01em" }}>
                {pushSub ? "notifications on. now tell us who you are." : "we'll reach you by email."}
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input
                type="text"
                placeholder="your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                style={{
                  background: "#141414",
                  border: "1px solid #2a2a2a",
                  color: "#f0f0f0",
                  padding: "13px 16px",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  fontWeight: 300,
                  outline: "none",
                  width: "100%",
                }}
                onFocus={e => (e.target.style.borderColor = "#E8FF47")}
                onBlur={e => (e.target.style.borderColor = "#2a2a2a")}
              />
              <input
                type="email"
                placeholder="your college email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  background: "#141414",
                  border: "1px solid #2a2a2a",
                  color: "#f0f0f0",
                  padding: "13px 16px",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  fontWeight: 300,
                  outline: "none",
                  width: "100%",
                }}
                onFocus={e => (e.target.style.borderColor = "#E8FF47")}
                onBlur={e => (e.target.style.borderColor = "#2a2a2a")}
              />
            </div>

            {error && (
              <p style={{ color: "#ff6b6b", fontSize: "13px", fontWeight: 300 }}>{error}</p>
            )}

            <button
              type="submit"
              style={{
                background: "#E8FF47",
                color: "#1a1a1a",
                padding: "14px 24px",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "inherit",
                border: "none",
                cursor: "pointer",
                textTransform: "lowercase",
                letterSpacing: "0.01em",
                transition: "opacity 0.15s",
              }}
              onMouseOver={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseOut={e => (e.currentTarget.style.opacity = "1")}
            >
              i'm in →
            </button>
          </form>
        )}

        {/* loading */}
        {step === "loading" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "20px 0" }}>
            <div style={{
              width: "32px",
              height: "32px",
              border: "2px solid #2a2a2a",
              borderTop: "2px solid #E8FF47",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }} />
            <p style={{ color: "#8a8a8a", fontSize: "13px", fontWeight: 300 }}>locking you in...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

      </div>
    </div>
  );
}
