import { useEffect, useState } from "react";
import "./MilkCollection.css";

function MilkCollection() {
  // ==========================================
// FORMAT DATE
// ==========================================

const formatDate = (dateValue) => {
  if (!dateValue) {
    return "-";
  }

  const date = new Date(dateValue);

  if (isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
  const [farmers, setFarmers] = useState([]);

  const [selectedFarmer, setSelectedFarmer] =
    useState("");

  const [session, setSession] =
    useState("Morning");

  const [quantity, setQuantity] =
    useState("");

  const [fat, setFat] =
    useState("");

  const [snf, setSnf] =
    useState("");

  const [records, setRecords] =
    useState([]);

  const selectedFarmerData = farmers.find(
    (farmer) =>
      farmer.farmer_id === selectedFarmer
  );

  const rate =
    fat && snf
      ? 30 + Number(fat) * 2 + Number(snf) * 1
      : 0;

  const amount =
    quantity && rate
      ? Number(quantity) * rate
      : 0;

  // ==========================================
  // LOAD FARMERS + MILK RECORDS
  // ==========================================
  useEffect(() => {
    loadFarmers();
    loadMilkRecords();
  }, []);

  const loadFarmers = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/farmers"
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to load farmers."
        );
        return;
      }

      setFarmers(data.farmers || []);
    } catch (error) {
      console.error(
        "Load farmers error:",
        error
      );

      alert(
        "Cannot connect to server. Please make sure backend is running."
      );
    }
  };

  const loadMilkRecords = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/milk-records"
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to load milk records."
        );
        return;
      }

      setRecords(
  Array.isArray(data.records)
    ? data.records.map((record) => ({
        ...record,
        farmerId: record.farmerCode,
        farmerName: record.farmerName,
      }))
    : []
);
    } catch (error) {
      console.error(
        "Load milk records error:",
        error
      );

      alert(
        "Cannot connect to server. Please make sure backend is running."
      );
    }
  };

  // ==========================================
  // ADD MILK RECORD
  // ==========================================
  const handleAddRecord = async (e) => {
    e.preventDefault();

    if (!selectedFarmer) {
      alert("Please select Farmer");
      return;
    }

    if (!quantity || !fat || !snf) {
      alert("Please fill all milk details");
      return;
    }

    if (!selectedFarmerData) {
      alert("Selected farmer not found.");
      return;
    }

    // MySQL DATE format
    const today =
      new Date().toISOString().split("T")[0];
      // Check duplicate session for same farmer and date
const duplicateRecord = records.find(
  (record) =>
    String(record.farmerCode) ===
      String(selectedFarmerData.farmer_id) &&
    String(record.collection_date).startsWith(
      today
    ) &&
    String(record.session).toLowerCase() ===
      String(session).toLowerCase()
);
if (duplicateRecord) {
  alert(
    `Milk collection for ${selectedFarmerData.farmer_id} - ${session} is already recorded today.`
  );
  return;
}

    try {
      const response = await fetch(
        "http://localhost:5000/api/milk-records",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            farmerId:
              selectedFarmerData.farmer_id,

            collectionDate: today,

            session: session,

            quantity: Number(quantity),

            fat: Number(fat),

            snf: Number(snf),

            rate: Number(rate.toFixed(2)),

            amount: Number(amount.toFixed(2)),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to add milk collection."
        );
        return;
      }

      // Reload records from MySQL
      await loadMilkRecords();

      // Reset form
      setSelectedFarmer("");
      setQuantity("");
      setFat("");
      setSnf("");

      alert(
        "Milk collection added successfully"
      );
    } catch (error) {
      console.error(
        "Add milk record error:",
        error
      );

      alert(
        "Cannot connect to server. Please make sure backend is running."
      );
    }
  };

  return (
    <div className="milk-collection-page">

      <div className="milk-collection-card">

        <h1>Milk Collection</h1>

        <form onSubmit={handleAddRecord}>

          {/* Farmer Dropdown */}
          <div className="form-group">

            <label>
              Select Farmer
            </label>

            <select
              value={selectedFarmer}
              onChange={(e) =>
                setSelectedFarmer(
                  e.target.value
                )
              }
            >

              <option value="">
                Select Farmer
              </option>

              {farmers.map((farmer) => (

                <option
                  key={farmer.id}
                  value={farmer.farmer_id}
                >
                  {farmer.farmer_id} -{" "}
                  {farmer.name}
                </option>

              ))}

            </select>

          </div>

          {/* Selected Farmer Details */}
          {selectedFarmerData && (

            <div className="selected-farmer-box">

              <p>
                <strong>
                  Farmer ID:
                </strong>{" "}
                {selectedFarmerData.farmer_id}
              </p>

              <p>
                <strong>
                  Farmer Name:
                </strong>{" "}
                {selectedFarmerData.name}
              </p>

              <p>
                <strong>
                  Mobile:
                </strong>{" "}
                {selectedFarmerData.mobile}
              </p>

            </div>

          )}

          {/* Session */}
          <div className="form-group">

            <label>
              Milk Session
            </label>

            <select
              value={session}
              onChange={(e) =>
                setSession(e.target.value)
              }
            >

              <option value="Morning">
                Morning
              </option>

              <option value="Evening">
                Evening
              </option>

            </select>

          </div>

          {/* Quantity */}
          <div className="form-group">

            <label>
              Milk Quantity (Litres)
            </label>

            <input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
              min="0"
              step="0.01"
            />

          </div>

          {/* Fat */}
          <div className="form-group">

            <label>
              Fat
            </label>

            <input
              type="number"
              step="0.1"
              placeholder="Enter fat"
              value={fat}
              onChange={(e) =>
                setFat(e.target.value)
              }
              min="0"
            />

          </div>

          {/* SNF */}
          <div className="form-group">

            <label>
              SNF
            </label>

            <input
              type="number"
              step="0.1"
              placeholder="Enter SNF"
              value={snf}
              onChange={(e) =>
                setSnf(e.target.value)
              }
              min="0"
            />

          </div>

          {/* Rate */}
          <div className="calculation-box">

            <p>
              <strong>
                Rate:
              </strong>{" "}
              ₹{rate.toFixed(2)}
            </p>

            <p>
              <strong>
                Total Amount:
              </strong>{" "}
              ₹{amount.toFixed(2)}
            </p>

          </div>

          <button type="submit">
            Add Milk Collection
          </button>

        </form>

      </div>

      {/* Milk Records Table */}
      <div className="milk-records-card">

        <h2>
          Milk Collection Records
        </h2>

        {records.length === 0 ? (

          <p>
            No milk records available.
          </p>

        ) : (

          <div className="milk-table-container">

            <table>

              <thead>

                <tr>

                  <th>Farmer ID</th>

                  <th>Farmer Name</th>

                  <th>Date</th>

                  <th>Session</th>

                  <th>Quantity</th>

                  <th>Fat</th>

                  <th>SNF</th>

                  <th>Rate</th>

                  <th>Amount</th>

                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                {records.map((record) => (

                  <tr key={record.id}>

                    <td>
                      {record.farmerId ||
                        "Not Available"}
                    </td>

                    <td>
                      {record.farmerName ||
                        "Not Available"}
                    </td>

                    <td>
                      {formatDate(record.collection_date)}
                    </td>

                    <td>
                      {record.session ||
                        "-"}
                    </td>

                    <td>
                      {Number(
                        record.quantity || 0
                      )}{" "}
                      L
                    </td>

                    <td>
                      {Number(
                        record.fat || 0
                      ).toFixed(2)}
                    </td>

                    <td>
                      {Number(
                        record.snf || 0
                      ).toFixed(2)}
                    </td>

                    <td>
                      ₹
                      {Number(
                        record.rate || 0
                      ).toFixed(2)}
                    </td>

                    <td>
                      ₹
                      {Number(
                        record.amount || 0
                      ).toFixed(2)}
                    </td>

                    <td>
                      {record.status ||
                        "Pending"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default MilkCollection;