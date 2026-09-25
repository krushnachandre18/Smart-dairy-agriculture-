import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

 // ================= LOGGED-IN FARMER =================

const loggedInFarmerMobile =
  localStorage.getItem("loggedInFarmerMobile");

const [loggedInFarmer, setLoggedInFarmer] =
  useState(null);

// ================= LOAD LOGGED-IN FARMER =================

useEffect(() => {
  const loadLoggedInFarmer = async () => {
    try {
      if (!loggedInFarmerMobile) {
        setLoggedInFarmer(null);
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/farmers"
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        setLoggedInFarmer(null);
        return;
      }

      const farmersList = Array.isArray(data.farmers)
        ? data.farmers
        : [];

      const farmer = farmersList.find(
        (item) =>
          String(item.mobile) ===
          String(loggedInFarmerMobile)
      );

      setLoggedInFarmer(farmer || null);

      // Save actual MySQL farmer ID
      if (farmer) {
        localStorage.setItem(
          "loggedInFarmerDbId",
          String(farmer.id)
        );

        localStorage.setItem(
          "loggedInFarmerId",
          farmer.farmer_id
        );
      }
    } catch (error) {
      console.error(
        "Dashboard farmer load error:",
        error
      );

      setLoggedInFarmer(null);
    }
  };

  loadLoggedInFarmer();
}, [loggedInFarmerMobile]);
// ================= MILK RECORDS FROM MYSQL =================

const [milkRecords, setMilkRecords] = useState([]);

useEffect(() => {
  const loadMilkRecords = async () => {
    try {
      if (!loggedInFarmer?.id) {
        setMilkRecords([]);
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/milk-records/${loggedInFarmer.id}`
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        setMilkRecords([]);
        return;
      }

      setMilkRecords(
        Array.isArray(data.records)
          ? data.records
          : []
      );
    } catch (error) {
      console.error(
        "Dashboard milk load error:",
        error
      );

      setMilkRecords([]);
    }
  };

  loadMilkRecords();
}, [loggedInFarmer?.id]);

const myMilkRecords = milkRecords;


// ================= COW RECORDS =================
// ================= COW RECORDS =================
const [myCows, setMyCows] = useState([]);

useEffect(() => {
  const loadCows = async () => {
    try {
      if (!loggedInFarmer?.id) {
        setMyCows([]);
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/cows/${loggedInFarmer.id}`
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        setMyCows([]);
        return;
      }

      setMyCows(
        Array.isArray(data.cows)
          ? data.cows
          : []
      );
    } catch (error) {
      console.error(
        "Dashboard cow load error:",
        error
      );

      setMyCows([]);
    }
  };

  loadCows();
}, [loggedInFarmer?.id]);

const totalCows = myCows.length; 


// ================= VERIFIED MILK RECORDS =================

const verifiedMilkRecords = myMilkRecords.filter(
  (record) =>
    String(record.status).toLowerCase() === "verified"
);

// ================= TOTAL MILK =================

const totalMilk = verifiedMilkRecords.reduce(
  (total, record) =>
    total + Number(record.quantity || 0),
  0
);

// ================= TOTAL EARNING =================

const totalAmount = verifiedMilkRecords.reduce(
  (total, record) =>
    total + Number(record.amount || 0),
  0
);

// ================= MORNING MILK =================

const morningMilk = verifiedMilkRecords
  .filter(
    (record) =>
      String(record.session).toLowerCase() ===
      "morning"
  )
  .reduce(
    (total, record) =>
      total + Number(record.quantity || 0),
    0
  );

// ================= EVENING MILK =================

const eveningMilk = verifiedMilkRecords
  .filter(
    (record) =>
      String(record.session).toLowerCase() ===
      "evening"
  )
  .reduce(
    (total, record) =>
      total + Number(record.quantity || 0),
    0
  );

// ================= MILK ENTRIES =================

const totalMilkEntries =
  verifiedMilkRecords.length;

// ================= PENDING ENTRIES =================

const pendingMilkEntries = myMilkRecords.filter(
  (record) =>
    !record.status ||
    String(record.status).toLowerCase() ===
      "pending"
).length;

// ================= MONTHLY PERFORMANCE =================

const today = new Date();

const currentMonth = today.getMonth() + 1;
const currentYear = today.getFullYear();

const monthlyVerifiedMilkRecords =
  verifiedMilkRecords.filter((record) => {
    const rawDate =
      record.collection_date ||
      record.date;

    if (!rawDate) {
      return false;
    }

    const recordDate = new Date(rawDate);

    if (isNaN(recordDate.getTime())) {
      return false;
    }

    return (
      recordDate.getMonth() + 1 === currentMonth &&
      recordDate.getFullYear() === currentYear
    );
  });
const monthlyMilk = monthlyVerifiedMilkRecords.reduce(
  (total, record) =>
    total + Number(record.quantity || 0),
  0
);

const monthlyEarning =
  monthlyVerifiedMilkRecords.reduce(
    (total, record) =>
      total + Number(record.amount || 0),
    0
  );

const monthlyEntries =
  monthlyVerifiedMilkRecords.length;

const averageMilk =
  monthlyEntries > 0
    ? monthlyMilk / monthlyEntries
    : 0;
// ================= SMART ALERTS =================

const alerts = [];

if (pendingMilkEntries > 0) {
  alerts.push({
    type: "warning",
    icon: "⏳",
    title: "Pending Milk Verification",
    message: `${pendingMilkEntries} milk record(s) are waiting for verification.`,
  });
}

const rejectedMilkEntries = myMilkRecords.filter(
  (record) =>
    String(record.status || "").toLowerCase() === "rejected"
).length;

if (rejectedMilkEntries > 0) {
  alerts.push({
    type: "danger",
    icon: "❌",
    title: "Rejected Milk Records",
    message: `${rejectedMilkEntries} milk record(s) were rejected.`,
  });
}

if (totalCows === 0) {
  alerts.push({
    type: "info",
    icon: "🐄",
    title: "No Cow Records",
    message: "You have not registered any cows yet.",
  });
}

if (totalMilk === 0 && totalMilkEntries === 0) {
  alerts.push({
    type: "info",
    icon: "🥛",
    title: "No Milk Collection",
    message: "No verified milk collection records are available.",
  });
}
  // ================= LOGOUT =================

 const handleLogout = () => {
  localStorage.removeItem("loggedInFarmerMobile");
  localStorage.removeItem("loggedInFarmerId");
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
    className="refresh-btn"
    onClick={() => window.location.reload()}
  >
    🔄 Refresh
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

           
{loggedInFarmer && (
  <div className="farmer-welcome-card">
    <div>
      <span>👨‍🌾 Farmer</span>
      <h2>{loggedInFarmer.name}</h2>
    </div>

    <div>
      <span>🆔 Farmer ID</span>
      <strong>{loggedInFarmer.farmerId}</strong>
    </div>

    <div>
      <span>📱 Mobile</span>
      <strong>{loggedInFarmer.mobile}</strong>
    </div>

    <div>
      <span>📍 Village</span>
      <strong>{loggedInFarmer.village}</strong>
    </div>
  </div>
)}

          </div>

          <div className="welcome-cow">
            🐄
          </div>

        </section>
{/* =================================================
                    SMART ALERTS
================================================= */}

<section className="dashboard-card smart-alerts-section">

  <div className="dashboard-card-heading">
    <div>
      <h2>🔔 Smart Alerts</h2>
      <p>Important updates about your farm.</p>
    </div>
  </div>

  {alerts.length === 0 ? (
    <div className="no-alerts">
      ✅ No important alerts right now.
    </div>
  ) : (
    <div className="alerts-list">
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`alert-item ${alert.type}`}
        >
          <div className="alert-icon">
            {alert.icon}
          </div>

          <div className="alert-content">
            <strong>{alert.title}</strong>
            <p>{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  )}

</section>

{/* =================================================
              MONTHLY PERFORMANCE
================================================= */}

<section className="dashboard-card monthly-performance-section">

  <div className="dashboard-card-heading">
    <div>
      <h2>📊 Monthly Performance</h2>
      <p>
        Your verified milk performance for this month.
      </p>
    </div>
  </div>

  <div className="monthly-performance-grid">

    <div className="performance-box">
      <span>🥛</span>
      <h3>Monthly Milk</h3>
      <strong>
        {monthlyMilk.toFixed(2)} L
      </strong>
      <small>
        Verified milk
      </small>
    </div>

    <div className="performance-box">
      <span>💰</span>
      <h3>Milk Earning</h3>
      <strong>
        ₹{monthlyEarning.toFixed(2)}
      </strong>
      <small>
        Verified amount
      </small>
    </div>

    <div className="performance-box">
      <span>📋</span>
      <h3>Milk Entries</h3>
      <strong>
        {monthlyEntries}
      </strong>
      <small>
        This month
      </small>
    </div>

    <div className="performance-box">
      <span>📈</span>
      <h3>Average Milk</h3>
      <strong>
        {averageMilk.toFixed(2)} L
      </strong>
      <small>
        Per entry
      </small>
    </div>

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
          {/* TOTAL COWS */}

<div className="milk-summary-box">

  <span>
    🐄
  </span>

  <h3>
    Total Cows
  </h3>

  <strong>
    {totalCows}
  </strong>

  <small>
    My registered cows
  </small>

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
  📋 Verified Milk Entries: {totalMilkEntries}
</strong>

<div style={{ marginTop: "8px" }}>
  ⏳ Pending Entries: {pendingMilkEntries}
</div>
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

{/* =================================================
                  QUICK ACTIONS
================================================= */}

<section className="dashboard-card quick-actions-section">

  <div className="dashboard-card-heading">
    <div>
      <h2>🐄 Farm Management</h2>
     
    </div>
  </div>

  <div className="quick-actions-grid">

    <button
      className="quick-action-card"
      onClick={() =>
        navigate("/farmer/ViewMilkCollection")
      }
    >
      <span>🥛</span>
      <strong>View Milk</strong>
      <small>Check milk collection</small>
    </button>

    <button
      className="quick-action-card"
      onClick={() =>
        navigate("/farmer/cows")
      }
    >
      <span>🐄</span>
      <strong>Manage Cows</strong>
      <small>Manage your cows</small>
    </button>

    <button
      className="quick-action-card"
      onClick={() =>
        navigate("/farmer/Feed")
      }
    >
      <span>🌾</span>
      <strong>Manage Feed</strong>
      <small>Manage feed records</small>
    </button>

    <button
      className="quick-action-card"
      onClick={() =>
        navigate("/farmer/financial")
      }
    >
      <span>💰</span>
      <strong>Financial</strong>
      <small>Income and expenses</small>
    </button>

    <button
      className="quick-action-card"
      onClick={() =>
        navigate("/farmer/reports")
      }
    >
      <span>📊</span>
      <strong>Reports</strong>
      <small>View farm reports</small>
    </button>

    <button
      className="quick-action-card"
      onClick={() =>
        navigate("/farmer/ai-chatbot")
      }
    >
      <span>🤖</span>
      <strong>AI Assistant</strong>
      <small>Get smart insights</small>
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