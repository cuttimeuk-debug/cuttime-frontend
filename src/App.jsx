import React from "react";

function CuttimeStarterApp() {
  return (
    <div style={{
      background: "linear-gradient(180deg, #0a0a0a, #001a33)",
      minHeight: "100vh",
      color: "#f0f8ff",
      fontFamily: "Arial, sans-serif",
      padding: "2rem"
    }}>
      {/* Header */}
     <header style={{ marginBottom: "3rem", textAlign: "center" }}>
  <img
    src="/logo.svg"   // change to "/logo.png" if that's your file
    alt="Cuttime"
    style={{
      height: 64,
      width: "auto",
      display: "block",
      margin: "0 auto 0.5rem"
    }}
  />
  <p style={{ fontSize: "1.1rem", color: "#9AD8FF", marginTop: "0.5rem" }}>
    Smart queues for barbers & customers
  </p>
</header>


      {/* Main content */}
      <main style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
        {/* Barbers Section */}
        <section style={{
          background: "#111",
          padding: "2rem",
          borderRadius: "12px",
          width: "300px",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0,0,0,0.5)"
        }}>
          <h2 style={{ color: "#9AD8FF" }}>For Barbers</h2>
          <p>Manage queues, let customers know your wait times, and grow your shop.</p>
          <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "1rem 0" }}>
            £20<span style={{ fontSize: "1rem" }}>/mo</span>
          </p>
          <a
            href="#"
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
            Sign Up
          </a>
        </section>

        {/* Customers Section */}
        <section style={{
          background: "#111",
          padding: "2rem",
          borderRadius: "12px",
          width: "300px",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0,0,0,0.5)"
        }}>
          <h2 style={{ color: "#9AD8FF" }}>For Customers</h2>
          <p>See how many people are waiting for your barber and the next available time.</p>
          <a
            href="#"
            style={{
              display: "inline-block",
              background: "#00CC66",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              marginTop: "2rem"
            }}
          >
            Find a Barber
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ textAlign: "center", marginTop: "4rem", color: "#777" }}>
        © {new Date().getFullYear()} Cuttime. All rights reserved.
      </footer>
    </div>
  );
}

export default CuttimeStarterApp;


