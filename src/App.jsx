import React, { useEffect, useState } from "react";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_XXXXXXXX"; // <-- replace with your Stripe Payment Link

export default function CuttimeStarterApp() {
  const [view, setView] = useState("home"); // home | login | signup | dashboard | customer
  const [auth, setAuth] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ct_auth") || "null"); } catch { return null; }
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
    if (users.some((u) => u.email === payload.email)) throw new Error("Email already exists");
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
    const updated = users.map((u) => (u.id === auth.id ? { ...u, subscribed: true } : u));
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
      <img
        src="/logo.png"
        alt="Cuttime"
        style={{ height: size, width: "auto" }}
      />
      {withWord && (
        <span style={{
          color: "#E6F7FF",
          fontWeight: 800,
          fontSize: 22,
          letterSpacing: 0.5
        }}>
          Cuttime
        </span>
      )}
    </div>
  );
}

/* keep the rest of the components (NavBar, Hero, PricingCard, LoginForm, SignupForm, Dashboard, CustomerPreview, Footer, styles, NavButton, CTAButton, GhostButton, badge) the same as in the prototype you pasted — just replacing Logo with this external-image version */
