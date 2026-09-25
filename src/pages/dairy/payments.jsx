import { useState } from "react";
import "./Payments.css";

function Payments() {
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
  const [milkRecords, setMilkRecords] = useState(() => {
    const savedRecords =
      localStorage.getItem("milkRecords");

    return savedRecords
      ? JSON.parse(savedRecords)
      : [];
  });

  const [filterFarmer, setFilterFarmer] = useState("");

  // ==========================================
  // ONLY VERIFIED RECORDS FOR PAYMENT
  // ==========================================

  const verifiedRecords = milkRecords.filter(
    (record) =>
      String(record.status).toLowerCase() ===
      "verified"
  );

  // ==========================================
  // FARMER LIST
  // ==========================================

  const farmerList = [
    ...new Map(
      verifiedRecords
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

  // ==========================================
  // FILTER BY FARMER
  // ==========================================

  const filteredRecords = verifiedRecords.filter(
    (record) => {
      if (!filterFarmer) {
        return true;
      }

      return (
        String(record.farmerId) ===
        String(filterFarmer)
      );
    }
  );

  // ==========================================
  // TOTAL MILK
  // ==========================================

  const totalMilk = filteredRecords.reduce(
    (total, record) =>
      total + Number(record.quantity || 0),
    0
  );

  // ==========================================
  // TOTAL PAYMENT
  // ==========================================

  const totalPayment = filteredRecords.reduce(
    (total, record) =>
      total + Number(record.amount || 0),
    0
  );

  // ==========================================
  // MARK PAYMENT AS PAID
  // ==========================================

  const handleMarkAsPaid = (recordId) => {
    const updatedRecords = milkRecords.map(
      (record) => {
        if (record.id === recordId) {
          return {
            ...record,
            paymentStatus: "Paid",
            paymentDate:
              new Date().toLocaleDateString(),
          };
        }

        return record;
      }
    );

    setMilkRecords(updatedRecords);

    localStorage.setItem(
      "milkRecords",
      JSON.stringify(updatedRecords)
    );

    alert("Payment marked as paid successfully.");
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="payments-page">

      {/* HEADER */}

      <div className="payments-header">

        <h1>Payment Management</h1>

        <p>
          Farmer-wise verified milk payment details
        </p>

      </div>

      {/* FARMER FILTER */}

      <div className="payment-filter-card">

        <label>
          Select Farmer
        </label>

        <select
          value={filterFarmer}
          onChange={(event) =>
            setFilterFarmer(event.target.value)
          }
        >

          <option value="">
            All Farmers
          </option>

          {farmerList.map((farmer) => (

            <option
              key={farmer.farmerId}
              value={farmer.farmerId}
            >
              {farmer.farmerId} -{" "}
              {farmer.farmerName}
            </option>

          ))}

        </select>

      </div>

      {/* SUMMARY CARDS */}

      <div className="payment-summary">

        <div className="payment-summary-card">

          <h3>
            Total Milk
          </h3>

          <p>
            {totalMilk.toFixed(2)} Litres
          </p>

        </div>

        <div className="payment-summary-card">

          <h3>
            Total Payment
          </h3>

          <p>
            ₹{totalPayment.toFixed(2)}
          </p>

        </div>

        <div className="payment-summary-card">

          <h3>
            Verified Records
          </h3>

          <p>
            {filteredRecords.length}
          </p>

        </div>

      </div>

      {/* PAYMENT TABLE */}

      <div className="payments-table-card">

        <h2>
          Verified Milk Payment Records
        </h2>

        {filteredRecords.length === 0 ? (

          <p className="no-payment">
            No verified milk records available
            for payment.
          </p>

        ) : (

          <div className="payments-table-container">

            <table>

              <thead>

                <tr>

                  <th>
                    Farmer ID
                  </th>

                  <th>
                    Farmer Name
                  </th>

                  <th>
                    Date
                  </th>

                  <th>
                    Session
                  </th>

                  <th>
                    Quantity
                  </th>

                  <th>
                    Fat
                  </th>

                  <th>
                    SNF
                  </th>

                  <th>
                    Rate
                  </th>

                  <th>
                    Amount
                  </th>

                  <th>
                    Verification
                  </th>

                  <th>
                    Payment Status
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredRecords.map(
                  (record) => (

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
                        {formatDate(record.date)}
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

                      <td className="payment-amount">
                        ₹
                        {Number(
                          record.amount || 0
                        ).toFixed(2)}
                      </td>

                      {/* VERIFICATION */}

                      <td>

                        <span className="payment-verified">
                          Verified
                        </span>

                      </td>

                      {/* PAYMENT STATUS */}

                      <td>

                        <span
                          className={
                            record.paymentStatus ===
                            "Paid"
                              ? "payment-verified"
                              : "payment-pending"
                          }
                        >
                          {record.paymentStatus ||
                            "Pending Payment"}
                        </span>

                      </td>

                      {/* ACTION */}

                      <td>

                        {record.paymentStatus ===
                        "Paid" ? (

                          <span>
                            ✅ Paid
                          </span>

                        ) : (

                          <button
                            onClick={() =>
                              handleMarkAsPaid(
                                record.id
                              )
                            }
                          >
                            💰 Mark as Paid
                          </button>

                        )}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Payments;