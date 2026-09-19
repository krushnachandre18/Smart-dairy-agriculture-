import { useState } from "react";
import "./cows.css";




function Cows() {
  // =========================
  // Active Section
  // =========================
  const [activeSection, setActiveSection] = useState("menu");

  // =========================
  // Cow Form
  // =========================
  const [tagNumber, setTagNumber] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [status, setStatus] = useState("Active");

  // =========================
  // Cow List
  // =========================
  const [cows, setCows] = useState(() => {
    const savedCows = localStorage.getItem("cows");
    return savedCows ? JSON.parse(savedCows) : [];
  });

  // =========================
  // Milk Production Form
  // =========================
  const [selectedCow, setSelectedCow] = useState("");
  const [productionDate, setProductionDate] = useState("");
  const [productionSession, setProductionSession] =
    useState("Morning");
  const [milkQuantity, setMilkQuantity] = useState("");

  // =========================
  // Milk Production Records
  // =========================
  const [productions, setProductions] = useState(() => {
    const savedProductions =
      localStorage.getItem("cowMilkProduction");

    return savedProductions
      ? JSON.parse(savedProductions)
      : [];
  });

  // =========================
  // Health Form
  // =========================
  const [healthCow, setHealthCow] = useState("");
  const [vaccineName, setVaccineName] = useState("");
  const [vaccinationDate, setVaccinationDate] = useState("");
  const [nextDueDate, setNextDueDate] = useState("");
  const [healthStatus, setHealthStatus] =
    useState("Healthy");
  const [healthNotes, setHealthNotes] = useState("");

  // =========================
  // Health Records
  // =========================
  const [healthRecords, setHealthRecords] = useState(() => {
    const savedHealth =
      localStorage.getItem("cowHealthRecords");

    return savedHealth
      ? JSON.parse(savedHealth)
      : [];
  });

  // =========================
  // Pregnancy Form
  // =========================
  const [pregnancyCow, setPregnancyCow] = useState("");
  const [pregnancyStatus, setPregnancyStatus] =
    useState("Not Pregnant");
  const [pregnancyStartDate, setPregnancyStartDate] =
    useState("");
  const [expectedCalvingDate, setExpectedCalvingDate] =
    useState("");
  const [calvingDate, setCalvingDate] = useState("");
  const [calfGender, setCalfGender] = useState("");
  const [pregnancyNotes, setPregnancyNotes] =
    useState("");

  // =========================
  // Pregnancy Records
  // =========================
  const [pregnancyRecords, setPregnancyRecords] =
    useState(() => {
      const savedPregnancy =
        localStorage.getItem("cowPregnancyRecords");

      return savedPregnancy
        ? JSON.parse(savedPregnancy)
        : [];
    });

  const [message, setMessage] = useState("");

  // =========================
  // Add Cow
  // =========================
  const handleAddCow = () => {
    if (!tagNumber || !breed || !age || !purchaseDate) {
      setMessage("Please fill all cow fields");
      return;
    }

    const loggedInFarmerMobile =
  localStorage.getItem("loggedInFarmerMobile");

const farmers =
  JSON.parse(localStorage.getItem("farmers")) || [];

const loggedInFarmer = farmers.find(
  (farmer) =>
    String(farmer.mobile) ===
    String(loggedInFarmerMobile)
);

const newCow = {
  id: Date.now(),

  farmerMobile: loggedInFarmerMobile,

  farmerId: loggedInFarmer
    ? loggedInFarmer.farmerId
    : "",

  tagNumber,
  breed,
  age: Number(age),
  purchaseDate,
  status,
};
    const updatedCows = [...cows, newCow];

    setCows(updatedCows);

    localStorage.setItem(
      "cows",
      JSON.stringify(updatedCows)
    );

    setTagNumber("");
    setBreed("");
    setAge("");
    setPurchaseDate("");
    setStatus("Active");

    setMessage("Cow added successfully!");
  };

  // =========================
  // Delete Cow
  // =========================
  const handleDeleteCow = (id) => {
    const updatedCows = cows.filter(
      (cow) => cow.id !== id
    );

    setCows(updatedCows);

    localStorage.setItem(
      "cows",
      JSON.stringify(updatedCows)
    );
  };

  // =========================
  // Add Milk Production
  // =========================
  const handleAddProduction = () => {
    if (
      !selectedCow ||
      !productionDate ||
      !milkQuantity
    ) {
      setMessage("Please fill all production fields");
      return;
    }

    const newProduction = {
      id: Date.now(),
      cowId: Number(selectedCow),
      date: productionDate,
      session: productionSession,
      quantity: Number(milkQuantity),
    };

    const updatedProductions = [
      ...productions,
      newProduction,
    ];

    setProductions(updatedProductions);

    localStorage.setItem(
      "cowMilkProduction",
      JSON.stringify(updatedProductions)
    );

    setSelectedCow("");
    setProductionDate("");
    setProductionSession("Morning");
    setMilkQuantity("");

    setMessage(
      "Milk production added successfully!"
    );
  };

  // =========================
  // Selected Cow Production
  // =========================
  const selectedCowProduction = productions.filter(
    (production) =>
      production.cowId === Number(selectedCow)
  );

  const totalMilk = selectedCowProduction.reduce(
    (total, production) =>
      total + production.quantity,
    0
  );

  // =========================
  // Add Health Record
  // =========================
  const handleAddHealth = () => {
    if (
      !healthCow ||
      !vaccineName ||
      !vaccinationDate ||
      !nextDueDate
    ) {
      setMessage("Please fill all health fields");
      return;
    }

    const newHealthRecord = {
      id: Date.now(),
      cowId: Number(healthCow),
      vaccine: vaccineName,
      vaccinationDate,
      nextDueDate,
      healthStatus,
      notes: healthNotes,
    };

    const updatedHealthRecords = [
      ...healthRecords,
      newHealthRecord,
    ];

    setHealthRecords(updatedHealthRecords);

    localStorage.setItem(
      "cowHealthRecords",
      JSON.stringify(updatedHealthRecords)
    );

    setHealthCow("");
    setVaccineName("");
    setVaccinationDate("");
    setNextDueDate("");
    setHealthStatus("Healthy");
    setHealthNotes("");

    setMessage(
      "Health record added successfully!"
    );
  };

  // =========================
  // Add Pregnancy Record
  // =========================
  const handleAddPregnancy = () => {
    if (!pregnancyCow || !pregnancyStatus) {
      setMessage(
        "Please select cow and pregnancy status"
      );
      return;
    }

    const newPregnancyRecord = {
      id: Date.now(),
      cowId: Number(pregnancyCow),
      status: pregnancyStatus,
      pregnancyStartDate,
      expectedCalvingDate,
      calvingDate,
      calfGender,
      notes: pregnancyNotes,
    };

    const updatedRecords = [
      ...pregnancyRecords,
      newPregnancyRecord,
    ];

    setPregnancyRecords(updatedRecords);

    localStorage.setItem(
      "cowPregnancyRecords",
      JSON.stringify(updatedRecords)
    );

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
  };

  // =========================
  // JSX
  // =========================
  return (
    <div className="cows-page">

      {/* =========================
          MAIN MENU
      ========================= */}
     {activeSection === "menu" && (
  <div className="cows-menu">

    <div className="cows-header">
      <div className="cows-icon">🐄</div>
      <h1>Cow Management</h1>
      <p>Manage your cows, health, milk production and pregnancy records.</p>
    </div>

    <div className="cow-menu-grid">

      <button
        className="cow-menu-card"
        onClick={() => {
          setActiveSection("addCow");
          setMessage("");
        }}
      >
        <span>➕</span>
        <strong>Add New Cow</strong>
        <small>Register a new cow</small>
      </button>

      <button
        className="cow-menu-card"
        onClick={() => {
          setActiveSection("myCows");
          setMessage("");
        }}
      >
        <span>🐄</span>
        <strong>My Cows</strong>
        <small>View registered cows</small>
      </button>

      <button
        className="cow-menu-card"
        onClick={() => {
          setActiveSection("milkProduction");
          setMessage("");
        }}
      >
        <span>🥛</span>
        <strong>Milk Production</strong>
        <small>Track cow milk production</small>
      </button>

      <button
        className="cow-menu-card"
        onClick={() => {
          setActiveSection("health");
          setMessage("");
        }}
      >
        <span>❤️</span>
        <strong>Health & Vaccination</strong>
        <small>Manage cow health records</small>
      </button>

      <button
        className="cow-menu-card"
        onClick={() => {
          setActiveSection("pregnancy");
          setMessage("");
        }}
      >
        <span>🤰</span>
        <strong>Pregnancy & Calving</strong>
        <small>Track pregnancy and calving</small>
      </button>

    </div>

  </div>
)}
{activeSection === "addCow" && (
  <div className="cow-section">

    <div className="section-top">
      <div>
        <h1>🐄 Cow Management</h1>
        <p>Add and manage your cow information.</p>
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
          <h2>Add New Cow</h2>
          <p>Enter the basic information of your cow.</p>
        </div>
      </div>

      <div className="cow-form-grid">

        <div className="form-group">
          <label>Cow Tag Number</label>
          <input
            type="text"
            placeholder="Example: COW001"
            value={tagNumber}
            onChange={(e) => setTagNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Breed</label>
          <input
            type="text"
            placeholder="Example: Gir"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Age (Years)</label>
          <input
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Purchase Date</label>
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Pregnant">Pregnant</option>
            <option value="Sold">Sold</option>
            <option value="Inactive">Inactive</option>
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
        <p className="cow-message">{message}</p>
      )}

    </div>

  </div>
)}

     {activeSection === "myCows" && (
  <div className="cow-section">

    <div className="section-top">
      <div>
        <h1>🐄 My Cows</h1>
        <p>View and manage all your registered cows.</p>
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

    <div className="cow-list-card">

      <div className="list-header">
        <div>
          <h2>🐄 Registered Cows</h2>
          <p>Total Cows: <strong>{cows.length}</strong></p>
        </div>
      </div>

      {cows.length === 0 ? (
        <div className="empty-cows">
          <div>🐄</div>
          <h3>No cows added yet</h3>
          <p>Add your first cow to start managing your farm.</p>

          <button
            className="add-cow-button"
            onClick={() => {
              setActiveSection("addCow");
              setMessage("");
            }}
          >
            ➕ Add New Cow
          </button>
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
                    <strong>{cow.tagNumber}</strong>
                  </td>

                  <td>{cow.breed}</td>

                  <td>{cow.age} Years</td>

                  <td>{cow.purchaseDate}</td>

                  <td>
                    <span
                      className={`cow-status ${cow.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {cow.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="delete-cow-button"
                      onClick={() =>
                        handleDeleteCow(cow.id)
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

    {activeSection === "milkProduction" && (
  <div className="cow-section">

    <div className="section-top">
      <div>
        <h1>🥛 Milk Production</h1>
        <p>Track daily milk production for each cow.</p>
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
        <span>🥛</span>
        <div>
          <h2>Add Milk Production</h2>
          <p>Enter the daily milk production details.</p>
        </div>
      </div>

      <div className="cow-form-grid">

        <div className="form-group">
          <label>Select Cow</label>

          <select
            value={selectedCow}
            onChange={(e) => setSelectedCow(e.target.value)}
          >
            <option value="">Select Cow</option>

            {cows.map((cow) => (
              <option
                key={cow.id}
                value={cow.id}
              >
                {cow.tagNumber} - {cow.breed}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>

          <input
            type="date"
            value={productionDate}
            onChange={(e) =>
              setProductionDate(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Session</label>

          <select
            value={productionSession}
            onChange={(e) =>
              setProductionSession(e.target.value)
            }
          >
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>
        </div>

        <div className="form-group">
          <label>Milk Quantity (Litres)</label>

          <input
            type="number"
            placeholder="Example: 8"
            value={milkQuantity}
            onChange={(e) =>
              setMilkQuantity(e.target.value)
            }
          />
        </div>

      </div>

      <button
        className="add-cow-button"
        onClick={handleAddProduction}
      >
        ➕ Add Milk Production
      </button>

      {message && (
        <p className="cow-message">{message}</p>
      )}

    </div>

    <div className="cow-list-card milk-history-card">

      <div className="list-header">
        <div>
          <h2>📊 Cow Milk Production History</h2>
          <p>
            Select a cow to view its production history.
          </p>
        </div>
      </div>

      {selectedCow ? (
        <>
          <div className="milk-total-box">
            <span>🥛 Total Milk Production</span>
            <strong>{totalMilk} Litres</strong>
          </div>

          {selectedCowProduction.length === 0 ? (
            <div className="empty-cows">
              <div>🥛</div>
              <h3>No production records</h3>
              <p>
                No milk production records found for this cow.
              </p>
            </div>
          ) : (
            <div className="cow-table-container">
              <table>

                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Session</th>
                    <th>Quantity</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedCowProduction.map((production) => (
                    <tr key={production.id}>

                      <td>{production.date}</td>

                      <td>
                        <span className="session-badge">
                          {production.session}
                        </span>
                      </td>

                      <td>
                        <strong>
                          {production.quantity} L
                        </strong>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </>
      ) : (
        <div className="empty-cows">
          <div>🐄</div>
          <h3>Select a Cow</h3>
          <p>
            Select a cow from the form above to view its
            milk production history.
          </p>
        </div>
      )}

    </div>

  </div>
)}
     {activeSection === "health" && (
  <div className="cow-section">

    <div className="section-top">
      <div>
        <h1>❤️ Health & Vaccination</h1>
        <p>Track cow health and vaccination records.</p>
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
        <span>🩺</span>
        <div>
          <h2>Add Health Record</h2>
          <p>Enter vaccination and health information.</p>
        </div>
      </div>

      <div className="cow-form-grid">

        <div className="form-group">
          <label>Select Cow</label>

          <select
            value={healthCow}
            onChange={(e) =>
              setHealthCow(e.target.value)
            }
          >
            <option value="">Select Cow</option>

            {cows.map((cow) => (
              <option
                key={cow.id}
                value={cow.id}
              >
                {cow.tagNumber} - {cow.breed}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Vaccine Name</label>

          <input
            type="text"
            placeholder="Example: FMD"
            value={vaccineName}
            onChange={(e) =>
              setVaccineName(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Vaccination Date</label>

          <input
            type="date"
            value={vaccinationDate}
            onChange={(e) =>
              setVaccinationDate(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Next Due Date</label>

          <input
            type="date"
            value={nextDueDate}
            onChange={(e) =>
              setNextDueDate(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Health Status</label>

          <select
            value={healthStatus}
            onChange={(e) =>
              setHealthStatus(e.target.value)
            }
          >
            <option value="Healthy">Healthy</option>
            <option value="Sick">Sick</option>
            <option value="Under Treatment">
              Under Treatment
            </option>
          </select>
        </div>

        <div className="form-group full-width">
          <label>Health Notes</label>

          <textarea
            placeholder="Enter health notes"
            value={healthNotes}
            onChange={(e) =>
              setHealthNotes(e.target.value)
            }
          />
        </div>

      </div>

      <button
        className="add-cow-button"
        onClick={handleAddHealth}
      >
        ➕ Add Health Record
      </button>

      {message && (
        <p className="cow-message">{message}</p>
      )}

    </div>

    <div className="cow-list-card health-history-card">

      <div className="list-header">
        <div>
          <h2>📋 Health & Vaccination History</h2>
          <p>View all recorded health information.</p>
        </div>
      </div>

      {healthRecords.length === 0 ? (
        <div className="empty-cows">
          <div>🩺</div>
          <h3>No health records available</h3>
          <p>
            Add a health record to start tracking cow health.
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
              {healthRecords.map((record) => {

                const cow = cows.find(
                  (cow) => cow.id === record.cowId
                );

                return (
                  <tr key={record.id}>

                    <td>
                      <strong>
                        {cow ? cow.tagNumber : "Unknown"}
                      </strong>
                    </td>

                    <td>{record.vaccine}</td>

                    <td>{record.vaccinationDate}</td>

                    <td>{record.nextDueDate}</td>

                    <td>
                      <span
                        className={`health-status ${record.healthStatus
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {record.healthStatus}
                      </span>
                    </td>

                    <td>
                      {record.notes || "-"}
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}

    </div>

  </div>
)}
      {activeSection === "pregnancy" && (
  <div className="cow-section">

    <div className="section-top">
      <div>
        <h1>🤰 Pregnancy & Calving Management</h1>
        <p>Track pregnancy and calving information for your cows.</p>
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
        <span>🤰</span>
        <div>
          <h2>Add Pregnancy Record</h2>
          <p>Enter pregnancy and calving details.</p>
        </div>
      </div>

      <div className="cow-form-grid">

        <div className="form-group">
          <label>Select Cow</label>

          <select
            value={pregnancyCow}
            onChange={(e) =>
              setPregnancyCow(e.target.value)
            }
          >
            <option value="">Select Cow</option>

            {cows.map((cow) => (
              <option
                key={cow.id}
                value={cow.id}
              >
                {cow.tagNumber} - {cow.breed}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Pregnancy Status</label>

          <select
            value={pregnancyStatus}
            onChange={(e) =>
              setPregnancyStatus(e.target.value)
            }
          >
            <option value="Not Pregnant">
              Not Pregnant
            </option>

            <option value="Pregnant">
              Pregnant
            </option>

            <option value="Delivered">
              Delivered
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>Pregnancy Start Date</label>

          <input
            type="date"
            value={pregnancyStartDate}
            onChange={(e) =>
              setPregnancyStartDate(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Expected Calving Date</label>

          <input
            type="date"
            value={expectedCalvingDate}
            onChange={(e) =>
              setExpectedCalvingDate(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Calving Date</label>

          <input
            type="date"
            value={calvingDate}
            onChange={(e) =>
              setCalvingDate(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Calf Gender</label>

          <select
            value={calfGender}
            onChange={(e) =>
              setCalfGender(e.target.value)
            }
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label>Notes</label>

          <textarea
            value={pregnancyNotes}
            onChange={(e) =>
              setPregnancyNotes(e.target.value)
            }
            placeholder="Enter pregnancy/calving notes"
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
        <p className="cow-message">{message}</p>
      )}

    </div>

    <div className="cow-list-card pregnancy-history-card">

      <div className="list-header">
        <div>
          <h2>📋 Pregnancy & Calving History</h2>
          <p>View all pregnancy and calving records.</p>
        </div>
      </div>

      {pregnancyRecords.length === 0 ? (
        <div className="empty-cows">
          <div>🤰</div>

          <h3>No pregnancy records available</h3>

          <p>
            Add a pregnancy record to start tracking
            pregnancy and calving information.
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
              {pregnancyRecords.map((record) => {

                const cow = cows.find(
                  (cow) => cow.id === record.cowId
                );

                return (
                  <tr key={record.id}>

                    <td>
                      <strong>
                        {cow
                          ? cow.tagNumber
                          : "Unknown"}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`pregnancy-status ${record.status
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {record.status}
                      </span>
                    </td>

                    <td>
                      {record.pregnancyStartDate || "-"}
                    </td>

                    <td>
                      {record.expectedCalvingDate || "-"}
                    </td>

                    <td>
                      {record.calvingDate || "-"}
                    </td>

                    <td>
                      {record.calfGender || "-"}
                    </td>

                    <td>
                      {record.notes || "-"}
                    </td>

                  </tr>
                );
              })}
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
