"use client";

const divider = <div style={{ width: "32px", height: "1px", background: "#2a2a2a", margin: "0 auto" }} />;

export default function ProofSection() {
  return (
    <section style={{
      padding: "80px 24px 100px",
      maxWidth: "480px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "56px",
    }}>

      {/* what is this */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <span style={{ color: "#8a8a8a", fontSize: "11px", fontWeight: 300, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          what is this
        </span>
        <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.75, color: "#d0d0d0" }}>
          a no-bullshit 1-hour session on what's actually being built in tech right now —
          tools, projects, and what people your age are shipping.
        </p>
        <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.75, color: "#d0d0d0" }}>
          no teachers. no slides. no syllabus.
        </p>
      </div>

      {divider}

      {/* who's running it */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <span style={{ color: "#8a8a8a", fontSize: "11px", fontWeight: 300, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          who's running it
        </span>

        {/* id card style */}
        <div style={{
          border: "1px solid #2a2a2a",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          background: "#1f1f1f",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "17px", fontWeight: 700, color: "#f0f0f0", letterSpacing: "-0.01em" }}>
                Om Mishra
              </span>
              <span style={{ fontSize: "13px", fontWeight: 300, color: "#8a8a8a" }}>
                CSE · Ramaiah University of Applied Sciences
              </span>
            </div>
            {/* omega as ID mark */}
            <span style={{ fontSize: "28px", fontWeight: 700, color: "#E8FF47", lineHeight: 1, flexShrink: 0 }}>Ω</span>
          </div>

          <div style={{ height: "1px", background: "#2a2a2a" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "12px", fontWeight: 300, color: "#666", letterSpacing: "0.06em", textTransform: "lowercase" }}>
              x.com/ohmdreams
            </span>
          </div>
        </div>
      </div>

      {divider}

      {/* social proof */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p style={{ fontSize: "15px", fontWeight: 300, lineHeight: 1.7, color: "#8a8a8a", textAlign: "center" }}>
          15 people from our own class already know.<br />
          <span style={{ color: "#f0f0f0" }}>you probably should too.</span>
        </p>
        <p style={{ fontSize: "12px", fontWeight: 300, color: "#444", textAlign: "center", letterSpacing: "0.04em", textTransform: "lowercase" }}>
          details drop 24hrs before. register to find out.
        </p>
      </div>

    </section>
  );
}
