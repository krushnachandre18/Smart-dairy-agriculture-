import { useState } from "react";
import "./DailyReports.css";

function DailyReports() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString()
  );

  const [milkRecords] = useState(() => {
    const savedRecords =
      localStorage.getItem("milkRecords");

    return savedRecords
      ? JSON.parse(savedRecords)
      : [];
  });

  // ==========================================
  // SELECTED DATE RECORDS
  // ==========================================

  const selectedDateRecords = milkRecords.filter(
    (record) => record.date === selectedDate
  );

  // ==========================================
  // STATUS RECORDS
  // ==========================================

  const verifiedRecords = selectedDateRecords.filter(
    (record) =>
      String(record.status).toLowerCase() ===
      "verified"
  );

  const pendingRecords = selectedDateRecords.filter(
    (record) =>
      !record.status ||
      String(record.status).toLowerCase() ===
        "pending"
  );

  const rejectedRecords = selectedDateRecords.filter(
    (record) =>
      String(record.status).toLowerCase() ===
      "rejected"
  );

  // ==========================================
  // FARMER-WISE VERIFIED REPORT
  // ==========================================

  const farmerReport = [
    ...new Map(
      verifiedRecords.map((record) => [
        record.farmerId || "unknown",
        {
          farmerId:
            record.farmerId ||
            "Not Available",

          farmerName:
            record.farmerName ||
            "Not Available",

          morningMilk: 0,
          eveningMilk: 0,
          totalMilk: 0,
          totalAmount: 0,
        },
      ])
    ).values(),
  ];

  // ==========================================
  // CALCULATE FARMER TOTALS
  // ==========================================

  verifiedRecords.forEach((record) => {
    const farmer = farmerReport.find(
      (item) =>
        String(item.farmerId) ===
        String(
          record.farmerId ||
            "Not Available"
        )
    );

    if (!farmer) {
      return;
    }

    const quantity = Number(
      record.quantity || 0
    );

    const amount = Number(
      record.amount || 0
    );

    if (
      String(record.session).toLowerCase() ===
      "morning"
    ) {
      farmer.morningMilk += quantity;
    }

    if (
      String(record.session).toLowerCase() ===
      "evening"
    ) {
      farmer.eveningMilk += quantity;
    }

    farmer.totalMilk += quantity;
    farmer.totalAmount += amount;
  });

  // ==========================================
  // TOTAL VERIFIED MILK
  // ==========================================

  const totalMilk = verifiedRecords.reduce(
    (total, record) =>
      total + Number(record.quantity || 0),
    0
  );

  // ==========================================
  // TOTAL VERIFIED AMOUNT
  // ==========================================

  const totalAmount = verifiedRecords.reduce(
    (total, record) =>
      total + Number(record.amount || 0),
    0
  );

  // ==========================================
  // TOTAL MORNING MILK
  // ==========================================

  const morningMilk = verifiedRecords
    .filter(
      (record) =>
        String(record.session).toLowerCase() ===
        "morning"
    )
    .reduce(
      (total, record) =>
        total + Number(record.quantity || 0),
      0
    );

  // ==========================================
  // TOTAL EVENING MILK
  // ==========================================

  const eveningMilk = verifiedRecords
    .filter(
      (record) =>
        String(record.session).toLowerCase() ===
        "evening"
    )
    .reduce(
      (total, record) =>
        total + Number(record.quantity || 0),
      0
    );

  // ==========================================
  // DATE CHANGE
  // ==========================================

  const handleDateChange = (event) => {
    const value = event.target.value;

    if (!value) {
      return;
    }

    const date = new Date(
      `${value}T00:00:00`
    );

    setSelectedDate(
      date.toLocaleDateString()
    );
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="daily-report-page">

      {/* HEADER */}

      <div className="daily-report-header">

        <h1>
          Daily Milk Report
        </h1>

        <p>
          Farmer-wise daily milk collection report
        </p>

      </div>

      {/* DATE FILTER */}

      <div className="daily-date-card">

        <label>
          Select Date
        </label>

        <input
          type="date"
          onChange={handleDateChange}
        />

        <span>
          Report Date: {selectedDate}
        </span>

      </div>

      {/* SUMMARY CARDS */}

      <div className="daily-summary">

        <div className="daily-summary-card">

          <h3>
            Verified Milk
          </h3>

          <p>
            {totalMilk.toFixed(2)} L
          </p>

        </div>

        <div className="daily-summary-card">

          <h3>
            Verified Amount
          </h3>

          <p>
            ₹{totalAmount.toFixed(2)}
          </p>

        </div>

        <div className="daily-summary-card">

          <h3>
            Pending Records
          </h3>

          <p>
            {pendingRecords.length}
          </p>

        </div>

        <div className="daily-summary-card">

          <h3>
            Rejected Records
          </h3>

          <p>
            {rejectedRecords.length}
          </p>

        </div>

      </div>

      {/* SESSION SUMMARY */}

      <div className="daily-summary">

        <div className="daily-summary-card">

          <h3>
            Morning Milk
          </h3>

          <p>
            {morningMilk.toFixed(2)} L
          </p>

        </div>

        <div className="daily-summary-card">

          <h3>
            Evening Milk
          </h3>

          <p>
            {eveningMilk.toFixed(2)} L
          </p>

        </div>

        <div className="daily-summary-card">

          <h3>
            Verified Records
          </h3>

          <p>
            {verifiedRecords.length}
          </p>

        </div>

        <div className="daily-summary-card">

          <h3>
            Total Records
          </h3>

          <p>
            {selectedDateRecords.length}
          </p>

        </div>

      </div>

      {/* FARMER-WISE REPORT */}

      <div className="daily-report-table-card">

        <h2>
          Farmer-wise Daily Report
        </h2>

        {farmerReport.length === 0 ? (

          <p className="no-daily-record">
            No verified milk records available
            for this date.
          </p>

        ) : (

          <div className="daily-table-container">

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
                    Morning Milk
                  </th>

                  <th>
                    Evening Milk
                  </th>

                  <th>
                    Total Milk
                  </th>

                  <th>
                    Total Amount
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {farmerReport.map(
                  (farmer) => (

                    <tr
                      key={
                        farmer.farmerId
                      }
                    >

                      <td>
                        {farmer.farmerId}
                      </td>

                      <td>
                        {farmer.farmerName}
                      </td>

                      <td>
                        {farmer.morningMilk.toFixed(
                          2
                        )}{" "}
                        L
                      </td>

                      <td>
                        {farmer.eveningMilk.toFixed(
                          2
                        )}{" "}
                        L
                      </td>

                      <td className="daily-total-milk">

                        {farmer.totalMilk.toFixed(
                          2
                        )}{" "}
                        L

                      </td>

                      <td className="daily-total-amount">

                        ₹
                        {farmer.totalAmount.toFixed(
                          2
                        )}

                      </td>

                      <td>

                        <span className="daily-verified">
                          Verified
                        </span>

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

export default DailyReports;