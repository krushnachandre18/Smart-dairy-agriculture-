import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewMilkCollection.css";

function ViewMilkCollection() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadMilkRecords();
  }, []);

  const loadMilkRecords = () => {
    const loggedInFarmerMobile =
      localStorage.getItem("loggedInFarmerMobile");

    const farmers =
      JSON.parse(localStorage.getItem("farmers")) || [];

    const loggedInFarmer = farmers.find(
      (farmer) =>
        String(farmer.mobile) ===
        String(loggedInFarmerMobile)
    );

    const allRecords =
      JSON.parse(localStorage.getItem("milkRecords")) || [];

    const myRecords = allRecords.filter((record) => {
      const mobileMatch =
        String(record.farmerMobile || "") ===
        String(loggedInFarmerMobile);

      const farmerIdMatch =
        loggedInFarmer &&
        String(record.farmerId || "") ===
        String(loggedInFarmer.farmerId);

      return mobileMatch || farmerIdMatch;
    });

    // Latest records first
    myRecords.sort((a, b) => b.id - a.id);

    setRecords(myRecords);
  };

  const verifiedRecords = records.filter(
    (record) =>
      String(record.status || "").toLowerCase() ===
      "verified"
  );

  const pendingRecords = records.filter(
    (record) =>
      !record.status ||
      String(record.status).toLowerCase() === "pending"
  );

  const rejectedRecords = records.filter(
    (record) =>
      String(record.status || "").toLowerCase() ===
      "rejected"
  );

  const totalMilk = verifiedRecords.reduce(
    (total, record) =>
      total + Number(record.quantity || 0),
    0
  );

  const totalAmount = verifiedRecords.reduce(
    (total, record) =>
      total + Number(record.amount || 0),
    0
  );

  return (
    <div className="view-milk-page">

      {/* HEADER */}
      <div className="view-milk-header">
        <div>
          <h1>🥛 My Milk Collection</h1>
          <p>
            View your milk collection records and
            verification status.
          </p>
        </div>

        <button
          className="back-dashboard-btn"
          onClick={() =>
            navigate("/farmer/dashboard")
          }
        >
          ← Dashboard
        </button>
      </div>

      {/* SUMMARY */}
      <div className="milk-record-summary">

        <div className="milk-record-card">
          <span>🥛</span>
          <h3>Verified Milk</h3>
          <strong>
            {totalMilk.toFixed(2)} L
          </strong>
        </div>

        <div className="milk-record-card">
          <span>💰</span>
          <h3>Total Earning</h3>
          <strong>
            ₹{totalAmount.toFixed(2)}
          </strong>
        </div>

        <div className="milk-record-card">
          <span>⏳</span>
          <h3>Pending</h3>
          <strong>
            {pendingRecords.length}
          </strong>
        </div>

        <div className="milk-record-card">
          <span>❌</span>
          <h3>Rejected</h3>
          <strong>
            {rejectedRecords.length}
          </strong>
        </div>

      </div>

      {/* RECORDS */}
      <div className="milk-records-section">

        <div className="section-heading">
          <div>
            <h2>📋 Milk Collection Records</h2>
            <p>
              Total Records: {records.length}
            </p>
          </div>
        </div>

        {records.length === 0 ? (
          <div className="no-milk-records">
            <span>🥛</span>
            <h3>No Milk Records Found</h3>
            <p>
              Your milk collection records will
              appear here after dairy entry.
            </p>
          </div>
        ) : (
          <div className="milk-table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Session</th>
                  <th>Quantity</th>
                  <th>Fat</th>
                  <th>SNF</th>
                  <th>Rate</th>
                  <th>Amount</th>
                  <th>Verification</th>
                  <th>Payment</th>
                </tr>
              </thead>

              <tbody>
                {records.map((record) => {

                  const status =
                    String(
                      record.status || "Pending"
                    ).toLowerCase();

                  return (
                    <tr key={record.id}>

                      <td>
                        {record.date || "-"}
                      </td>

                      <td>
                        {record.session || "-"}
                      </td>

                      <td>
                        {Number(
                          record.quantity || 0
                        ).toFixed(2)}{" "}
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
                        {status === "verified" ? (
                          <span className="status verified">
                            ✅ Verified
                          </span>
                        ) : status === "rejected" ? (
                          <span className="status rejected">
                            ❌ Rejected
                          </span>
                        ) : (
                          <span className="status pending">
                            ⏳ Pending
                          </span>
                        )}
                      </td>

                      <td>
                        {status !== "verified" ? (
                          <span className="payment-na">
                            —
                          </span>
                        ) : record.paymentStatus ===
                          "Paid" ? (
                          <span className="status paid">
                            💰 Paid
                          </span>
                        ) : (
                          <span className="status unpaid">
                            ⏳ Unpaid
                          </span>
                        )}
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* NOTE */}
      <div className="milk-record-note">
        <strong>ℹ️ Note:</strong>
        <span>
          Only verified milk is included in your
          total milk and earning summary.
        </span>
      </div>

    </div>
  );
}

export default ViewMilkCollection;