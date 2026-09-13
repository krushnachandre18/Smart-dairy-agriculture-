import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [milkRecords, setMilkRecords] = useState([]);

  useEffect(() => {
    const records =
      JSON.parse(localStorage.getItem("milkRecords")) || [];

    const loggedInFarmerMobile = localStorage.getItem(
      "loggedInFarmerMobile"
    );

    const farmerRecords = records.filter(
      (record) =>
        record.farmerMobile === loggedInFarmerMobile
    );

    setMilkRecords(farmerRecords);
  }, []);

  const totalMilk = milkRecords.reduce(
    (total, record) =>
      total + Number(record.quantity || 0),
    0
  );

  const totalAmount = milkRecords.reduce(
    (total, record) =>
      total + Number(record.amount || 0),
    0
  );

  const morningMilk = milkRecords
    .filter((record) => record.session === "Morning")
    .reduce(
      (total, record) =>
        total + Number(record.quantity || 0),
      0
    );

  const eveningMilk = milkRecords
    .filter((record) => record.session === "Evening")
    .reduce(
      (total, record) =>
        total + Number(record.quantity || 0),
      0
    );

  return (
    <div className="dashboard-page">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="dashboard-logo">
          🐄 <span>Smart Dairy & Farm</span>
        </div>

        <div className="dashboard-nav-links">
          <button
            onClick={() =>
              navigate("/farmer/milkcollection")
            }
          >
            🥛 Milk
          </button>

          <button
            onClick={() => navigate("/farmer/cows")}
          >
            🐄 Cows
          </button>

          <button
            onClick={() => navigate("/farmer/Feed")}
          >
            🌾 Feed
          </button>

          <button
            onClick={() => navigate("/farmer/financial")}
          >
            💰 Finance
          </button>

          <button
            onClick={() => navigate("/farmer/reports")}
          >
            📊 Reports
          </button>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem(
                "loggedInFarmerMobile"
              );
              navigate("/");
            }}
          >
            🚪 Logout
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="dashboard-main">
        {/* Welcome */}
        <section className="dashboard-welcome">
          <div className="welcome-content">
            <span className="welcome-badge">
              🌱 Smart Farm Management
            </span>

            <h1>Welcome to Smart Dairy & Farm</h1>

            <h2>Farmer Dashboard</h2>

            <p>
              Manage your dairy, cows, feed, finances and
              AI insights from one place.
            </p>
          </div>

          <div className="welcome-cow">🐄</div>
        </section>

        {/* Dairy Milk Summary */}
        <section className="dashboard-card">
          <div className="dashboard-card-heading">
            <div>
              <h2>🥛 Dairy Milk Summary</h2>
              
            </div>
          </div>

          <div className="milk-summary-grid">
            <div className="milk-summary-box">
              <span>🥛</span>
              <h3>Total Milk</h3>
              <strong>{totalMilk.toFixed(2)} L</strong>
              <small>All milk collection</small>
            </div>

            <div className="milk-summary-box">
              <span>🌅</span>
              <h3>Morning Milk</h3>
              <strong>{morningMilk.toFixed(2)} L</strong>
              <small>Morning collection</small>
            </div>

            <div className="milk-summary-box">
              <span>🌇</span>
              <h3>Evening Milk</h3>
              <strong>{eveningMilk.toFixed(2)} L</strong>
              <small>Evening collection</small>
            </div>

            <div className="milk-summary-box">
              <span>💰</span>
              <h3>Total Earning</h3>
              <strong>₹{totalAmount.toFixed(2)}</strong>
              <small>Milk amount</small>
            </div>
          </div>

          <button
            className="view-milk-btn"
            onClick={() =>
              navigate("/farmer/ViewMilkCollection")
            }
          >
            View Milk Collection →
          </button>
        </section>

        {/* Recent Milk Records */}
        <section className="dashboard-card">
          <div className="dashboard-card-heading">
            <div>
              <h2>📋 Recent Milk Records</h2>
              <p>Your latest milk entries.</p>
            </div>
          </div>

          {milkRecords.length === 0 ? (
            <p className="empty-milk-message">
              No milk records added yet. Please add milk
            </p>
          ) : (
            <div className="milk-table-wrapper">
              <table className="milk-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Session</th>
                    <th>Quantity</th>
                    <th>Fat</th>
                    <th>SNF</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {milkRecords
                    .slice()
                    .reverse()
                    .slice(0, 5)
                    .map((record) => (
                      <tr key={record.id}>
                        <td>{record.date}</td>
                        <td>{record.session}</td>
                        <td>
                          {Number(record.quantity || 0)} L
                        </td>
                        <td>{record.fat}</td>
                        <td>{record.snf}</td>
                        <td>
                          ₹
                          {Number(
                            record.amount || 0
                          ).toFixed(2)}
                        </td>
                        <td>
                          <span className="milk-status">
                            {record.status || "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Farm */}
        <section className="dashboard-card">
          <div className="dashboard-card-heading">
            <div>
              <h2>🐄 Farm Management</h2>
              <p>
                Manage cows, feed, finances and reports.
              </p>
            </div>
          </div>

          <div className="module-grid">
            <button
              className="module-card"
              onClick={() =>
                navigate("/farmer/cows")
              }
            >
              <span>🐄</span>
              <strong>Cow Management</strong>
              <small>
                Manage cow records and health
              </small>
            </button>

            <button
              className="module-card"
              onClick={() =>
                navigate("/farmer/Feed")
              }
            >
              <span>🌾</span>
              <strong>Feed Management</strong>
              <small>
                Manage feed stock and usage
              </small>
            </button>

            <button
              className="module-card"
              onClick={() =>
                navigate("/farmer/financial")
              }
            >
              <span>💰</span>
              <strong>Financial Management</strong>
              <small>
                Manage income and expenses
              </small>
            </button>

            <button
              className="module-card"
              onClick={() =>
                navigate("/farmer/reports")
              }
            >
              <span>📊</span>
              <strong>Reports</strong>
              <small>
                View farm performance reports
              </small>
            </button>
          </div>
        </section>

        {/* AI */}
        <section className="dashboard-ai-card">
          <div className="ai-dashboard-icon">🤖</div>

          <div className="ai-dashboard-content">
            <span>AI POWERED</span>

            <h2>Smart Dairy AI Assistant</h2>

            <p>
              Get intelligent insights about milk
              production, expenses, profit and unusual
              milk readings.
            </p>

            <button
              onClick={() =>
                navigate("/farmer/ai-chatbot")
              }
            >
              Open AI Assistant →
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="dashboard-footer">
          <strong>
            🐄 Smart Dairy & Farmer Farm Management System
          </strong>

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