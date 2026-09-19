import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // ================= MILK RECORDS =================

  const [milkRecords] = useState(() => {
    return JSON.parse(localStorage.getItem("milkRecords")) || [];
  });

  // Logged-in Farmer Mobile
  const loggedInFarmerMobile =
    localStorage.getItem("loggedInFarmerMobile");

  // ================= MY FARMER RECORDS =================

  const myMilkRecords = milkRecords.filter(
    (record) =>
      record.farmerMobile === loggedInFarmerMobile
  );

  // ================= TOTAL MILK =================

  const totalMilk = myMilkRecords.reduce(
    (total, record) =>
      total + Number(record.quantity || 0),
    0
  );

  // ================= TOTAL EARNING =================

  const totalAmount = myMilkRecords.reduce(
    (total, record) =>
      total + Number(record.amount || 0),
    0
  );

  // ================= MORNING MILK =================

  const morningMilk = myMilkRecords
    .filter(
      (record) => record.session === "Morning"
    )
    .reduce(
      (total, record) =>
        total + Number(record.quantity || 0),
      0
    );

  // ================= EVENING MILK =================

  const eveningMilk = myMilkRecords
    .filter(
      (record) => record.session === "Evening"
    )
    .reduce(
      (total, record) =>
        total + Number(record.quantity || 0),
      0
    );

  // ================= MILK ENTRIES =================

  const totalMilkEntries = myMilkRecords.length;

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem("loggedInFarmerMobile");
    navigate("/");
  };

  return (
    <div className="dashboard-page">

      {/* ================= NAVBAR ================= */}

      <nav className="dashboard-navbar">

        <div className="dashboard-logo">
          🐄 <span>Smart Dairy & Farm</span>
        </div>

        <div className="dashboard-nav-links">

          <button
            onClick={() =>
              navigate("/farmer/profile")
            }
          >
            👤 Profile
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>

        </div>
      </nav>


      {/* ================= MAIN ================= */}

      <main className="dashboard-main">

        {/* ================= WELCOME ================= */}

        <section className="dashboard-welcome">

          <div className="welcome-content">

            <span className="welcome-badge">
              🌱 Smart Farm Management
            </span>

            <h1>
              Welcome to Smart Dairy & Farm
            </h1>

            <h2>
              Farmer Dashboard
            </h2>

            <p>
              Manage your dairy, cows, feed,
              finances and AI insights from one place.
            </p>

          </div>

          <div className="welcome-cow">
            🐄
          </div>

        </section>


        {/* ================================================= */}
        {/*                 DAIRY MILK SUMMARY                */}
        {/* ================================================= */}

        <section className="dashboard-card">

          <div className="dashboard-card-heading">

            <div>

              <h2>
                🥛 Dairy Milk Summary
              </h2>

              <p>
                Your milk collection from Dairy
              </p>

            </div>

          </div>


          {/* ================= SUMMARY GRID ================= */}

          <div className="milk-summary-grid">

            {/* TOTAL MILK */}

            <div className="milk-summary-box">

              <span>
                🥛
              </span>

              <h3>
                Total Milk
              </h3>

              <strong>
                {totalMilk.toFixed(2)} L
              </strong>

              <small>
                My milk collection
              </small>

            </div>


            {/* MORNING MILK */}

            <div className="milk-summary-box">

              <span>
                🌅
              </span>

              <h3>
                Morning Milk
              </h3>

              <strong>
                {morningMilk.toFixed(2)} L
              </strong>

              <small>
                My morning collection
              </small>

            </div>


            {/* EVENING MILK */}

            <div className="milk-summary-box">

              <span>
                🌇
              </span>

              <h3>
                Evening Milk
              </h3>

              <strong>
                {eveningMilk.toFixed(2)} L
              </strong>

              <small>
                My evening collection
              </small>

            </div>


            {/* TOTAL EARNING */}

            <div className="milk-summary-box">

              <span>
                💰
              </span>

              <h3>
                Total Earning
              </h3>

              <strong>
                ₹{totalAmount.toFixed(2)}
              </strong>

              <small>
                My milk amount
              </small>

            </div>

          </div>


          {/* ================= EXTRA MILK INFO ================= */}

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#f8fafc",
              borderRadius: "12px",
              textAlign: "center",
              color: "#546e7a",
            }}
          >
            <strong>
              📋 Total Milk Entries: {totalMilkEntries}
            </strong>
          </div>


          {/* ================= VIEW MILK ================= */}

          <button
            className="view-milk-btn"
            onClick={() =>
              navigate("/farmer/ViewMilkCollection")
            }
          >
            View Milk Collection →
          </button>

        </section>


        {/* ================================================= */}
        {/*                  FARM MANAGEMENT                  */}
        {/* ================================================= */}

        <section className="dashboard-card">

          <div className="dashboard-card-heading">

            <div>

              <h2>
                🐄 Farm Management
              </h2>

              <p>
                Manage cows, feed, finances and reports.
              </p>

            </div>

          </div>


          <div className="module-grid">

            {/* COW MANAGEMENT */}

            <button
              className="module-card"
              onClick={() =>
                navigate("/farmer/cows")
              }
            >

              <span>
                🐄
              </span>

              <strong>
                Cow Management
              </strong>

              <small>
                Manage cow records and health
              </small>

            </button>


            {/* FEED MANAGEMENT */}

            <button
              className="module-card"
              onClick={() =>
                navigate("/farmer/Feed")
              }
            >

              <span>
                🌾
              </span>

              <strong>
                Feed Management
              </strong>

              <small>
                Manage feed stock and usage
              </small>

            </button>


            {/* FINANCIAL MANAGEMENT */}

            <button
              className="module-card"
              onClick={() =>
                navigate("/farmer/financial")
              }
            >

              <span>
                💰
              </span>

              <strong>
                Financial Management
              </strong>

              <small>
                Manage income and expenses
              </small>

            </button>


            {/* REPORTS */}

            <button
              className="module-card"
              onClick={() =>
                navigate("/farmer/reports")
              }
            >

              <span>
                📊
              </span>

              <strong>
                Reports
              </strong>

              <small>
                View farm performance reports
              </small>

            </button>

          </div>

        </section>


        {/* ================================================= */}
        {/*                       AI                          */}
        {/* ================================================= */}

        <section className="dashboard-ai-card">

          <div className="ai-dashboard-icon">
            🤖
          </div>

          <div className="ai-dashboard-content">

            <span>
              AI POWERED
            </span>

            <h2>
              Smart Dairy AI Assistant
            </h2>

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


        {/* ================================================= */}
        {/*                      FOOTER                       */}
        {/* ================================================= */}

        <footer className="dashboard-footer">

          <strong>
            🐄 Smart Dairy & Farmer Farm Management System
          </strong>

          <p>
            Manage • Analyze • Improve Your Farm
          </p>

          <small>
            © 2026 Smart Dairy
          </small>

        </footer>

      </main>

    </div>
  );
}

export default Dashboard;