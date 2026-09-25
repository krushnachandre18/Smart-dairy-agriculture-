import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Farmers.css";

function Farmers() {
  const navigate = useNavigate();

  const [farmers, setFarmers] = useState(() => {
    const savedFarmers =
      localStorage.getItem("farmers");

    return savedFarmers
      ? JSON.parse(savedFarmers)
      : [];
  });

  const [milkRecords] = useState(() => {
    const savedRecords =
      localStorage.getItem("milkRecords");

    return savedRecords
      ? JSON.parse(savedRecords)
      : [];
  });

  const [farmerName, setFarmerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [village, setVillage] = useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  // ==========================================
  // GENERATE NEXT FARMER ID
  // ==========================================

  const getNextFarmerId = () => {
    if (farmers.length === 0) {
      return "F001";
    }

    const farmerNumbers = farmers.map((farmer) => {
      const idText = String(
        farmer.farmerId || ""
      ).toUpperCase();

      const number = parseInt(
        idText.replace("F", ""),
        10
      );

      return isNaN(number) ? 0 : number;
    });

    const highestNumber = Math.max(
      0,
      ...farmerNumbers
    );

    return `F${String(
      highestNumber + 1
    ).padStart(3, "0")}`;
  };

  // ==========================================
  // ADD FARMER
  // ==========================================

  const handleAddFarmer = (e) => {
    e.preventDefault();

    if (!farmerName.trim()) {
      alert("Please enter Farmer Name");
      return;
    }

    // Mobile validation
    if (
      mobile.trim() &&
      mobile.trim().length !== 10
    ) {
      alert(
        "Please enter a valid 10 digit mobile number."
      );
      return;
    }

    // Check duplicate mobile
    if (mobile.trim()) {
      const mobileExists = farmers.some(
        (farmer) =>
          String(farmer.mobile) ===
          String(mobile.trim())
      );

      if (mobileExists) {
        alert(
          "This mobile number is already registered."
        );
        return;
      }
    }

    // Generate automatic Farmer ID
    const nextFarmerId =
      getNextFarmerId();

    const newFarmer = {
      id: Date.now(),
      farmerId: nextFarmerId,
      name: farmerName.trim(),
      mobile: mobile.trim(),
      village: village.trim(),
    };

    const updatedFarmers = [
      ...farmers,
      newFarmer,
    ];

    setFarmers(updatedFarmers);

    localStorage.setItem(
      "farmers",
      JSON.stringify(updatedFarmers)
    );

    setFarmerName("");
    setMobile("");
    setVillage("");

    alert(
      `Farmer added successfully.\nFarmer ID: ${nextFarmerId}`
    );
  };

  // ==========================================
  // DELETE FARMER
  // ==========================================

  const handleDeleteFarmer = (id) => {
    const farmer = farmers.find(
      (item) => item.id === id
    );

    if (!farmer) {
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${farmer.name}?`
    );

    if (!confirmDelete) {
      return;
    }

    const updatedFarmers = farmers.filter(
      (item) => item.id !== id
    );

    setFarmers(updatedFarmers);

    localStorage.setItem(
      "farmers",
      JSON.stringify(updatedFarmers)
    );
  };

  // ==========================================
  // SEARCH FARMERS
  // ==========================================

  const filteredFarmers = farmers.filter(
    (farmer) => {
      const search =
        searchTerm.trim().toLowerCase();

      if (!search) {
        return true;
      }

      return (
        String(farmer.farmerId || "")
          .toLowerCase()
          .includes(search) ||
        String(farmer.name || "")
          .toLowerCase()
          .includes(search) ||
        String(farmer.mobile || "")
          .toLowerCase()
          .includes(search) ||
        String(farmer.village || "")
          .toLowerCase()
          .includes(search)
      );
    }
  );

  // ==========================================
  // GET FARMER MILK RECORDS
  // ==========================================

  const getFarmerMilkRecords = (farmer) => {
    return milkRecords.filter((record) => {
      const farmerIdMatch =
        String(record.farmerId || "") ===
        String(farmer.farmerId || "");

      const mobileMatch =
        farmer.mobile &&
        String(record.farmerMobile || "") ===
          String(farmer.mobile || "");

      return (
        farmerIdMatch ||
        mobileMatch
      );
    });
  };

  // ==========================================
  // GET FARMER TOTAL MILK
  // ==========================================

  const getFarmerTotalMilk = (farmer) => {
    const records =
      getFarmerMilkRecords(farmer);

    return records
      .filter(
        (record) =>
          String(
            record.status
          ).toLowerCase() === "verified"
      )
      .reduce(
        (total, record) =>
          total +
          Number(record.quantity || 0),
        0
      );
  };

  // ==========================================
  // GET FARMER TOTAL EARNING
  // ==========================================

  const getFarmerTotalEarning = (farmer) => {
    const records =
      getFarmerMilkRecords(farmer);

    return records
      .filter(
        (record) =>
          String(
            record.status
          ).toLowerCase() === "verified"
      )
      .reduce(
        (total, record) =>
          total +
          Number(record.amount || 0),
        0
      );
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="farmers-page">

      {/* NAVBAR */}

      <nav className="farmers-navbar">

        <div className="farmers-brand">

          <span className="farmers-logo">
            👨‍🌾
          </span>

          <div>

            <h2>
              Smart Dairy
            </h2>

            <p>
              Farmer Management
            </p>

          </div>

        </div>

        <button
          className="back-dashboard-btn"
          onClick={() =>
            navigate("/dairy/dashboard")
          }
        >
          ← Back to Dashboard
        </button>

      </nav>

      <main className="farmers-main">

        {/* PAGE HEADER */}

        <section className="farmers-heading">

          <div>

            <span>
              SMART DAIRY CENTER
            </span>

            <h1>
              Farmer Registration
            </h1>

            <p>
              Add and manage all registered
              farmers in your dairy center.
            </p>

          </div>

          <div className="heading-icon">
            👨‍🌾
          </div>

        </section>

        {/* ADD FARMER */}

        <section className="farmer-form-card">

          <div className="section-title">

            <div>

              <h2>
                Add New Farmer
              </h2>

              <p>
                Enter farmer details below.
              </p>

            </div>

            <span className="form-icon">
              ➕
            </span>

          </div>

          <form
            onSubmit={handleAddFarmer}
            className="farmer-form"
          >

            {/* AUTOMATIC FARMER ID */}

            <div className="form-group">

              <label>
                Farmer ID
              </label>

              <input
                type="text"
                value={getNextFarmerId()}
                readOnly
              />

              <small>
                Farmer ID is generated automatically.
              </small>

            </div>

            {/* FARMER NAME */}

            <div className="form-group">

              <label>
                Farmer Name
              </label>

              <input
                type="text"
                placeholder="Enter farmer name"
                value={farmerName}
                onChange={(e) =>
                  setFarmerName(
                    e.target.value
                  )
                }
              />

            </div>

            {/* MOBILE */}

            <div className="form-group">

              <label>
                Mobile Number
              </label>

              <input
                type="tel"
                placeholder="Enter mobile number"
                maxLength="10"
                value={mobile}
                onChange={(e) =>
                  setMobile(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
              />

            </div>

            {/* VILLAGE */}

            <div className="form-group">

              <label>
                Village
              </label>

              <input
                type="text"
                placeholder="Enter village"
                value={village}
                onChange={(e) =>
                  setVillage(
                    e.target.value
                  )
                }
              />

            </div>

            {/* ADD BUTTON */}

            <button
              className="add-farmer-btn"
              type="submit"
            >
              + Add Farmer
            </button>

          </form>

        </section>

        {/* REGISTERED FARMERS */}

        <section className="registered-farmers-card">

          <div className="registered-heading">

            <div>

              <h2>
                Registered Farmers
              </h2>

              <p>
                List of all farmers registered
                in the system.
              </p>

            </div>

            <div className="farmer-count">
              {farmers.length} Farmers
            </div>

          </div>

          {/* SEARCH */}

          <div
            style={{
              marginBottom: "20px",
            }}
          >

            <input
              type="text"
              placeholder="🔍 Search by Farmer ID, name, mobile or village..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "13px 15px",
                borderRadius: "10px",
                border:
                  "1px solid #cbd5e1",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />

          </div>

          {/* NO FARMERS */}

          {farmers.length === 0 ? (

            <div className="empty-farmers">

              <div>
                👨‍🌾
              </div>

              <h3>
                No farmers registered yet
              </h3>

              <p>
                Add your first farmer using
                the form above.
              </p>

            </div>

          ) : filteredFarmers.length === 0 ? (

            /* NO SEARCH RESULT */

            <div className="empty-farmers">

              <div>
                🔍
              </div>

              <h3>
                No farmer found
              </h3>

              <p>
                Try another search.
              </p>

            </div>

          ) : (

            /* FARMER TABLE */

            <div className="farmers-table-wrapper">

              <table className="farmers-table">

                <thead>

                  <tr>

                    <th>
                      Farmer ID
                    </th>

                    <th>
                      Name
                    </th>

                    <th>
                      Mobile
                    </th>

                    <th>
                      Village
                    </th>

                    <th>
                      Total Milk
                    </th>

                    <th>
                      Total Earning
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredFarmers.map(
                    (farmer) => (

                      <tr
                        key={farmer.id}
                      >

                        <td>

                          <strong>
                            {farmer.farmerId}
                          </strong>

                        </td>

                        <td>
                          {farmer.name}
                        </td>

                        <td>
                          {farmer.mobile ||
                            "Not added"}
                        </td>

                        <td>
                          {farmer.village ||
                            "Not added"}
                        </td>

                        <td>

                          {getFarmerTotalMilk(
                            farmer
                          ).toFixed(2)}{" "}
                          L

                        </td>

                        <td>

                          ₹
                          {getFarmerTotalEarning(
                            farmer
                          ).toFixed(2)}

                        </td>

                        <td>

                          <span className="active-status">
                            Active
                          </span>

                        </td>

                        <td>

                          <button
                            className="delete-farmer-btn"
                            onClick={() =>
                              handleDeleteFarmer(
                                farmer.id
                              )
                            }
                          >
                            🗑 Delete
                          </button>

                        </td>

                      </tr>

                    )
                  )}

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