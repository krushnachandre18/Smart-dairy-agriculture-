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
    
    // Farmer account
   const mobile = localStorage.getItem("loggedInFarmerMobile");

const farmers =
  JSON.parse(localStorage.getItem("farmers")) || [];

const savedFarmer = farmers.find(
  (farmer) => farmer.mobile === mobile
);

if (savedFarmer) {
  setFarmer(savedFarmer);
}

    // Milk records
    const milkRecords =
      JSON.parse(localStorage.getItem("milkRecords")) || [];

    const farmerMilk = milkRecords.filter(
      (record) =>
        record.farmerMobile === mobile
    );

    const milk = farmerMilk.reduce(
      (total, record) =>
        total + Number(record.quantity || 0),
      0
    );

    const earning = farmerMilk.reduce(
      (total, record) =>
        total + Number(record.amount || 0),
      0
    );

    setTotalMilk(milk);
    setTotalEarning(earning);

    // Cow records
    const cows =
      JSON.parse(localStorage.getItem("cows")) || [];

    setTotalCows(cows.length);
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