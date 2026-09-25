import { useEffect, useState } from "react";
import "./MilkVerification.css";

function MilkVerification() {
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
  const [milkRecords, setMilkRecords] = useState([]);

  // ================================
  // LOAD MILK RECORDS
  // ================================

  useEffect(() => {
    loadMilkRecords();
  }, []);

  const loadMilkRecords = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/milk-records"
    );

    const data = await response.json();

    if (response.ok) {
      setMilkRecords(
        Array.isArray(data.records)
          ? data.records.map((record) => ({
              ...record,

              farmerId: record.farmerCode,
              farmerName: record.farmerName,
              date: record.collection_date,

              quantity: Number(record.quantity || 0),
              fat: Number(record.fat || 0),
              snf: Number(record.snf || 0),
              rate: Number(record.rate || 0),
              amount: Number(record.amount || 0),
            }))
          : []
      );
    } else {
      console.error(data.message);
      setMilkRecords([]);
    }
  } catch (error) {
    console.error("Milk verification load error:", error);
    setMilkRecords([]);
  }
};

  // ================================
  // VERIFY MILK RECORD
  // ================================

 const handleVerify = async (recordId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/milk-records/${recordId}/verify`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to verify milk record.");
      return;
    }

    alert("Milk record verified successfully.");

    loadMilkRecords();
  } catch (error) {
    console.error("Verify milk error:", error);
    alert("Server error while verifying milk record.");
  }
};

  // ================================
  // REJECT MILK RECORD
  // ================================

  const handleReject = async (recordId) => {
  try {
    console.log("Rejecting record ID:", recordId);

    const response = await fetch(
      `http://localhost:5000/api/milk-records/${recordId}/reject`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    console.log("Reject API response:", data);

    if (!response.ok) {
      alert(data.message || "Failed to reject milk record.");
      return;
    }

    alert("Milk record rejected successfully.");

    await loadMilkRecords();
  } catch (error) {
    console.error("Reject milk error:", error);
    alert("Server error while rejecting milk record.");
  }
};

  // ================================
  // PENDING RECORDS
  // ================================

  const pendingRecords = milkRecords.filter(
  (record) =>
    String(record.status || "").toLowerCase() === "pending"
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
                    {formatDate(record.date)}
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