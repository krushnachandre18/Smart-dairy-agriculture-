import { useState } from "react";

function MilkCollection() {const [session, setSession] = useState("Morning");
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
    <div>
      <h1>🥛 Milk Collection</h1>

      <h3>Milk Entry</h3>

      <label>Collection Time</label>
      <br />

      <select
        value={session}
        onChange={(e) => setSession(e.target.value)}
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
        placeholder="Enter quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <br />
      <br />

      <label>Fat (%)</label>
      <br />

      <input
        type="number"
        step="0.1"
        placeholder="Enter fat"
        value={fat}
        onChange={(e) => setFat(e.target.value)}
      />

      <br />
      <br />

      <label>SNF (%)</label>
      <br />

      <input
        type="number"
        step="0.1"
        placeholder="Enter SNF"
        value={snf}
        onChange={(e) => setSnf(e.target.value)}
      />

      <br />
      <br />

      {/* Calculated Rate */}
      <p>
        <strong>Calculated Rate:</strong> ₹
        {calculatedRate.toFixed(2)} per litre
      </p>

      {/* Total Amount */}
      <p>
        <strong>Total Amount:</strong> ₹
        {totalAmount.toFixed(2)}
      </p>

      <br />

      <button onClick={handleAddMilk}>
        Add Milk
      </button>

      <p>{message}</p>

      <hr />

      <h3>📋 Milk Records</h3>

      {records.length === 0 ? (
        <p>No milk records available.</p>
      ) : (
        <table border="1" cellPadding="8">
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

                <td>{record.session}</td>

                <td>{record.quantity} L</td>

                <td>{record.fat}%</td>

                <td>{record.snf}%</td>

                <td>
                  ₹{record.rate.toFixed(2)}
                </td>

                <td>
                  ₹{record.amount.toFixed(2)}
                </td>

                <td>{record.status}</td>

                <td>
                  {record.status === "Pending" ? (
                    <button
                      onClick={() =>
                        handleVerify(record.id)
                      }
                    >
                      Verify
                    </button>
                  ) : (
                    "✅ Verified"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MilkCollection;