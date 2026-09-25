import { useEffect, useState } from "react";
import "./cows.css";

const API_URL = "http://localhost:5000/api";

function Cows() {
  // =====================================================
  // FARMER LOGIN INFORMATION
  // =====================================================

  const loggedInFarmerMobile =
    localStorage.getItem("loggedInFarmerMobile");

  const [farmerPublicId, setFarmerPublicId] = useState("");

  // =====================================================
  // MAIN SECTION
  // =====================================================

  const [activeSection, setActiveSection] = useState("menu");
  const [message, setMessage] = useState("");

  // =====================================================
  // COW STATES
  // =====================================================

  const [cows, setCows] = useState([]);

  const [tagNumber, setTagNumber] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [status, setStatus] = useState("Active");

  // =====================================================
  // HEALTH STATES
  // =====================================================

  const [healthRecords, setHealthRecords] = useState([]);

  const [healthCow, setHealthCow] = useState("");
  const [vaccineName, setVaccineName] = useState("");
  const [vaccinationDate, setVaccinationDate] = useState("");
  const [nextDueDate, setNextDueDate] = useState("");
  const [healthStatus, setHealthStatus] = useState("Healthy");
  const [healthNotes, setHealthNotes] = useState("");

  // =====================================================
  // PREGNANCY STATES
  // =====================================================

  const [pregnancyRecords, setPregnancyRecords] = useState([]);

  const [pregnancyCow, setPregnancyCow] = useState("");
  const [pregnancyStatus, setPregnancyStatus] =
    useState("Not Pregnant");
  const [pregnancyStartDate, setPregnancyStartDate] =
    useState("");
  const [expectedCalvingDate, setExpectedCalvingDate] =
    useState("");
  const [calvingDate, setCalvingDate] = useState("");
  const [calfGender, setCalfGender] = useState("");
  const [pregnancyNotes, setPregnancyNotes] = useState("");

  // =====================================================
  // FIND LOGGED-IN FARMER
  // =====================================================

  useEffect(() => {
    if (!loggedInFarmerMobile) {
      setMessage("Farmer login information not found.");
      return;
    }

    const farmers =
      JSON.parse(localStorage.getItem("farmers")) || [];

    const farmer = farmers.find(
      (item) =>
        String(item.mobile) ===
        String(loggedInFarmerMobile)
    );

    if (!farmer) {
      setMessage("Farmer information not found.");
      return;
    }

    /*
      Backend routes use farmer_id
      Example: F001, F002, etc.
    */

    setFarmerPublicId(
      farmer.farmer_id || farmer.farmerId || ""
    );
  }, [loggedInFarmerMobile]);

  // =====================================================
  // LOAD ALL MYSQL DATA
  // =====================================================

  useEffect(() => {
    if (!farmerPublicId) return;

    loadCows();
    loadHealthRecords();
    loadPregnancyRecords();
  }, [farmerPublicId]);

  // =====================================================
  // LOAD COWS
  // =====================================================

  const loadCows = async () => {
    try {
      const response = await fetch(
        `${API_URL}/cows/${farmerPublicId}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load cows"
        );
      }

      setCows(Array.isArray(data.cows) ? data.cows : []);
    } catch (error) {
      console.error("Load cows error:", error);
      setMessage("Unable to load cows from database.");
    }
  };

  // =====================================================
  // LOAD HEALTH RECORDS
  // =====================================================

 const loadHealthRecords = async () => {
  try {
    const response = await fetch(
      `${API_URL}/cow-health/${farmerPublicId}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to load health records"
      );
    }

    setHealthRecords(
  Array.isArray(data.records)
    ? data.records
    : []
);
  } catch (error) {
    console.error(
      "Load health records error:",
      error
    );

    setMessage(
      "Unable to load health records."
    );
  }
};
  // =====================================================
  // LOAD PREGNANCY RECORDS
  // =====================================================

  const loadPregnancyRecords = async () => {
    try {
      const response = await fetch(
        `${API_URL}/cow-pregnancy/${farmerPublicId}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to load pregnancy records"
        );
      }

      setPregnancyRecords(
  Array.isArray(data.records)
    ? data.records
    : []
);
    } catch (error) {
      console.error(
        "Load pregnancy records error:",
        error
      );

      setMessage(
        "Unable to load pregnancy records."
      );
    }
  };

  // =====================================================
  // ADD NEW COW
  // =====================================================

  const handleAddCow = async () => {
    setMessage("");

    if (!farmerPublicId) {
      setMessage(
        "Farmer information not available."
      );
      return;
    }

    if (!tagNumber.trim()) {
      setMessage("Please enter cow tag number.");
      return;
    }

    if (!breed.trim()) {
      setMessage("Please enter cow breed.");
      return;
    }

    if (!age) {
      setMessage("Please enter cow age.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/cows`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            farmerId: farmerPublicId,
            tagNumber: tagNumber.trim(),
            breed: breed.trim(),
            age: Number(age),
            purchaseDate:
              purchaseDate || null,
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add cow"
        );
      }

      // Reload from MySQL
      await loadCows();

      // Clear form
      setTagNumber("");
      setBreed("");
      setAge("");
      setPurchaseDate("");
      setStatus("Active");

      setMessage(
        "Cow added successfully!"
      );
    } catch (error) {
      console.error("Add cow error:", error);

      setMessage(
        error.message ||
          "Unable to add cow."
      );
    }
  };

  // =====================================================
  // DELETE COW
  // =====================================================

  const handleDeleteCow = async (cowId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this cow?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/cows/${cowId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete cow"
        );
      }

      await loadCows();
      await loadHealthRecords();
      await loadPregnancyRecords();

      setMessage(
        "Cow deleted successfully!"
      );
    } catch (error) {
      console.error(
        "Delete cow error:",
        error
      );

      setMessage(
        error.message ||
          "Unable to delete cow."
      );
    }
  };

  // =====================================================
  // ADD HEALTH RECORD
  // =====================================================

  const handleAddHealth = async () => {
    setMessage("");

    if (!healthCow) {
      setMessage("Please select a cow.");
      return;
    }

    if (!vaccineName.trim()) {
      setMessage(
        "Please enter vaccine name."
      );
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/cow-health`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            farmerId: farmerPublicId,
            cowId: Number(healthCow),
            vaccine: vaccineName.trim(),
            vaccinationDate:
              vaccinationDate || null,
            nextDueDate:
              nextDueDate || null,
            status: healthStatus,
            notes: healthNotes.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to add health record"
        );
      }

      await loadHealthRecords();

      // Clear form
      setHealthCow("");
      setVaccineName("");
      setVaccinationDate("");
      setNextDueDate("");
      setHealthStatus("Healthy");
      setHealthNotes("");

      setMessage(
        "Health record added successfully!"
      );
    } catch (error) {
      console.error(
        "Add health error:",
        error
      );

      setMessage(
        error.message ||
          "Unable to add health record."
      );
    }
  };

  // =====================================================
  // ADD PREGNANCY RECORD
  // =====================================================

  const handleAddPregnancy = async () => {
    setMessage("");

    if (!pregnancyCow) {
      setMessage("Please select a cow.");
      return;
    }

    if (!pregnancyStatus) {
      setMessage(
        "Please select pregnancy status."
      );
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/cow-pregnancy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            farmerId: farmerPublicId,
            cowId: Number(pregnancyCow),
            status: pregnancyStatus,
            pregnancyStartDate:
              pregnancyStartDate || null,
            expectedCalvingDate:
              expectedCalvingDate || null,
            calvingDate:
              calvingDate || null,
            calfGender:
              calfGender || null,
            notes:
              pregnancyNotes.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to add pregnancy record"
        );
      }

      await loadPregnancyRecords();

      // Clear form
      setPregnancyCow("");
      setPregnancyStatus("Not Pregnant");
      setPregnancyStartDate("");
      setExpectedCalvingDate("");
      setCalvingDate("");
      setCalfGender("");
      setPregnancyNotes("");

      setMessage(
        "Pregnancy record added successfully!"
      );
    } catch (error) {
      console.error(
        "Add pregnancy error:",
        error
      );

      setMessage(
        error.message ||
          "Unable to add pregnancy record."
      );
    }
  };

  // =====================================================
  // FIND COW BY ID
  // =====================================================

  const getCowById = (cowId) => {
    return cows.find(
      (cow) =>
        Number(cow.id) === Number(cowId)
    );
  };

  // =====================================================
  // JSX
  // =====================================================

  return (
    <div className="cows-page">

      {/* =================================================
          MAIN MENU
      ================================================= */}

      {activeSection === "menu" && (
        <div className="cows-menu">

          <div className="cows-header">

            <div className="cows-icon">
              🐄
            </div>

            <h1>Cow Management</h1>

            <p>
              Manage your cows, health, milk production
              and pregnancy records.
            </p>

          </div>

          <div className="cow-menu-grid">

            {/* ADD COW */}

            <button
              className="cow-menu-card"
              onClick={() => {
                setActiveSection("addCow");
                setMessage("");
              }}
            >
              <span>➕</span>

              <strong>
                Add New Cow
              </strong>

              <small>
                Register a new cow
              </small>
            </button>

            {/* MY COWS */}

            <button
              className="cow-menu-card"
              onClick={() => {
                setActiveSection("myCows");
                setMessage("");
              }}
            >
              <span>🐄</span>

              <strong>
                My Cows
              </strong>

              <small>
                View registered cows
              </small>
            </button>

            {/* HEALTH */}

            <button
              className="cow-menu-card"
              onClick={() => {
                setActiveSection("health");
                setMessage("");
              }}
            >
              <span>❤️</span>

              <strong>
                Health & Vaccination
              </strong>

              <small>
                Manage cow health records
              </small>
            </button>

            {/* PREGNANCY */}

            <button
              className="cow-menu-card"
              onClick={() => {
                setActiveSection("pregnancy");
                setMessage("");
              }}
            >
              <span>🤰</span>

              <strong>
                Pregnancy & Calving
              </strong>

              <small>
                Track pregnancy and calving
              </small>
            </button>

          </div>
        </div>
      )}

      {/* =================================================
          ADD COW
      ================================================= */}

      {activeSection === "addCow" && (
        <div className="cow-section">

          <div className="section-top">

            <div>
              <h1>
                🐄 Cow Management
              </h1>

              <p>
                Add and manage your cow information.
              </p>
            </div>

            <button
              className="back-button"
              onClick={() => {
                setActiveSection("menu");
                setMessage("");
              }}
            >
              ← Back
            </button>

          </div>

          <div className="cow-form-card">

            <div className="form-title">

              <span>➕</span>

              <div>
                <h2>
                  Add New Cow
                </h2>

                <p>
                  Enter the basic information of your cow.
                </p>
              </div>

            </div>

            <div className="cow-form-grid">

              <div className="form-group">

                <label>
                  Cow Tag Number
                </label>

                <input
                  type="text"
                  placeholder="Example: COW001"
                  value={tagNumber}
                  onChange={(e) =>
                    setTagNumber(e.target.value)
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Breed
                </label>

                <input
                  type="text"
                  placeholder="Example: Gir"
                  value={breed}
                  onChange={(e) =>
                    setBreed(e.target.value)
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Age (Years)
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="Enter age"
                  value={age}
                  onChange={(e) =>
                    setAge(e.target.value)
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Purchase Date
                </label>

                <input
                  type="date"
                  value={purchaseDate}
                  onChange={(e) =>
                    setPurchaseDate(e.target.value)
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Pregnant">
                    Pregnant
                  </option>

                  <option value="Sold">
                    Sold
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>

              </div>

            </div>

            <button
              className="add-cow-button"
              onClick={handleAddCow}
            >
              ➕ Add Cow
            </button>

            {message && (
              <p className="cow-message">
                {message}
              </p>
            )}

          </div>

        </div>
      )}

      {/* =================================================
          MY COWS
      ================================================= */}

      {activeSection === "myCows" && (
        <div className="cow-section">

          <div className="section-top">

            <div>
              <h1>
                🐄 My Cows
              </h1>

              <p>
                View and manage your registered cows.
              </p>
            </div>

            <button
              className="back-button"
              onClick={() => {
                setActiveSection("menu");
                setMessage("");
              }}
            >
              ← Back
            </button>

          </div>

          {message && (
            <p className="cow-message">
              {message}
            </p>
          )}

          <div className="cow-list-card">

            <div className="list-header">

              <div>
                <h2>
                  🐄 Registered Cows
                </h2>

                <p>
                  Total Cows: {cows.length}
                </p>
              </div>

            </div>

            {cows.length === 0 ? (

              <div className="empty-cows">

                <div>🐄</div>

                <h3>
                  No cows available
                </h3>

                <p>
                  Add your first cow to start
                  managing your cows.
                </p>

              </div>

            ) : (

              <div className="cow-table-container">

                <table>

                  <thead>
                    <tr>
                      <th>Tag Number</th>
                      <th>Breed</th>
                      <th>Age</th>
                      <th>Purchase Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {cows.map((cow) => (

                      <tr key={cow.id}>

                        <td>
                          <strong>
                            {cow.tagNumber ||
                              cow.tag_number ||
                              "-"}
                          </strong>
                        </td>

                        <td>
                          {cow.breed || "-"}
                        </td>

                        <td>
                          {cow.age ?? "-"}
                        </td>

                        <td>
                          {cow.purchaseDate ||
                            cow.purchase_date ||
                            "-"}
                        </td>

                        <td>

                          <span
                            className={`cow-status ${
                              (
                                cow.status ||
                                "Active"
                              )
                                .toLowerCase()
                                .replaceAll(
                                  " ",
                                  "-"
                                )
                            }`}
                          >
                            {cow.status ||
                              "Active"}
                          </span>

                        </td>

                        <td>

                          <button
                            className="delete-cow-button"
                            onClick={() =>
                              handleDeleteCow(
                                cow.id
                              )
                            }
                          >
                            🗑️ Delete
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>
      )}

      {/* =================================================
          HEALTH & VACCINATION
      ================================================= */}

      {activeSection === "health" && (
        <div className="cow-section">

          <div className="section-top">

            <div>

              <h1>
                ❤️ Health & Vaccination
              </h1>

              <p>
                Manage cow health and vaccination records.
              </p>

            </div>

            <button
              className="back-button"
              onClick={() => {
                setActiveSection("menu");
                setMessage("");
              }}
            >
              ← Back
            </button>

          </div>

          {/* ADD HEALTH FORM */}

          <div className="cow-form-card">

            <div className="form-title">

              <span>❤️</span>

              <div>

                <h2>
                  Add Health Record
                </h2>

                <p>
                  Enter vaccination and health details.
                </p>

              </div>

            </div>

            <div className="cow-form-grid">

              <div className="form-group">

                <label>
                  Select Cow
                </label>

                <select
                  value={healthCow}
                  onChange={(e) =>
                    setHealthCow(e.target.value)
                  }
                >

                  <option value="">
                    Select Cow
                  </option>

                  {cows.map((cow) => (

                    <option
                      key={cow.id}
                      value={cow.id}
                    >
                      {cow.tagNumber ||
                        cow.tag_number}{" "}
                      -{" "}
                      {cow.breed}
                    </option>

                  ))}

                </select>

              </div>

              <div className="form-group">

                <label>
                  Vaccine
                </label>

                <input
                  type="text"
                  placeholder="Example: FMD"
                  value={vaccineName}
                  onChange={(e) =>
                    setVaccineName(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Vaccination Date
                </label>

                <input
                  type="date"
                  value={vaccinationDate}
                  onChange={(e) =>
                    setVaccinationDate(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Next Due Date
                </label>

                <input
                  type="date"
                  value={nextDueDate}
                  onChange={(e) =>
                    setNextDueDate(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Health Status
                </label>

                <select
                  value={healthStatus}
                  onChange={(e) =>
                    setHealthStatus(
                      e.target.value
                    )
                  }
                >

                  <option value="Healthy">
                    Healthy
                  </option>

                  <option value="Sick">
                    Sick
                  </option>

                  <option value="Under Treatment">
                    Under Treatment
                  </option>

                  <option value="Recovered">
                    Recovered
                  </option>

                </select>

              </div>

              <div className="form-group">

                <label>
                  Notes
                </label>

                <input
                  type="text"
                  placeholder="Enter health notes"
                  value={healthNotes}
                  onChange={(e) =>
                    setHealthNotes(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            <button
              className="add-cow-button"
              onClick={handleAddHealth}
            >
              ❤️ Add Health Record
            </button>

            {message && (
              <p className="cow-message">
                {message}
              </p>
            )}

          </div>

          {/* HEALTH HISTORY */}

          <div className="cow-list-card">

            <div className="list-header">

              <div>

                <h2>
                  📋 Health & Vaccination History
                </h2>

                <p>
                  View all health records.
                </p>

              </div>

            </div>

            {healthRecords.length === 0 ? (

              <div className="empty-cows">

                <div>🩺</div>

                <h3>
                  No health records available
                </h3>

                <p>
                  Add a health record to start
                  tracking cow health.
                </p>

              </div>

            ) : (

              <div className="cow-table-container">

                <table>

                  <thead>

                    <tr>
                      <th>Cow</th>
                      <th>Vaccine</th>
                      <th>Vaccination Date</th>
                      <th>Next Due Date</th>
                      <th>Health Status</th>
                      <th>Notes</th>
                    </tr>

                  </thead>

                  <tbody>

                    {healthRecords.map(
                      (record) => {

                        const cow =
                          getCowById(
                            record.cowId ??
                              record.cow_id
                          );

                        const recordStatus =
                          record.healthStatus ||
                          record.status ||
                          "Healthy";

                        return (

                          <tr key={record.id}>

                            <td>
                              <strong>
                                {cow
                                  ? cow.tagNumber ||
                                    cow.tag_number
                                  : "Unknown"}
                              </strong>
                            </td>

                            <td>
                              {record.vaccine ||
                                "-"}
                            </td>

                            <td>
                              {record.vaccinationDate ||
                                record.vaccination_date ||
                                "-"}
                            </td>

                            <td>
                              {record.nextDueDate ||
                                record.next_due_date ||
                                "-"}
                            </td>

                            <td>

                              <span
                                className={`health-status ${recordStatus
                                  .toLowerCase()
                                  .replaceAll(
                                    " ",
                                    "-"
                                  )}`}
                              >
                                {recordStatus}
                              </span>

                            </td>

                            <td>
                              {record.notes ||
                                "-"}
                            </td>

                          </tr>

                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>
      )}

      {/* =================================================
          PREGNANCY & CALVING
      ================================================= */}

      {activeSection === "pregnancy" && (
        <div className="cow-section">

          <div className="section-top">

            <div>

              <h1>
                🤰 Pregnancy & Calving Management
              </h1>

              <p>
                Track pregnancy and calving information
                for your cows.
              </p>

            </div>

            <button
              className="back-button"
              onClick={() => {
                setActiveSection("menu");
                setMessage("");
              }}
            >
              ← Back
            </button>

          </div>

          {/* PREGNANCY FORM */}

          <div className="cow-form-card">

            <div className="form-title">

              <span>🤰</span>

              <div>

                <h2>
                  Add Pregnancy Record
                </h2>

                <p>
                  Enter pregnancy and calving details.
                </p>

              </div>

            </div>

            <div className="cow-form-grid">

              <div className="form-group">

                <label>
                  Select Cow
                </label>

                <select
                  value={pregnancyCow}
                  onChange={(e) =>
                    setPregnancyCow(
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Select Cow
                  </option>

                  {cows.map((cow) => (

                    <option
                      key={cow.id}
                      value={cow.id}
                    >
                      {cow.tagNumber ||
                        cow.tag_number}{" "}
                      -{" "}
                      {cow.breed}
                    </option>

                  ))}

                </select>

              </div>

              <div className="form-group">

                <label>
                  Pregnancy Status
                </label>

                <select
                  value={pregnancyStatus}
                  onChange={(e) =>
                    setPregnancyStatus(
                      e.target.value
                    )
                  }
                >

                  <option value="Not Pregnant">
                    Not Pregnant
                  </option>

                  <option value="Pregnant">
                    Pregnant
                  </option>

                  <option value="Calved">
                    Calved
                  </option>

                </select>

              </div>

              <div className="form-group">

                <label>
                  Pregnancy Start Date
                </label>

                <input
                  type="date"
                  value={pregnancyStartDate}
                  onChange={(e) =>
                    setPregnancyStartDate(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Expected Calving Date
                </label>

                <input
                  type="date"
                  value={expectedCalvingDate}
                  onChange={(e) =>
                    setExpectedCalvingDate(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Calving Date
                </label>

                <input
                  type="date"
                  value={calvingDate}
                  onChange={(e) =>
                    setCalvingDate(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Calf Gender
                </label>

                <select
                  value={calfGender}
                  onChange={(e) =>
                    setCalfGender(
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                </select>

              </div>

              <div className="form-group">

                <label>
                  Notes
                </label>

                <input
                  type="text"
                  placeholder="Enter pregnancy/calving notes"
                  value={pregnancyNotes}
                  onChange={(e) =>
                    setPregnancyNotes(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            <button
              className="add-cow-button"
              onClick={handleAddPregnancy}
            >
              🤰 Add Pregnancy Record
            </button>

            {message && (
              <p className="cow-message">
                {message}
              </p>
            )}

          </div>

          {/* PREGNANCY HISTORY */}

          <div className="cow-list-card">

            <div className="list-header">

              <div>

                <h2>
                  📋 Pregnancy & Calving History
                </h2>

                <p>
                  View all pregnancy and calving
                  records.
                </p>

              </div>

            </div>

            {pregnancyRecords.length === 0 ? (

              <div className="empty-cows">

                <div>🤰</div>

                <h3>
                  No pregnancy records available
                </h3>

                <p>
                  Add a pregnancy record to start
                  tracking pregnancy and calving
                  information.
                </p>

              </div>

            ) : (

              <div className="cow-table-container">

                <table>

                  <thead>

                    <tr>
                      <th>Cow</th>
                      <th>Status</th>
                      <th>Pregnancy Start</th>
                      <th>Expected Calving</th>
                      <th>Calving Date</th>
                      <th>Calf Gender</th>
                      <th>Notes</th>
                    </tr>

                  </thead>

                  <tbody>

                    {pregnancyRecords.map(
                      (record) => {

                        const cow =
                          getCowById(
                            record.cowId ??
                              record.cow_id
                          );

                        const recordStatus =
                          record.status ||
                          "Not Pregnant";

                        return (

                          <tr key={record.id}>

                            <td>
                              <strong>
                                {cow
                                  ? cow.tagNumber ||
                                    cow.tag_number
                                  : "Unknown"}
                              </strong>
                            </td>

                            <td>

                              <span
                                className={`pregnancy-status ${recordStatus
                                  .toLowerCase()
                                  .replaceAll(
                                    " ",
                                    "-"
                                  )}`}
                              >
                                {recordStatus}
                              </span>

                            </td>

                            <td>
                              {record.pregnancyStartDate ||
                                record.pregnancy_start_date ||
                                "-"}
                            </td>

                            <td>
                              {record.expectedCalvingDate ||
                                record.expected_calving_date ||
                                "-"}
                            </td>

                            <td>
                              {record.calvingDate ||
                                record.calving_date ||
                                "-"}
                            </td>

                            <td>
                              {record.calfGender ||
                                record.calf_gender ||
                                "-"}
                            </td>

                            <td>
                              {record.notes ||
                                "-"}
                            </td>

                          </tr>

                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default Cows;