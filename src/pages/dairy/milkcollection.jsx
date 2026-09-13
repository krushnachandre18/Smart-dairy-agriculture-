import { useEffect,useState } from "react";
import "./MilkCollection.css";

function MilkCollection() {
  
  const [farmers] = useState(() => {
    const savedFarmers = localStorage.getItem("farmers");

    return savedFarmers ? JSON.parse(savedFarmers) : [];
  });
  

  const [selectedFarmer, setSelectedFarmer] = useState("");

  const [session, setSession] = useState("Morning");
  const [quantity, setQuantity] = useState("");
  const [fat, setFat] = useState("");
  const [snf, setSnf] = useState("");

  const [records, setRecords] = useState(() => {
    const savedRecords = localStorage.getItem("milkRecords");
    const farmerMobile = localStorage.getItem("loggedInFarmerMobile");

    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  const selectedFarmerData = farmers.find(
    (farmer) => farmer.farmerId === selectedFarmer
  );

  const rate =
    fat && snf
      ? 30 + Number(fat) * 2 + Number(snf) * 1
      : 0;

  const amount =
    quantity && rate
      ? Number(quantity) * rate
      : 0;

  const handleAddRecord = (e) => {
    e.preventDefault();

    if (!selectedFarmer) {
      alert("Please select Farmer");
      return;
    }

    if (!quantity || !fat || !snf) {
      alert("Please fill all milk details");
      return;
    }

    const newRecord = {
      id: Date.now(),

      farmerId: selectedFarmerData.farmerId,

      farmerName: selectedFarmerData.name,

      date: new Date().toLocaleDateString(),

      session: session,

      quantity: Number(quantity),

      fat: Number(fat),

      snf: Number(snf),

      rate: Number(rate.toFixed(2)),

      amount: Number(amount.toFixed(2)),

      status: "Pending",
    };

    const updatedRecords = [...records, newRecord];

    setRecords(updatedRecords);

    localStorage.setItem(
      "milkRecords",
      JSON.stringify(updatedRecords)
    );

    setSelectedFarmer("");
    setQuantity("");
    setFat("");
    setSnf("");

    alert("Milk collection added successfully");
  };

  return (
    <div className="milk-collection-page">
      <div className="milk-collection-card">
        <h1>Milk Collection</h1>

        <form onSubmit={handleAddRecord}>
          {/* Farmer Dropdown */}

          <div className="form-group">
            <label>Select Farmer</label>

            <select
              value={selectedFarmer}
              onChange={(e) => setSelectedFarmer(e.target.value)}
            >
              <option value="">Select Farmer</option>

              {farmers.map((farmer) => (
                <option
                  key={farmer.id}
                  value={farmer.farmerId}
                >
                  {farmer.farmerId} - {farmer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Farmer Details */}

          {selectedFarmerData && (
            <div className="selected-farmer-box">
              <p>
                <strong>Farmer ID:</strong>{" "}
                {selectedFarmerData.farmerId}
              </p>

              <p>
                <strong>Farmer Name:</strong>{" "}
                {selectedFarmerData.name}
              </p>
            </div>
          )}

          {/* Session */}

          <div className="form-group">
            <label>Milk Session</label>

            <select
              value={session}
              onChange={(e) => setSession(e.target.value)}
            >
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
            </select>
          </div>

          {/* Quantity */}

          <div className="form-group">
            <label>Milk Quantity (Litres)</label>

            <input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {/* Fat */}

          <div className="form-group">
            <label>Fat</label>

            <input
              type="number"
              step="0.1"
              placeholder="Enter fat"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
            />
          </div>

          {/* SNF */}

          <div className="form-group">
            <label>SNF</label>

            <input
              type="number"
              step="0.1"
              placeholder="Enter SNF"
              value={snf}
              onChange={(e) => setSnf(e.target.value)}
            />
          </div>

          {/* Rate */}

          <div className="calculation-box">
            <p>
              <strong>Rate:</strong> ₹{rate.toFixed(2)}
            </p>

            <p>
              <strong>Total Amount:</strong> ₹
              {amount.toFixed(2)}
            </p>
          </div>

          <button type="submit">
            Add Milk Collection
          </button>
        </form>
      </div>

      {/* Milk Records Table */}

      <div className="milk-records-card">
        <h2>Milk Collection Records</h2>

        {records.length === 0 ? (
          <p>No milk records available.</p>
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
                    <td>{record.farmerId || "Not Available"}</td>

                    <td>{record.farmerName || "Not Available"}</td>

                    <td>{record.date}</td>

                    <td>{record.session}</td>

                    <td>{record.quantity} L</td>

                    <td>{record.fat}</td>

                    <td>{record.snf}</td>

                    <td>₹{Number(record.rate || 0).toFixed(2)}</td>

                    <td>₹{Number(record.amount || 0).toFixed(2)}</td>

                    <td>{record.status || "Pending"}</td>
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