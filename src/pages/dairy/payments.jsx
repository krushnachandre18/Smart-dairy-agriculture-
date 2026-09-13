import { useState } from "react";
import "./Payments.css";

function Payments() {
  const [milkRecords] = useState(() => {
    const savedRecords = localStorage.getItem("milkRecords");

    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  const [filterFarmer, setFilterFarmer] = useState("");

  const farmerList = [
    ...new Map(
      milkRecords
        .filter((record) => record.farmerId)
        .map((record) => [
          record.farmerId,
          {
            farmerId: record.farmerId,
            farmerName: record.farmerName,
          },
        ])
    ).values(),
  ];

  const filteredRecords = milkRecords.filter((record) => {
    if (!filterFarmer) {
      return true;
    }

    return record.farmerId === filterFarmer;
  });

  const totalMilk = filteredRecords.reduce(
    (total, record) => total + Number(record.quantity || 0),
    0
  );

  const totalPayment = filteredRecords.reduce(
    (total, record) => total + Number(record.amount || 0),
    0
  );

  return (
    <div className="payments-page">
      <div className="payments-header">
        <h1>Payment Management</h1>

        <p>
          Farmer-wise milk payment details
        </p>
      </div>

      {/* Farmer Filter */}

      <div className="payment-filter-card">
        <label>Select Farmer</label>

        <select
          value={filterFarmer}
          onChange={(e) => setFilterFarmer(e.target.value)}
        >
          <option value="">All Farmers</option>

          {farmerList.map((farmer) => (
            <option
              key={farmer.farmerId}
              value={farmer.farmerId}
            >
              {farmer.farmerId} - {farmer.farmerName}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}

      <div className="payment-summary">
        <div className="payment-summary-card">
          <h3>Total Milk</h3>
          <p>{totalMilk.toFixed(2)} Litres</p>
        </div>

        <div className="payment-summary-card">
          <h3>Total Payment</h3>
          <p>₹{totalPayment.toFixed(2)}</p>
        </div>

        <div className="payment-summary-card">
          <h3>Total Records</h3>
          <p>{filteredRecords.length}</p>
        </div>
      </div>

      {/* Payment Table */}

      <div className="payments-table-card">
        <h2>Farmer Payment Records</h2>

        {filteredRecords.length === 0 ? (
          <p className="no-payment">
            No payment records available.
          </p>
        ) : (
          <div className="payments-table-container">
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
                {filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>
                      {record.farmerId || "Not Available"}
                    </td>

                    <td>
                      {record.farmerName || "Not Available"}
                    </td>

                    <td>{record.date}</td>

                    <td>{record.session}</td>

                    <td>
                      {Number(record.quantity || 0).toFixed(2)} L
                    </td>

                    <td>{record.fat || 0}</td>

                    <td>{record.snf || 0}</td>

                    <td>
                      ₹{Number(record.rate || 0).toFixed(2)}
                    </td>

                    <td className="payment-amount">
                      ₹{Number(record.amount || 0).toFixed(2)}
                    </td>

                    <td>
                      <span
                        className={
                          record.status === "Verified"
                            ? "payment-verified"
                            : "payment-pending"
                        }
                      >
                        {record.status || "Pending"}
                      </span>
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

export default Payments;