import React, { useEffect, useState } from "react";

/**
 * Cuttime – Starter Webapp
 * - Theme: black + electric blue
 * - Logo included (inline SVG)
 * - Barber signup/login (localStorage auth for demo)
 * - Pricing + Payments (Stripe Payment Link ready)
 * - Customer View (public) placeholder
 *
 * How to use:
 * 1) Drop this file into your React app (or preview in the canvas).
 * 2) Set STRIPE_PAYMENT_LINK below (Payment Links or Checkout URL).
 * 3) Click "Subscribe" after sign-up to test the flow.
 *
 * Later: swap localStorage auth for real backend (Next.js/Express) & Stripe Checkout Sessions.
 */

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_XXXXXXXX"; // <-- replace with your Stripe Payment Link

export default function CuttimeStarterApp() {
  const [view, setView] = useState("home"); // home | login | signup | dashboard | customer
  const [auth, setAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ct_auth") || "null");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    document.documentElement.classList.add("h-full");
    document.body.classList.add("h-full", "m-0");
  }, []);

  function onLogin(email, password) {
    const users = JSON.parse(localStorage.getItem("ct_users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid credentials");
    localStorage.setItem("ct_auth", JSON.stringify(user));
    setAuth(user);
    setView("dashboard");
  }

  function onSignup(payload) {
    const users = JSON.parse(localStorage.getItem("ct_users") || "[]");
    if (users.some((u) => u.email === payload.email))
      throw new Error("Email already exists");
    const user = { id: Date.now(), ...payload, subscribed: false };
    users.push(user);
    localStorage.setItem("ct_users", JSON.stringify(users));
    localStorage.setItem("ct_auth", JSON.stringify(user));
    setAuth(user);
    setView("dashboard");
  }

  function logout() {
    localStorage.removeItem("ct_auth");
    setAuth(null);
    setView("home");
  }

  function markSubscribed() {
    if (!auth) return;
    const users = JSON.parse(localStorage.getItem("ct_users") || "[]");
    const updated = users.map((u) =>
      u.id === auth.id ? { ...u, subscribed: true } : u
    );
    localStorage.setItem("ct_users", JSON.stringify(updated));
    const me = updated.find((u) => u.id === auth.id);
    localStorage.setItem("ct_auth", JSON.stringify(me));
    setAuth(me);
  }

  return (
    <div style={styles.app}>
      <NavBar auth={auth} setView={setView} onLogout={logout} />

      {view === "home" && <Hero setView={setView} />}
      {view === "customer" && <CustomerPreview />}
      {view === "login" && <LoginForm onSubmit={onLogin} />}
      {view === "signup" && <SignupForm onSubmit={onSignup} />}
      {view === "dashboard" && auth && (
        <Dashboard auth={auth} onSubscribe={markSubscribed} />
      )}

      <Footer />
    </div>
  );
}

/* ---------------- UI Components ---------------- */

function Logo({ size = 28, withWord = true }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="32" cy="32" r="30" stroke="#56CCF2" strokeWidth="4" />
        {/* clock hands */}
        <line
          x1="32"
          y1="32"
          x2="32"
          y2="18"
          stroke="#56CCF2"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="32"
          y1="32"
          x2="44"
          y2="32"
          stroke="#56CCF2"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* scissor handle dots */}
        <circle cx="22" cy="46" r="4" stroke="#56CCF2" strokeWidth="3" />
        <circle cx="42" cy="46" r="4" stroke="#56CCF2" strokeWidth="3" />
        {/* scissor blades */}
        <line
          x1="28"
          y1="40"
          x2="12"
          y2="24"
          stroke="#56CCF2"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="36"
          y1="40"
          x2="52"
          y2="24"
          stroke="#56CCF2"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      {withWord && (
        <span
          style={{
            color: "#E6F7FF",
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: 0.5,
          }}
        >
          Cuttime
        </span>
      )}
    </div>
  );
}

function NavBar({ auth, setView, onLogout }) {
  return (
    <div style={styles.nav}>
      <div onClick={() => setView("home")} style={{ cursor: "pointer" }}>
        <Logo size={26} />
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <NavButton onClick={() => setView("customer")}>Customer View</NavButton>
        {!auth && <NavButton onClick={() => setView("login")}>Login</NavButton>}
        {!auth && (
          <NavButton onClick={() => setView("signup")} variant="primary">
            Get Started
          </NavButton>
        )}
        {auth && (
          <NavButton onClick={() => setView("dashboard")} variant="primary">
            Dashboard
          </NavButton>
        )}
        {auth && <NavButton onClick={onLogout}>Logout</NavButton>}
      </div>
    </div>
  );
}

function Hero({ setView }) {
  return (
    <section style={styles.hero}>
      <Logo size={48} />
      <h1 style={styles.h1}>No more waiting at the barbers.</h1>
      <p style={styles.lead}>
        Live queues, "Available now" badges, and per-barber ETAs. Built for
        walk-ins.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
        <CTAButton onClick={() => setView("signup")}>Get Started</CTAButton>
        <GhostButton onClick={() => setView("customer")}>
          See Customer View
        </GhostButton>
      </div>
      <PricingCard onClick={() => setView("signup")} />
    </section>
  );
}

function PricingCard({ onClick }) {
  return (
    <div style={styles.pricingCard}>
      <h3 style={{ margin: 0, color: "#E6F7FF" }}>Pro (per barber)</h3>
      <p style={{ margin: "6px 0", color: "#9AD8FF" }}>
        Everything you need for walk-ins
      </p>
      <div style={{ fontSize: 32, fontWeight: 800, color: "#56CCF2" }}>
        £20
        <span style={{ fontSize: 16, color: "#9AD8FF" }}>/mo</span>
      </div>
      <ul style={styles.list}>
        <li>Per-barber billing (£20/mo each)</li>
        <li>Per-barber queues & ETAs</li>
        <li>"Available now" & Day Off</li>
        <li>Realtime updates</li>
      </ul>
      <CTAButton onClick={onClick}>Subscribe £20/mo</CTAButton>
    </div>
  );
}

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  return (
    <section style={styles.authCard}>
      <Logo size={36} />
      <h2 style={styles.h2}>Barber Login</h2>
      <input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {err && <div style={styles.err}>{err}</div>}
      <CTAButton
        onClick={() => {
          try {
            onSubmit(email, password);
          } catch (e) {
            setErr(e.message);
          }
        }}
      >
        Login
      </CTAButton>
    </section>
  );
}
function SignupForm({ onSubmit }) {
  const [shop, setShop] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  return (
    <section style={styles.authCard}>
      <Logo size={36} />
      <h2 style={styles.h2}>Create your shop account</h2>
      <input
        style={styles.input}
        placeholder="Shop name"
        value={shop}
        onChange={(e) => setShop(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Your display name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {err && <div style={styles.err}>{err}</div>}
      <CTAButton
        onClick={() => {
          if (!shop || !name || !email || !password) {
            setErr("Please fill all fields");
            return;
          }
          try {
            onSubmit({ shop, name, email, password });
          } catch (e) {
            setErr(e.message);
          }
        }}
      >
        Create Account
      </CTAButton>
    </section>
  );
}

function Dashboard({ auth, onSubscribe }) {
  return (
    <section style={styles.dashboard}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div>
          <h2 style={styles.h2}>
            Welcome,{" "}
            <span style={{ color: "#56CCF2" }}>
              {auth.name || "Barber"}
            </span>
          </h2>
          <p style={{ color: "#9AD8FF", marginTop: 6 }}>
            Shop: {auth.shop}
          </p>
        </div>
        <Logo size={40} withWord={false} />
      </div>

      <div style={styles.cardRow}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Subscription</h3>
          <p style={styles.cardText}>
            {auth.subscribed ? "Active – Thank you!" : "Not active"}
          </p>
          {!auth.subscribed ? (
            <div style={{ display: "flex", gap: 12 }}>
              <a
                href={STRIPE_PAYMENT_LINK}
                target="_blank"
                rel="noreferrer"
              >
                <CTAButton>Subscribe £20/mo</CTAButton>
              </a>
              <GhostButton onClick={onSubscribe}>
                Mark as Subscribed (demo)
              </GhostButton>
            </div>
          ) : (
            <span style={styles.badge}>PRO</span>
          )}
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Services</h3>
          <p style={styles.cardText}>
            Add Haircut (30m), Beard Trim (20m), Both (45m) and your own
            timings.
          </p>
          <GhostButton
            onClick={() =>
              alert("Service manager coming next – hook to backend.")
            }
          >
            Manage Services
          </GhostButton>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Queue</h3>
          <p style={styles.cardText}>
            Use +1 to add walk-ins, toggle Day Off, and finish current.
          </p>
          <GhostButton
            onClick={() =>
              alert("Queue dashboard coming next – hook to backend.")
            }
          >
            Open Queue
          </GhostButton>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <h3 style={styles.cardTitle}>Next steps</h3>
        <ul style={styles.list}>
          <li>Replace Payment Link with your live Stripe URL (£20/mo, GBP)</li>
          <li>Connect to backend for real auth and per-barber seat counts</li>
          <li>Auto-enforce billing: only paid barbers can use the dashboard</li>
        </ul>
      </div>
    </section>
  );
}
function CustomerPreview() {
  const rows = [
    { name: "Barber 1", waiting: 0, total: 0, off: false },
    { name: "Barber 2", waiting: 2, total: 50, off: false },
    { name: "Barber 3", waiting: 0, total: 0, off: true },
  ];
  return (
    <section style={styles.customer}>
      <h2 style={styles.h2}>Live Queue</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {rows.map((b, i) => (
          <div
            key={i}
            style={{ ...styles.row, opacity: b.off ? 0.6 : 1 }}
          >
            <div style={styles.rowLeft}>{b.name}</div>
            <div style={styles.rowMid}>
              {b.waiting} waiting{" "}
              {b.waiting ? (
                <span style={{ color: "#9AD8FF" }}> · ~{b.total} mins</span>
              ) : null}
            </div>
            <div style={styles.rowRight}>
              {b.off ? (
                <span style={badge("#FCA5A5", "#7F1D1D")}>Off today</span>
              ) : b.waiting === 0 ? (
                <span style={badge("#A7F3D0", "#064E3B")}>
                  Available now
                </span>
              ) : (
                <span>Next: 14:30</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={{ opacity: 0.9 }}>
        <Logo size={20} />
      </div>
      <div style={{ color: "#9AD8FF" }}>
        © {new Date().getFullYear()} Cuttime. All rights reserved.
      </div>
    </footer>
  );
}

/* ---------------- Style System ---------------- */

const styles = {
  app: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0B1020 0%, #060913 80%)",
    color: "#E6F7FF",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
    display: "flex",
    flexDirection: "column",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 18px",
    borderBottom: "1px solid rgba(86,204,242,0.15)",
    position: "sticky",
    top: 0,
    backdropFilter: "blur(6px)",
    background: "rgba(6,9,19,0.6)",
    zIndex: 10,
  },
  hero: {
    padding: 24,
    maxWidth: 980,
    margin: "24px auto",
    textAlign: "center",
  },
  h1: {
    margin: "16px 0 8px",
    fontSize: 40,
    lineHeight: 1.1,
  },
  h2: {
    margin: "8px 0 8px",
    fontSize: 24,
  },
  lead: { color: "#9AD8FF", maxWidth: 720, margin: "0 auto" },
  pricingCard: {
    margin: "32px auto 0",
    maxWidth: 420,
    border: "1px solid rgba(86,204,242,0.2)",
    borderRadius: 16,
    padding: 18,
    background:
      "linear-gradient(180deg, rgba(13,25,43,0.7), rgba(8,14,26,0.9))",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },
  authCard: {
    margin: "24px auto",
    maxWidth: 520,
    border: "1px solid rgba(86,204,242,0.2)",
    borderRadius: 16,
    padding: 18,
    background:
      "linear-gradient(180deg, rgba(13,25,43,0.6), rgba(8,14,26,0.85))",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid rgba(86,204,242,0.25)",
    background: "#0D1A2B",
    color: "#E6F7FF",
    outline: "none",
    margin: "6px 0",
  },
  err: {
    color: "#FCA5A5",
    background: "#2A0F16",
    borderRadius: 8,
    padding: "8px 10px",
    width: "100%",
    margin: "4px 0 8px",
  },
  dashboard: { maxWidth: 1000, margin: "24px auto", padding: 18 },
  cardRow: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  },
  card: {
    border: "1px solid rgba(86,204,242,0.2)",
    borderRadius: 16,
    padding: 16,
    background:
      "linear-gradient(180deg, rgba(13,25,43,0.6), rgba(8,14,26,0.85))",
    minHeight: 140,
  },
  cardTitle: { margin: 0, fontWeight: 700, color: "#E6F7FF" },
  cardText: { color: "#9AD8FF" },
  badge: {
    background: "#A7F3D0",
    color: "#064E3B",
    fontWeight: 700,
    padding: "6px 10px",
    borderRadius: 999,
    display: "inline-block",
  },
  customer: { maxWidth: 900, margin: "24px auto", padding: 18 },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr auto auto",
    gap: 12,
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid rgba(86,204,242,0.15)",
  },
  rowLeft: { fontWeight: 700 },
  rowMid: { color: "#E6F7FF" },
  rowRight: { justifySelf: "end" },
  footer: {
    marginTop: "auto",
    padding: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid rgba(86,204,242,0.15)",
  },
  list: { color: "#CDEFFF", lineHeight: 1.8 },
};

function NavButton({ children, onClick, variant }) {
  const base = {
    padding: "10px 14px",
    borderRadius: 12,
    cursor: "pointer",
    border: "1px solid rgba(86,204,242,0.25)",
    background:
      variant === "primary"
        ? "linear-gradient(180deg, #1F3A8A, #13244F)"
        : "#0D1A2B",
    color: "#E6F7FF",
    boxShadow:
      variant === "primary" ? "0 8px 20px rgba(19,36,79,0.6)" : "none",
  };
  return (
    <button onClick={onClick} style={base}>
      {children}
    </button>
  );
}

function CTAButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 18px",
        borderRadius: 14,
        border: "1px solid rgba(86,204,242,0.3)",
        background: "linear-gradient(180deg, #2563EB, #0EA5E9)",
        color: "#E6F7FF",
        fontWeight: 800,
        letterSpacing: 0.3,
        boxShadow: "0 10px 25px rgba(14,165,233,0.35)",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 18px",
        borderRadius: 14,
        border: "1px solid rgba(86,204,242,0.3)",
        background: "transparent",
        color: "#9AD8FF",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function badge(bg, fg) {
  return {
    background: bg,
    color: fg,
    padding: "6px 10px",
    borderRadius: 999,
    fontWeight: 800,
  };
}

