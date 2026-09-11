import { useState } from "react";
import "./MilkCollection.css";

function MilkCollection() {
  const [session, setSession] = useState("Morning");
  const [quantity, setQuantity] = useState("");
  const [fat, setFat] = useState("");
  const [snf, setSnf] = useState("");

  // Saved records from localStorage
  const [records, setRecords] = useState(() => {
    const savedRecords = localStorage.getItem("milkRecords");
    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  const [message, setMessage] = useState("");

  // Automatic rate calculation
  const calculatedRate =
    fat && snf
      ? 30 + Number(fat) * 2 + Number(snf)
      : 0;

  // Total amount calculation
  const totalAmount =
    quantity && fat && snf
      ? Number(quantity) * calculatedRate
      : 0;

  // Add Milk Record
  const handleAddMilk = () => {
    if (!quantity || !fat || !snf) {
      setMessage("Please fill all fields");
      return;
    }

    const newRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      session: session,
      quantity: Number(quantity),
      fat: Number(fat),
      snf: Number(snf),
      rate: calculatedRate,
      amount: totalAmount,
      status: "Pending",
    };

    const updatedRecords = [...records, newRecord];

    // Update React state
    setRecords(updatedRecords);

    // Save records in browser
    localStorage.setItem(
      "milkRecords",
      JSON.stringify(updatedRecords)
    );

    // Clear form
    setQuantity("");
    setFat("");
    setSnf("");

    setMessage("Milk record added successfully!");
  };

  // Verify milk record
  const handleVerify = (id) => {
    const updatedRecords = records.map((record) =>
      record.id === id
        ? { ...record, status: "Verified" }
        : record
    );

    setRecords(updatedRecords);

    // Update localStorage
    localStorage.setItem(
      "milkRecords",
      JSON.stringify(updatedRecords)
    );
  };

  return (
  <div className="milk-page">

    {/* Header */}
    <div className="milk-header">
      <div>
        <span className="milk-badge">🥛 DAIRY MANAGEMENT</span>
        <h1>Milk Collection</h1>
        <p>Record and manage daily milk collection details.</p>
      </div>

      <div className="milk-header-icon">🥛</div>
    </div>

    {/* Milk Entry */}
    <div className="milk-card">

      <div className="milk-card-heading">
        <div>
          <h2>📝 Milk Entry</h2>
          <p>Enter today's milk collection details.</p>
        </div>
      </div>

      <div className="milk-form-grid">

        <div className="milk-form-group">
          <label>Collection Time</label>
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
          >
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>
        </div>

        <div className="milk-form-group">
          <label>Milk Quantity (Litres)</label>
          <input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="milk-form-group">
          <label>Fat (%)</label>
          <input
            type="number"
            step="0.1"
            placeholder="Enter fat"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
          />
        </div>

        <div className="milk-form-group">
          <label>SNF (%)</label>
          <input
            type="number"
            step="0.1"
            placeholder="Enter SNF"
            value={snf}
            onChange={(e) => setSnf(e.target.value)}
          />
        </div>

      </div>

      {/* Calculation */}
      <div className="milk-calculation">

        <div className="calculation-box">
          <span>💰 Calculated Rate</span>
          <strong>₹{calculatedRate.toFixed(2)}</strong>
          <small>per litre</small>
        </div>

        <div className="calculation-box amount-box">
          <span>💵 Total Amount</span>
          <strong>₹{totalAmount.toFixed(2)}</strong>
          <small>estimated payment</small>
        </div>

      </div>

      <button
        className="add-milk-button"
        onClick={handleAddMilk}
      >
        + Add Milk Record
      </button>

      {message && (
        <div className="milk-message">
          {message}
        </div>
      )}

    </div>

    {/* Records */}
    <div className="milk-card">

      <div className="milk-card-heading">
        <div>
          <h2>📋 Milk Records</h2>
          <p>View and verify your milk collection records.</p>
        </div>

        <div className="record-count">
          {records.length} Records
        </div>
      </div>

      {records.length === 0 ? (

        <div className="milk-empty">
          <div>🥛</div>
          <h3>No Milk Records</h3>
          <p>
            Add your first milk collection record using the form above.
          </p>
        </div>

      ) : (

        <div className="milk-table-container">
          <table className="milk-table">

            <thead>
              <tr>
                <th>Date</th>
                <th>Session</th>
                <th>Quantity</th>
                <th>Fat</th>
                <th>SNF</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records.map((record) => (

                <tr key={record.id}>

                  <td>{record.date}</td>

                  <td>
                    <span className="session-badge">
                      {record.session === "Morning"
                        ? "🌅 Morning"
                        : "🌙 Evening"}
                    </span>
                  </td>

                  <td>
                    <strong>{record.quantity} L</strong>
                  </td>

                  <td>{record.fat}%</td>

                  <td>{record.snf}%</td>

                  <td>
                    ₹{record.rate.toFixed(2)}
                  </td>

                  <td>
                    <strong>
                      ₹{record.amount.toFixed(2)}
                    </strong>
                  </td>

                  <td>
                    {record.status === "Pending" ? (
                      <span className="status-pending">
                        Pending
                      </span>
                    ) : (
                      <span className="status-verified">
                        ✓ Verified
                      </span>
                    )}
                  </td>

                  <td>
                    {record.status === "Pending" ? (
                      <button
                        className="verify-button"
                        onClick={() =>
                          handleVerify(record.id)
                        }
                      >
                        Verify
                      </button>
                    ) : (
                      <span className="verified-text">
                        ✅ Verified
                      </span>
                    )}
                  </td>

                </tr>

              ))}
            </tbody>

          </table>
        </div>

      )}

    </div>

    {/* Footer */}
    <div className="milk-footer">
      🐄 Smart Dairy & Farmer Farm Management System
    </div>

  </div>
);
}

export default MilkCollection;