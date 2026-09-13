import { useNavigate } from "react-router-dom";

import "./DairyDashboard.css";

function DairyDashboard() {
    const navigate = useNavigate();
  return (
    <div className="dairy-page">

      {/* Navbar */}
      
      <nav className="dairy-navbar">
        <div className="dashboard-logo">
          🐄 <span>Smart Dairy Management</span>
        </div>
        <div className="dairy-nav-links">
  
  <button onClick={() => navigate("/dairy/Farmers")}>
    👨‍🌾 Farmers
  </button>

  <button onClick={() => navigate("/dairy/milkcollection")}>
    🥛 Milk Collection
  </button>

  <button onClick={() => navigate("/dairy/payments")}>
    💰 Payments
  </button>

  <button onClick={() => navigate("/dairy/DailyReports")}>
    📊 Reports
  </button>
  <button
  className="logout-btn"
  onClick={() => navigate("/")}
>
  🚪 Logout
</button>
</div>
      </nav>

      <main className="dairy-main">

        {/* Welcome Header */}
        <section className="dairy-welcome">
          <div>
            <span className="dairy-badge">
              🥛 COLLECTION CENTER
            </span>

            <h1>Welcome to Dairy Dashboard</h1>

            <p>
              Manage farmers, milk collection, payments and dairy reports
              from one place.
            </p>
          </div>

          <div className="dairy-welcome-icon">
            🥛
          </div>
        </section>

        

        {/* Dairy Management */}
        <section className="dairy-card">

          <div className="dairy-card-heading">
            <div>
              <h2>🥛 Dairy Management</h2>
              <p>Manage daily collection center activities.</p>
            </div>
          </div>

          <div className="dairy-module-grid">
            





            <button
             className="dairy-module-card"
             onClick={() => navigate("/dairy/Farmers")}
              >
  <span>👨‍🌾</span>
  <strong>Farmer Management</strong>
  <small>View and manage farmer records</small>
                 </button>

            <button
  className="dairy-module-card"
  onClick={() => navigate("/dairy/milkcollection")}>
  <span>🥛</span>
  <strong>Milk Collection</strong>
  <small>Record daily farmer milk</small>
</button>

            <button className="dairy-module-card" onClick={() => navigate("/dairy/milk-verification")}>
              <span>✅</span>
              <strong>Milk Verification</strong>
              <small>Verify pending milk entries</small>
            </button>

            <button
  className="dairy-module-card"
  onClick={() => navigate("/dairy/payments")}
>
  <span>💰</span>
  <strong>Payment Management</strong>
  <small>Manage farmer payments</small>
</button>
            <button
  className="dairy-module-card"
  onClick={() => navigate("/dairy/DailyReports")}
>
  <span>📊</span>
  <strong>Dairy Reports</strong>
  <small>View collection reports</small>
</button>

            <button className="dairy-module-card" onClick={() => navigate("/dairy/center-settings")}>
              <span>⚙️</span>
              <strong>Center Settings</strong>
              <small>Manage collection center</small>
            </button>

          </div>

        </section>

        {/* Information Card */}
        <section className="dairy-info-card">
          <div className="dairy-info-icon">💡</div>

          <div>
            <span>SMART DAIRY SYSTEM</span>
            <h2>Manage Your Collection Center Smarter</h2>
            <p>
              Keep farmer records organized, verify milk entries and
              manage payments efficiently.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="dairy-footer">
          <strong>
            🥛 Smart Dairy & Farmer Farm Management System
          </strong>

          <p>
            Collect • Verify • Manage • Improve
          </p>

          <small>© 2026 Smart Dairy</small>
        </footer>

      </main>
    </div>
  );
}

export default DairyDashboard;