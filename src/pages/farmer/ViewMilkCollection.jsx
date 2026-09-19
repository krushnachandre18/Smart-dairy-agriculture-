import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewMilkCollection.css";

function FarmerMilkCollection() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);

  useEffect(() => {
  const allRecords =
    JSON.parse(localStorage.getItem("milkRecords")) || [];

  setRecords(allRecords);
}, []);

  return (
    <div className="farmer-milk-page">
      <div className="farmer-milk-header">
        <div>
          <h1>🥛 My Milk Collection</h1>
          
        </div>

        <button
          onClick={() => navigate("/farmer/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="farmer-milk-summary">
        <h2>Total Milk</h2>

        <strong>
          {records
            .reduce(
              (total, record) =>
                total + Number(record.quantity || 0),
              0
            )
            .toFixed(2)}{" "}
          L
        </strong>
      </div>

      <div className="farmer-milk-table-box">
        <h2>My Milk Records</h2>

        {records.length === 0 ? (
          <p className="no-records">
           No milk records available. Please add milk collection records from the dairy center.
          </p>
        ) : (
          <div className="farmer-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Session</th>
                  <th>Quantity</th>
                  <th>Fat</th>
                  <th>SNF</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {records
                  .slice()
                  .reverse()
                  .map((record) => (
                    <tr key={record.id}>
                      <td>{record.date}</td>
                      <td>{record.session}</td>
                      <td>
                        {Number(record.quantity || 0)} L
                      </td>
                      <td>{record.fat}</td>
                      <td>{record.snf}</td>
                      <td>
                        ₹
                        {Number(
                          record.amount || 0
                        ).toFixed(2)}
                      </td>
                      <td>
                        <span className="farmer-status">
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

export default FarmerMilkCollection;