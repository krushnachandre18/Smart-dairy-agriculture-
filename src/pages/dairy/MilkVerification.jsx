import { useEffect, useState } from "react";
import "./MilkVerification.css";

function MilkVerification() {
  const [milkRecords, setMilkRecords] = useState([]);

  useEffect(() => {
    loadMilkRecords();
  }, []);

  const loadMilkRecords = () => {
    const savedRecords = localStorage.getItem("milkRecords");

    if (savedRecords) {
      setMilkRecords(JSON.parse(savedRecords));
    } else {
      setMilkRecords([]);
    }
  };

  const handleVerify = (recordId) => {
    const updatedRecords = milkRecords.map((record) => {
      if (record.id === recordId) {
        return {
          ...record,
          status: "Verified",
        };
      }

      return record;
    });

    setMilkRecords(updatedRecords);

    localStorage.setItem(
      "milkRecords",
      JSON.stringify(updatedRecords)
    );

    alert("Milk record verified successfully");
  };

  const handleReject = (recordId) => {
    const updatedRecords = milkRecords.map((record) => {
      if (record.id === recordId) {
        return {
          ...record,
          status: "Rejected",
        };
      }

      return record;
    });

    setMilkRecords(updatedRecords);

    localStorage.setItem(
      "milkRecords",
      JSON.stringify(updatedRecords)
    );

    alert("Milk record rejected");
  };

  return (
    <div className="milk-verification-page">
      <h1>Milk Verification</h1>

      {milkRecords.length === 0 ? (
        <p>No milk records available for verification.</p>
      ) : (
        <div className="verification-table-container">
          <table border="1" cellPadding="10">
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
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {milkRecords.map((record) => (
                <tr key={record.id}>
                  <td>
                    {record.farmerId || "Not Available"}
                  </td>

                  <td>
                    {record.farmerName || "Not Available"}
                  </td>

                  <td>
                    {record.date || "-"}
                  </td>

                  <td>
                    {record.session || "-"}
                  </td>

                  <td>
                    {record.quantity || 0} L
                  </td>

                  <td>
                    {record.fat || 0}
                  </td>

                  <td>
                    {record.snf || 0}
                  </td>

                  <td>
                    ₹{Number(record.rate || 0).toFixed(2)}
                  </td>

                  <td>
                    ₹{Number(record.amount || 0).toFixed(2)}
                  </td>

                  <td>
                    <span
                      className={
                        record.status === "Verified"
                          ? "verified-status"
                          : record.status === "Rejected"
                          ? "rejected-status"
                          : "pending-status"
                      }
                    >
                      {record.status || "Pending"}
                    </span>
                  </td>

                  <td>
                    {record.status === "Verified" ? (
                      <span>Verified</span>
                    ) : record.status === "Rejected" ? (
                      <span>Rejected</span>
                    ) : (
                      <div>
                        <button
                          onClick={() => handleVerify(record.id)}
                        >
                          Verify
                        </button>

                        <button
                          onClick={() => handleReject(record.id)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MilkVerification;