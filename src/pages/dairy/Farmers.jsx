import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Farmers.css";

function Farmers() {
  const navigate = useNavigate();

  const [farmers, setFarmers] = useState(() => {
    const savedFarmers = localStorage.getItem("farmers");

    return savedFarmers ? JSON.parse(savedFarmers) : [];
  });

  const [farmerId, setFarmerId] = useState("");
  const [farmerName, setFarmerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [village, setVillage] = useState("");

  const handleAddFarmer = (e) => {
    e.preventDefault();

    if (!farmerId || !farmerName) {
      alert("Please enter Farmer ID and Farmer Name");
      return;
    }

    const newFarmer = {
      id: Date.now(),
      farmerId: farmerId,
      name: farmerName,
      mobile: mobile,
      village: village,
    };

    const updatedFarmers = [...farmers, newFarmer];

    setFarmers(updatedFarmers);

    localStorage.setItem("farmers", JSON.stringify(updatedFarmers));

    setFarmerId("");
    setFarmerName("");
    setMobile("");
    setVillage("");

    alert("Farmer added successfully");
  };

  const handleDeleteFarmer = (id) => {
    const updatedFarmers = farmers.filter(
      (farmer) => farmer.id !== id
    );

    setFarmers(updatedFarmers);

    localStorage.setItem("farmers", JSON.stringify(updatedFarmers));
  };

  return (
    <div className="farmers-page">
      <nav className="farmers-navbar">
        <div className="farmers-brand">
          <span className="farmers-logo">👨‍🌾</span>

          <div>
            <h2>Smart Dairy</h2>
            <p>Farmer Management</p>
          </div>
        </div>

        <button
          className="back-dashboard-btn"
          onClick={() => navigate("/dairy/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </nav>

      <main className="farmers-main">
        <section className="farmers-heading">
          <div>
            <span>SMART DAIRY CENTER</span>
            <h1>Farmer Registration</h1>
            <p>
              Add and manage all registered farmers in your dairy center.
            </p>
          </div>

          <div className="heading-icon">👨‍🌾</div>
        </section>

        <section className="farmer-form-card">
          <div className="section-title">
            <div>
              <h2>Add New Farmer</h2>
              <p>Enter farmer details below.</p>
            </div>

            <span className="form-icon">➕</span>
          </div>

          <form onSubmit={handleAddFarmer} className="farmer-form">
            <div className="form-group">
              <label>Farmer ID</label>

              <input
                type="text"
                placeholder="e.g. F001"
                value={farmerId}
                onChange={(e) => setFarmerId(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Farmer Name</label>

              <input
                type="text"
                placeholder="Enter farmer name"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>

              <input
                type="tel"
                placeholder="Enter mobile number"
                maxLength="10"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Village</label>

              <input
                type="text"
                placeholder="Enter village"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
              />
            </div>

            <button className="add-farmer-btn" type="submit">
              + Add Farmer
            </button>
          </form>
        </section>

        <section className="registered-farmers-card">
          <div className="registered-heading">
            <div>
              <h2>Registered Farmers</h2>
              <p>List of all farmers registered in the system.</p>
            </div>

            <div className="farmer-count">
              {farmers.length} Farmers
            </div>
          </div>

          {farmers.length === 0 ? (
            <div className="empty-farmers">
              <div>👨‍🌾</div>
              <h3>No farmers registered yet</h3>
              <p>Add your first farmer using the form above.</p>
            </div>
          ) : (
            <div className="farmers-table-wrapper">
              <table className="farmers-table">
                <thead>
                  <tr>
                    <th>Farmer ID</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Village</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {farmers.map((farmer) => (
                    <tr key={farmer.id}>
                      <td>
                        <strong>{farmer.farmerId}</strong>
                      </td>

                      <td>{farmer.name}</td>

                      <td>{farmer.mobile || "Not added"}</td>

                      <td>{farmer.village || "Not added"}</td>

                      <td>
                        <span className="active-status">
                          Active
                        </span>
                      </td>

                      <td>
                        <button
                          className="delete-farmer-btn"
                          onClick={() =>
                            handleDeleteFarmer(farmer.id)
                          }
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Farmers;