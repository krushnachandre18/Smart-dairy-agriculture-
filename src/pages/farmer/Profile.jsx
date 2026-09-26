import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [farmer, setFarmer] = useState(null);
  const [totalMilk, setTotalMilk] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);
  const [totalCows, setTotalCows] = useState(0);
useEffect(() => {
  const loadProfile = async () => {
    try {
      // ================= LOGGED IN FARMER =================

      const mobile =
        localStorage.getItem("loggedInFarmerMobile");

      if (!mobile) {
        console.log("No logged in farmer mobile found");
        return;
      }

      // ================= GET FARMER FROM MYSQL =================

      const response = await fetch(
        `http://localhost:5000/api/farmer-profile/${mobile}`
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Farmer profile error:", data.message);
        return;
      }

      const savedFarmer = data.farmer;

      console.log("Logged in farmer:", savedFarmer);

      setFarmer(savedFarmer);

      // ================= MILK RECORDS =================

      const milkRecords =
        JSON.parse(localStorage.getItem("milkRecords")) || [];

      const farmerMilk = milkRecords.filter((record) => {
        const mobileMatch =
          String(record.farmerMobile || "") ===
          String(mobile);

        const farmerIdMatch =
          String(record.farmerId || "") ===
          String(
            savedFarmer.farmerId ||
            savedFarmer.farmer_id ||
            ""
          );

        return mobileMatch || farmerIdMatch;
      });

      // ================= VERIFIED MILK =================

      const verifiedFarmerMilk = farmerMilk.filter(
        (record) =>
          String(record.status || "").toLowerCase() ===
          "verified"
      );

      // ================= TOTAL MILK =================

      const milk = verifiedFarmerMilk.reduce(
        (total, record) =>
          total + Number(record.quantity || 0),
        0
      );

      // ================= TOTAL EARNING =================

      const earning = verifiedFarmerMilk.reduce(
        (total, record) =>
          total + Number(record.amount || 0),
        0
      );

      setTotalMilk(milk);
      setTotalEarning(earning);

      // ================= TOTAL COWS =================

      const cows =
        JSON.parse(localStorage.getItem("cows")) || [];

      const farmerCows = cows.filter((cow) => {
        const mobileMatch =
          String(cow.farmerMobile || "") ===
          String(mobile);

        const farmerIdMatch =
          String(cow.farmerId || "") ===
          String(
            savedFarmer.farmerId ||
            savedFarmer.farmer_id ||
            ""
          );

        return mobileMatch || farmerIdMatch;
      });

      setTotalCows(farmerCows.length);

    } catch (error) {
      console.error(
        "Profile loading error:",
        error
      );
    }
  };

  loadProfile();
}, []);

  if (!farmer) {
    return (
      <div className="profile-page">
        <div className="profile-empty">
          <h2>Farmer Profile Not Found</h2>

          <button
            onClick={() => navigate("/farmer/dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">

      {/* Header */}
      <div className="profile-header">
        <div>
          <h1>👤 My Farmer Profile</h1>
          <p>Smart Dairy & Farm Management System</p>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/farmer/dashboard")}
        >
          ← Dashboard
        </button>
      </div>

      {/* Profile Card */}
      <div className="profile-main-card">

        <div className="profile-avatar">
          👨‍🌾
        </div>

        <div className="profile-info">
          <h2>
            {farmer.name || "Farmer"}
          </h2>

          <p>
            📱 {farmer.mobile || localStorage.getItem(
              "loggedInFarmerMobile"
            )}
          </p>

          <p>
            📍 {farmer.address || "Address not available"}
          </p>

          <p>
            🏠 {farmer.village || "Village not available"}
          </p>
        </div>

      </div>

      {/* Statistics */}
      <div className="profile-stats">

        <div className="profile-stat-card">
          <span>🥛</span>
          <h3>Total Milk</h3>
          <strong>
            {totalMilk.toFixed(2)} L
          </strong>
        </div>

        <div className="profile-stat-card">
          <span>💰</span>
          <h3>Total Earning</h3>
          <strong>
            ₹{totalEarning.toFixed(2)}
          </strong>
        </div>

        <div className="profile-stat-card">
          <span>🐄</span>
          <h3>Total Cows</h3>
          <strong>
            {totalCows}
          </strong>
        </div>

      </div>

      {/* Account Information */}
      <div className="profile-section">

        <h2>📋 Account Information</h2>

        <div className="profile-details">

          <div>
            <label>Farmer Name</label>
            <p>{farmer.name || "Not available"}</p>
          </div>

          <div>
            <label>Mobile Number</label>
            <p>
              {farmer.mobile ||
                localStorage.getItem(
                  "loggedInFarmerMobile"
                )}
            </p>
          </div>

          <div>
            <label>Address</label>
            <p>
              {farmer.address || "Not available"}
            </p>
          </div>
          <div>
  <label>Farmer ID</label>
  <p>
  {farmer.farmerId ||
    farmer.farmer_id ||
    "Not available"}
</p>
</div>

          <div>
            <label>Village</label>
            <p>
              {farmer.village || "Not available"}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;