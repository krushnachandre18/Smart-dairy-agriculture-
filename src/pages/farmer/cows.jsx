import { useState } from "react";
import "./Cows.css";

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

    const newCow = {
      id: Date.now(),
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
        <>
          <h1>🐄 Cow Management</h1>

          <button
            onClick={() => {
              setActiveSection("addCow");
              setMessage("");
            }}
          >
            ➕ Add New Cow
          </button>

          <br />
          <br />

          <button
            onClick={() => {
              setActiveSection("myCows");
              setMessage("");
            }}
          >
            🐄 My Cows
          </button>

          <br />
          <br />

          <button
            onClick={() => {
              setActiveSection("milkProduction");
              setMessage("");
            }}
          >
            🥛 Milk Production
          </button>

          <br />
          <br />

          <button
            onClick={() => {
              setActiveSection("health");
              setMessage("");
            }}
          >
            ❤️ Health & Vaccination
          </button>

          <br />
          <br />

          <button
            onClick={() => {
              setActiveSection("pregnancy");
              setMessage("");
            }}
          >
            🤰 Pregnancy & Calving
          </button>
        </>
      )}

      {/* =========================
          ADD NEW COW
      ========================= */}
      {activeSection === "addCow" && (
        <>
          <h1>🐄 Cow Management</h1>
          <button
            onClick={() => {
              setActiveSection("menu");
              setMessage("");
            }}
          >
            ← Back
          </button>
          <hr />

          <h2>➕ Add New Cow</h2>

          <label>Cow Tag Number</label>
          <br />

          <input
            type="text"
            placeholder="Example: COW001"
            value={tagNumber}
            onChange={(e) =>
              setTagNumber(e.target.value)
            }
          />

          <br />
          <br />

          <label>Breed</label>
          <br />

          <input
            type="text"
            placeholder="Example: Gir"
            value={breed}
            onChange={(e) =>
              setBreed(e.target.value)
            }
          />

          <br />
          <br />

          <label>Age (Years)</label>
          <br />

          <input
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) =>
              setAge(e.target.value)
            }
          />

          <br />
          <br />

          <label>Purchase Date</label>
          <br />

          <input
            type="date"
            value={purchaseDate}
            onChange={(e) =>
              setPurchaseDate(e.target.value)
            }
          />

          <br />
          <br />

          <label>Status</label>
          <br />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option value="Active">Active</option>
            <option value="Pregnant">Pregnant</option>
            <option value="Sold">Sold</option>
            <option value="Inactive">Inactive</option>
          </select>

          <br />
          <br />

          <button onClick={handleAddCow}>
            Add Cow
          </button>

          <p>{message}</p>

          <br />

          
        </>
      )}

      {/* =========================
          MY COWS
      ========================= */}
      {activeSection === "myCows" && (
        <>
          <h1>🐄 My Cows</h1>
          <button
            onClick={() => {
              setActiveSection("menu");
              setMessage("");
            }}
          >
            ← Back
          </button>
          <hr />

          {cows.length === 0 ? (
            <p>No cows added yet.</p>
          ) : (
            <table border="1" cellPadding="8">
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
                    <td>{cow.tagNumber}</td>
                    <td>{cow.breed}</td>
                    <td>{cow.age} Years</td>
                    <td>{cow.purchaseDate}</td>
                    <td>{cow.status}</td>

                    <td>
                      <button
                        onClick={() =>
                          handleDeleteCow(cow.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <br />
          <br />

         
        </>
      )}

      {/* =========================
          MILK PRODUCTION
      ========================= */}
      {activeSection === "milkProduction" && (
        <>
          <h1>🥛 Milk Production</h1>
          <button
            onClick={() => {
              setActiveSection("menu");
              setMessage("");
            }}
          >
            ← Back
          </button>
          <hr />

          <h3>🥛 Add Milk Production</h3>

          <label>Select Cow</label>
          <br />

          <select
            value={selectedCow}
            onChange={(e) =>
              setSelectedCow(e.target.value)
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

          <br />
          <br />

          <label>Date</label>
          <br />

          <input
            type="date"
            value={productionDate}
            onChange={(e) =>
              setProductionDate(e.target.value)
            }
          />

          <br />
          <br />

          <label>Session</label>
          <br />

          <select
            value={productionSession}
            onChange={(e) =>
              setProductionSession(e.target.value)
            }
          >
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>

          <br />
          <br />

          <label>Milk Quantity (Litres)</label>
          <br />

          <input
            type="number"
            placeholder="Example: 8"
            value={milkQuantity}
            onChange={(e) =>
              setMilkQuantity(e.target.value)
            }
          />

          <br />
          <br />

          <button onClick={handleAddProduction}>
            Add Milk Production
          </button>

          <p>{message}</p>

          <hr />

          <h3>📊 Cow Milk Production History</h3>

          {selectedCow ? (
            <>
              <p>
                <strong>Total Milk:</strong>{" "}
                {totalMilk} Litres
              </p>

              {selectedCowProduction.length === 0 ? (
                <p>
                  No production records for this cow.
                </p>
              ) : (
                <table border="1" cellPadding="8">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Session</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>

                  <tbody>
                    {selectedCowProduction.map(
                      (production) => (
                        <tr key={production.id}>
                          <td>
                            {production.date}
                          </td>

                          <td>
                            {production.session}
                          </td>

                          <td>
                            {production.quantity} L
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              )}
            </>
          ) : (
            <p>
              Select a cow to view milk production
              history.
            </p>
          )}

          <br />

          
        </>
      )}

      {/* =========================
          HEALTH & VACCINATION
      ========================= */}
      {activeSection === "health" && (
        <>
          <h1>❤️ Health & Vaccination</h1>
          <button
            onClick={() => {
              setActiveSection("menu");
              setMessage("");
            }}
          >
            ← Back
          </button>
          <hr />

          <h3>🩺 Add Health Record</h3>

          <label>Select Cow</label>
          <br />

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

          <br />
          <br />

          <label>Vaccine Name</label>
          <br />

          <input
            type="text"
            placeholder="Example: FMD"
            value={vaccineName}
            onChange={(e) =>
              setVaccineName(e.target.value)
            }
          />

          <br />
          <br />

          <label>Vaccination Date</label>
          <br />

          <input
            type="date"
            value={vaccinationDate}
            onChange={(e) =>
              setVaccinationDate(e.target.value)
            }
          />

          <br />
          <br />

          <label>Next Due Date</label>
          <br />

          <input
            type="date"
            value={nextDueDate}
            onChange={(e) =>
              setNextDueDate(e.target.value)
            }
          />

          <br />
          <br />

          <label>Health Status</label>
          <br />

          <select
            value={healthStatus}
            onChange={(e) =>
              setHealthStatus(e.target.value)
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
          </select>

          <br />
          <br />

          <label>Health Notes</label>
          <br />

          <textarea
            placeholder="Enter health notes"
            value={healthNotes}
            onChange={(e) =>
              setHealthNotes(e.target.value)
            }
          />

          <br />
          <br />

          <button onClick={handleAddHealth}>
            Add Health Record
          </button>

          <p>{message}</p>

          <hr />

          <h3>
            📋 Health & Vaccination History
          </h3>

          {healthRecords.length === 0 ? (
            <p>
              No health records available.
            </p>
          ) : (
            <table border="1" cellPadding="8">
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
                    (cow) =>
                      cow.id === record.cowId
                  );

                  return (
                    <tr key={record.id}>
                      <td>
                        {cow
                          ? cow.tagNumber
                          : "Unknown"}
                      </td>

                      <td>
                        {record.vaccine}
                      </td>

                      <td>
                        {record.vaccinationDate}
                      </td>

                      <td>
                        {record.nextDueDate}
                      </td>

                      <td>
                        {record.healthStatus}
                      </td>

                      <td>
                        {record.notes || "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          <br />

          
        </>
      )}

      {/* =========================
          PREGNANCY & CALVING
      ========================= */}
      {activeSection === "pregnancy" && (
        <>
          <h1>
            🤰 Pregnancy & Calving Management
          </h1>
<button
            onClick={() => {
              setActiveSection("menu");
              setMessage("");
            }}
          >
            ← Back
          </button>
          <hr />

          <label>Select Cow:</label>
          <br />

          <select
            value={pregnancyCow}
            onChange={(e) =>
              setPregnancyCow(e.target.value)
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
                {cow.tagNumber} - {cow.breed}
              </option>
            ))}
          </select>

          <br />
          <br />

          <label>Pregnancy Status:</label>
          <br />

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

          <br />
          <br />

          <label>Pregnancy Start Date:</label>
          <br />

          <input
            type="date"
            value={pregnancyStartDate}
            onChange={(e) =>
              setPregnancyStartDate(
                e.target.value
              )
            }
          />

          <br />
          <br />

          <label>Expected Calving Date:</label>
          <br />

          <input
            type="date"
            value={expectedCalvingDate}
            onChange={(e) =>
              setExpectedCalvingDate(
                e.target.value
              )
            }
          />

          <br />
          <br />

          <label>Calving Date:</label>
          <br />

          <input
            type="date"
            value={calvingDate}
            onChange={(e) =>
              setCalvingDate(e.target.value)
            }
          />

          <br />
          <br />

          <label>Calf Gender:</label>
          <br />

          <select
            value={calfGender}
            onChange={(e) =>
              setCalfGender(e.target.value)
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

          <br />
          <br />

          <label>Notes:</label>
          <br />

          <textarea
            value={pregnancyNotes}
            onChange={(e) =>
              setPregnancyNotes(
                e.target.value
              )
            }
            placeholder="Enter pregnancy/calving notes"
          />

          <br />
          <br />

          <button onClick={handleAddPregnancy}>
            🤰 Add Pregnancy Record
          </button>

          <p>{message}</p>

          <hr />

          <h3>
            📋 Pregnancy & Calving History
          </h3>

          {pregnancyRecords.length === 0 ? (
            <p>
              No pregnancy records available.
            </p>
          ) : (
            <table border="1" cellPadding="8">
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
                    (cow) =>
                      cow.id === record.cowId
                  );

                  return (
                    <tr key={record.id}>
                      <td>
                        {cow
                          ? cow.tagNumber
                          : "Unknown"}
                      </td>

                      <td>
                        {record.status}
                      </td>

                      <td>
                        {record.pregnancyStartDate ||
                          "-"}
                      </td>

                      <td>
                        {record.expectedCalvingDate ||
                          "-"}
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
          )}

          <br />

          
        </>
      )}
    </div>
  );
}

export default Cows;