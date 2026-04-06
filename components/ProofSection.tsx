"use client";

export default function ProofSection() {
  return (
    <section style={{
      background: "#F5F0E8",
      color: "#0f0f0f",
      fontFamily: "'Manrope', sans-serif",
    }}>

      {/* section top label */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "28px 40px",
        borderBottom: "1px solid #E0D8CC",
      }}>
        <span style={{ fontSize: "11px", fontWeight: 300, color: "#999", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          what is this
        </span>
        <span style={{ fontSize: "11px", fontWeight: 300, color: "#999", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          ruas, bengaluru
        </span>
      </div>

      {/* main content */}
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "80px 40px 100px",
        display: "flex",
        flexDirection: "column",
        gap: "72px",
      }}>

        {/* the big statement */}
        <div>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            color: "#0f0f0f",
            marginBottom: "32px",
          }}>
            "a no-bullshit 1-hour session on what's actually being built in tech right now."
          </p>
          <p style={{
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: 1.8,
            color: "#666",
            maxWidth: "540px",
          }}>
            no teachers. no slides. no syllabus.<br />
            just the ground reality — what's shipping on github, what's blowing up on twitter, and what people your age are building with ai tools right now.
          </p>
        </div>

        {/* horizontal rule */}
        <div style={{ height: "1px", background: "#E0D8CC" }} />

        {/* who section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <span style={{ fontSize: "11px", fontWeight: 300, color: "#999", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            who's running it
          </span>

          {/* editorial ID card */}
          <div style={{
            display: "flex",
            gap: "40px",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}>
            {/* left — the omega mark */}
            <div style={{
              width: "80px",
              height: "80px",
              background: "#0f0f0f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "40px",
                fontWeight: 900,
                color: "#E8FF47",
                lineHeight: 1,
              }}>Ω</span>
            </div>

            {/* right — credentials */}
            <div style={{ flex: 1, minWidth: "220px" }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#0f0f0f",
                letterSpacing: "-0.02em",
                marginBottom: "8px",
              }}>
                Om Mishra
              </div>
              <div style={{
                fontSize: "13px",
                fontWeight: 300,
                color: "#888",
                lineHeight: 1.8,
                letterSpacing: "0.02em",
              }}>
                CSE · Ramaiah University of Applied Sciences<br />
                x.com/ohmdreams
              </div>
            </div>
          </div>
        </div>

        {/* horizontal rule */}
        <div style={{ height: "1px", background: "#E0D8CC" }} />

        {/* social proof + CTA row */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "40px",
          flexWrap: "wrap",
        }}>
          <div>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(22px, 3.5vw, 34px)",
              fontWeight: 400,
              color: "#0f0f0f",
              lineHeight: 1.3,
              marginBottom: "12px",
            }}>
              15 people from our class<br />already know.
            </p>
            <p style={{
              fontSize: "13px",
              fontWeight: 300,
              color: "#999",
              letterSpacing: "0.04em",
            }}>
              details drop 24hrs before. register to find out when.
            </p>
          </div>

          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{
              display: "inline-block",
              background: "#0f0f0f",
              color: "#E8FF47",
              padding: "15px 40px",
              fontSize: "12px",
              fontWeight: 700,
              fontFamily: "'Manrope', sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "opacity 0.15s",
              flexShrink: 0,
            }}
            onMouseOver={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseOut={e => (e.currentTarget.style.opacity = "1")}
          >
            register ↑
          </a>
        </div>

      </div>

      {/* footer bar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 40px",
        borderTop: "1px solid #E0D8CC",
      }}>
        <span style={{ fontSize: "11px", fontWeight: 300, color: "#bbb", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          noise&signal
        </span>
        <span style={{ fontSize: "11px", fontWeight: 300, color: "#bbb", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          ohm. © 2026
        </span>
      </div>
    </section>
  );
}
