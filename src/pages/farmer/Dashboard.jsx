import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
  <div className="dashboard-page">

    {/* Navbar */}
    <nav className="dashboard-navbar">

      <div className="dashboard-logo">
        🐄 <span>Smart Dairy & Farm</span>
      </div>

      <div className="dashboard-nav-links">
        <button onClick={() => navigate("/farmer/milkcollection")}>
          🥛 Milk
        </button>

        <button onClick={() => navigate("/farmer/cows")}>
          🐄 Cows
        </button>

        <button onClick={() => navigate("/farmer/Feed")}>
          🌾 Feed
        </button>

        <button onClick={() => navigate("/farmer/financial")}>
          💰 Finance
        </button>

        <button onClick={() => navigate("/farmer/reports")}>
          📊 Reports
        </button>

        <button
          className="nav-ai-button"
          onClick={() => navigate("/farmer/ai-chatbot")}
        >
          🤖 AI Assistant
        </button>
      </div>

    </nav>

    {/* Main */}
    <main className="dashboard-main">

      {/* Welcome */}
      <section className="dashboard-welcome">

        <div className="welcome-content">
          <span className="welcome-badge">🌱 Smart Farm Management</span>

          <h1>Welcome to Smart Dairy & Farm</h1>

          <h2>Farmer Dashboard</h2>

          <p>
            Manage your dairy, cows, feed, finances and AI insights
            from one place.
          </p>
        </div>

        <div className="welcome-cow">
          🐄
        </div>

      </section>

      {/* Overview */}
      <section className="dashboard-card">

        <div className="dashboard-card-heading">
          <div>
            <h2>📊 Farm Overview</h2>
            <p>Quick view of your current farm activities.</p>
          </div>
        </div>

        <div className="overview-grid">

          <div className="overview-card cows-card">
            <span>🐄</span>
            <div>
              <p>Total Cows</p>
              <h2>12</h2>
            </div>
          </div>

          <div className="overview-card milk-card">
            <span>🥛</span>
            <div>
              <p>Today's Milk</p>
              <h2>85 L</h2>
            </div>
          </div>

          <div className="overview-card feed-card">
            <span>🌾</span>
            <div>
              <p>Today's Feed</p>
              <h2>42 Kg</h2>
            </div>
          </div>

          <div className="overview-card income-card">
            <span>💰</span>
            <div>
              <p>Monthly Income</p>
              <h2>₹42,500</h2>
            </div>
          </div>

        </div>

      </section>

      {/* Dairy */}
      <section className="dashboard-card">

        <div className="dashboard-card-heading">
          <div>
            <h2>🥛 Dairy Management</h2>
            <p>Manage milk collection and dairy payments.</p>
          </div>
        </div>

        <div className="module-grid">

          <button
            className="module-card"
            onClick={() => navigate("/farmer/milkcollection")}
          >
            <span>🥛</span>
            <strong>Milk Collection</strong>
            <small>Record daily milk collection</small>
          </button>

          <button
            className="module-card"
            onClick={() => navigate("/farmer/payments")}
          >
            <span>💰</span>
            <strong>Dairy Payments</strong>
            <small>View milk payment records</small>
          </button>

        </div>

      </section>

      {/* Farm */}
      <section className="dashboard-card">

        <div className="dashboard-card-heading">
          <div>
            <h2>🐄 Farm Management</h2>
            <p>Manage cows, feed, finances and reports.</p>
          </div>
        </div>

        <div className="module-grid">

          <button
            className="module-card"
            onClick={() => navigate("/farmer/cows")}
          >
            <span>🐄</span>
            <strong>Cow Management</strong>
            <small>Manage cow records and health</small>
          </button>

          <button
            className="module-card"
            onClick={() => navigate("/farmer/Feed")}
          >
            <span>🌾</span>
            <strong>Feed Management</strong>
            <small>Manage feed stock and usage</small>
          </button>

          <button
            className="module-card"
            onClick={() => navigate("/farmer/financial")}
          >
            <span>💰</span>
            <strong>Financial Management</strong>
            <small>Manage income and expenses</small>
          </button>

          <button
            className="module-card"
            onClick={() => navigate("/farmer/reports")}
          >
            <span>📊</span>
            <strong>Reports</strong>
            <small>View farm performance reports</small>
          </button>

        </div>

      </section>

      {/* AI */}
      <section className="dashboard-ai-card">

        <div className="ai-dashboard-icon">
          🤖
        </div>

        <div className="ai-dashboard-content">
          <span>AI POWERED</span>

          <h2>Smart Dairy AI Assistant</h2>

          <p>
            Get intelligent insights about milk production,
            expenses, profit and unusual milk readings.
          </p>

          <button
            onClick={() => navigate("/farmer/ai-chatbot")}
          >
            Open AI Assistant →
          </button>
        </div>

      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <strong>🐄 Smart Dairy & Farmer Farm Management System</strong>
        <p>Manage • Analyze • Improve Your Farm</p>
        <small>© 2026 Smart Dairy</small>
      </footer>

    </main>
  </div>
);
}

/* ================= STYLES ================= */

const navButtonStyle = {
  padding: "9px 13px",
  borderRadius: "8px",
  border: "1px solid #d0d7de",
  background: "#ffffff",
  color: "#37474f",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "500",
};

const cardStyle = (background) => ({
  background: background,
  borderRadius: "15px",
  padding: "25px 15px",
  textAlign: "center",
  minHeight: "150px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const sectionStyle = {
  background: "#ffffff",
  borderRadius: "20px",
  padding: "25px",
  marginBottom: "25px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
};

const sectionTitleStyle = {
  color: "#37474f",
  marginBottom: "8px",
};

const descriptionStyle = {
  color: "#78909c",
  marginTop: "5px",
};

const buttonContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  textAlign: "center",
  justifyContent: "center",
  gap: "12px",
  marginTop: "20px",
};

const moduleButtonStyle = {
  padding: "12px 18px",
  border: "1px solid #cfd8dc",
  borderRadius: "10px",
  background: "#ffffff",
  color: "#37474f",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  textAlign: "center",
};

export default Dashboard;