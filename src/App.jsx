import React from "react";

function CuttimeStarterApp() {
  return (
    <div style={{ 
      backgroundColor: "#0a0a0a", 
      minHeight: "100vh", 
      color: "#9AD8FF", 
      fontFamily: "Arial, sans-serif", 
      padding: "2rem" 
    }}>
      <header style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", margin: 0 }}>✂️ Cuttime</h1>
        <p style={{ color: "#ccc", marginTop: "0.5rem" }}>
          Smart queues for barbers & customers
        </p>
      </header>

      <main style={{ maxWidth: "600px", margin: "0 auto" }}>
        <section style={{ background: "#111", padding: "1.5rem", borderRadius: "12px", marginBottom: "2rem" }}>
          <h2 style={{ color: "#9AD8FF" }}>Pro (per barber)</h2>
          <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "0.5rem 0" }}>
            £20<span style={{ fontSize: "1rem", color: "#9AD8FF" }}>/mo</span>
          </p>
          <ul style={{ color: "#ccc" }}>
            <li>Per-barber billing (£20/mo each)</li>
            <li>Per-barber queues & ETAs</li>
            <li>"Available now" & Day Off</li>
            <li>Realtime updates</li>
          </ul>
          <a 
            href="https://buy.stripe.com/test_XXXXXX" 
            style={{ 
              display: "inline-block", 
              background: "#0066FF", 
              color: "white", 
              padding: "0.75rem 1.5rem", 
              borderRadius: "8px", 
              textDecoration: "none", 
              marginTop: "1rem" 
            }}
          >
            Subscribe £20/mo
          </a>
        </section>

        <section style={{ background: "#111", padding: "1.5rem", borderRadius: "12px" }}>
          <h3 style={{ color: "#9AD8FF" }}>Next steps</h3>
          <ul style={{ color: "#ccc" }}>
            <li>Replace Payment Link with your live Stripe URL (set £20/mo, GBP)</li>
            <li>Connect to backend for real auth and per-barber seat counts</li>
            <li>Auto-enforce billing: only paid barbers can use the dashboard</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default CuttimeStarterApp;
REPLACE_WITH_APP_CODE