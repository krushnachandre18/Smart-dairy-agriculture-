import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DairyDashboard.css";


function DairyDashboard() {

  const navigate = useNavigate();

  const [centerSettings, setCenterSettings] = useState({
    centerName: "",
    inchargeName: "",
    mobile: "",
    village: "",
    address: "",
    milkRate: ""
  });
  const [dashboardStats, setDashboardStats] = useState({
  totalFarmers: 0,
  todayMilk: 0,
  pendingVerification: 0,
  totalPayments: 0
});

useEffect(() => {
  const loadDashboardData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/dairy/dashboard"
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      setDashboardStats({
        totalFarmers: Number(data.totalFarmers || 0),
        todayMilk: Number(data.todayMilk || 0),
        pendingVerification: Number(
          data.pendingVerification || 0
        ),
        totalPayments: Number(
          data.totalPayments || 0
        ),
      });
    } catch (error) {
      console.error(
        "Dairy dashboard API error:",
        error
      );
    }
  };

  loadDashboardData();
}, []);
useEffect(() => {
  const loadCenterSettings = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/center-settings"
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      if (data.settings) {
        setCenterSettings({
          centerName: data.settings.center_name || "",
          inchargeName: data.settings.incharge_name || "",
          mobile: data.settings.mobile || "",
          village: data.settings.village || "",
          address: data.settings.address || "",
          milkRate: data.settings.milk_rate || "",
        });
      }
    } catch (error) {
      console.error(
        "Center settings load error:",
        error
      );
    }
  };

  loadCenterSettings();
}, []);
  
  return (
    <div className="dairy-page">

      {/* Navbar */}
      
      <nav className="dairy-navbar">
        <div className="dashboard-logo">
  🐄{" "}
  <span>
    {centerSettings.centerName ||
      "Smart Dairy Management"}
  </span>
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

            <h1>
  Welcome to{" "}
  {centerSettings.centerName ||
    "Dairy Dashboard"}
</h1>

<p>
  {centerSettings.inchargeName
    ? `Hello ${centerSettings.inchargeName}, manage farmers, milk collection, payments and dairy reports from one place.`
    : "Manage farmers, milk collection, payments and dairy reports from one place."}
</p>
          </div>
<div className="dairy-center-info">

  <div>
    <strong>🏢 Center</strong>
    <span>
      {centerSettings.centerName ||
        "Not Set"}
    </span>
  </div>

  <div>
    <strong>👤 In-charge</strong>
    <span>
      {centerSettings.inchargeName ||
        "Not Set"}
    </span>
  </div>

  <div>
    <strong>📍 Location</strong>
    <span>
      {centerSettings.village ||
        "Not Set"}
    </span>
  </div>

</div>
          <div className="dairy-welcome-icon">
            🥛
          </div>
        </section>

        <section className="dairy-summary-section">

  <div className="dairy-summary-card">
    <div className="summary-icon">
      👨‍🌾
    </div>

    <div>
      <h3>
        {dashboardStats.totalFarmers}
      </h3>

      <p>Total Farmers</p>
    </div>
  </div>


  <div className="dairy-summary-card">
    <div className="summary-icon">
      🥛
    </div>

    <div>
      <h3>
        {dashboardStats.todayMilk.toFixed(2)} L
      </h3>

      <p>Today's Verified Milk</p>
    </div>
  </div>


  <div className="dairy-summary-card">
    <div className="summary-icon">
      ⏳
    </div>

    <div>
      <h3>
        {dashboardStats.pendingVerification}
      </h3>

      <p>Pending Verification</p>
    </div>
  </div>


  <div className="dairy-summary-card">
    <div className="summary-icon">
      💰
    </div>

    <div>
      <h3>
        ₹{dashboardStats.totalPayments.toFixed(2)}
      </h3>

     <p>Total Verified Amount</p>
    </div>
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