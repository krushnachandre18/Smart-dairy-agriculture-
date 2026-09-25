import { useEffect, useState } from "react";
import "./MilkVerification.css";

function MilkVerification() {
  const [milkRecords, setMilkRecords] = useState([]);

  // ================================
  // LOAD MILK RECORDS
  // ================================

  useEffect(() => {
    loadMilkRecords();
  }, []);

  const loadMilkRecords = () => {
    const savedRecords = JSON.parse(
      localStorage.getItem("milkRecords") || "[]"
    );

    setMilkRecords(savedRecords);
  };

  // ================================
  // VERIFY MILK RECORD
  // ================================

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

    alert("Milk record verified successfully.");
  };

  // ================================
  // REJECT MILK RECORD
  // ================================

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

    alert("Milk record rejected.");
  };

  // ================================
  // PENDING RECORDS
  // ================================

  const pendingRecords = milkRecords.filter(
    (record) =>
      !record.status ||
      String(record.status).toLowerCase() === "pending"
  );

  // ================================
  // UI
  // ================================

  return (
    <div className="milk-verification-page">

      <h1>Milk Verification</h1>

      <p>
        Review and verify pending farmer milk entries.
      </p>

      {pendingRecords.length === 0 ? (

        <div className="no-records-message">
          <h3>✅ No pending milk records</h3>

          <p>
            All milk records have been verified or rejected.
          </p>
        </div>

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

              {pendingRecords.map((record) => (

                <tr key={record.id}>

                  {/* FARMER ID */}

                  <td>
                    {record.farmerId || "Not Available"}
                  </td>

                  {/* FARMER NAME */}

                  <td>
                    {record.farmerName || "Not Available"}
                  </td>

                  {/* DATE */}

                  <td>
                    {record.date || "-"}
                  </td>

                  {/* SESSION */}

                  <td>
                    {record.session || "-"}
                  </td>

                  {/* QUANTITY */}

                  <td>
                    {Number(record.quantity || 0)} L
                  </td>

                  {/* FAT */}

                  <td>
                    {Number(record.fat || 0).toFixed(2)}
                  </td>

                  {/* SNF */}

                  <td>
                    {Number(record.snf || 0).toFixed(2)}
                  </td>

                  {/* RATE */}

                  <td>
                    ₹
                    {Number(record.rate || 0).toFixed(2)}
                  </td>

                  {/* AMOUNT */}

                  <td>
                    ₹
                    {Number(record.amount || 0).toFixed(2)}
                  </td>

                  {/* STATUS */}

                  <td>
                    <span className="pending-status">
                      Pending
                    </span>
                  </td>

                  {/* ACTION */}

                  <td>

                    <div className="verification-actions">

                      <button
                        onClick={() =>
                          handleVerify(record.id)
                        }
                      >
                        ✅ Verify
                      </button>

                      <button
                        onClick={() =>
                          handleReject(record.id)
                        }
                      >
                        ❌ Reject
                      </button>

                    </div>

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