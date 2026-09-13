import { useState } from "react";
import "./DailyReports.css";

function DailyReports() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString()
  );

  const [milkRecords] = useState(() => {
    const savedRecords = localStorage.getItem("milkRecords");

    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  const selectedDateRecords = milkRecords.filter(
    (record) => record.date === selectedDate
  );

  const farmerReport = [
    ...new Map(
      selectedDateRecords.map((record) => [
        record.farmerId || "unknown",
        {
          farmerId: record.farmerId || "Not Available",
          farmerName: record.farmerName || "Not Available",
          morningMilk: 0,
          eveningMilk: 0,
          totalMilk: 0,
          totalAmount: 0,
          status: "Pending",
        },
      ])
    ).values(),
  ];

  selectedDateRecords.forEach((record) => {
    const farmer = farmerReport.find(
      (item) => item.farmerId === record.farmerId
    );

    if (!farmer) {
      return;
    }

    const quantity = Number(record.quantity || 0);
    const amount = Number(record.amount || 0);

    if (record.session === "Morning") {
      farmer.morningMilk += quantity;
    }

    if (record.session === "Evening") {
      farmer.eveningMilk += quantity;
    }

    farmer.totalMilk += quantity;
    farmer.totalAmount += amount;

    if (record.status === "Verified") {
      farmer.status = "Verified";
    }
  });

  const totalMilk = selectedDateRecords.reduce(
    (total, record) =>
      total + Number(record.quantity || 0),
    0
  );

  const totalAmount = selectedDateRecords.reduce(
    (total, record) =>
      total + Number(record.amount || 0),
    0
  );

  const verifiedRecords = selectedDateRecords.filter(
    (record) => record.status === "Verified"
  ).length;

  const pendingRecords = selectedDateRecords.filter(
    (record) => record.status !== "Verified"
  ).length;

  return (
    <div className="daily-report-page">
      <div className="daily-report-header">
        <h1>Daily Milk Report</h1>
        <p>Farmer-wise daily milk collection report</p>
      </div>

      {/* Date Filter */}

      <div className="daily-date-card">
        <label>Select Date</label>

        <input
          type="date"
          onChange={(e) => {
            const date = new Date(e.target.value);
            setSelectedDate(date.toLocaleDateString());
          }}
        />

        <span>
          Report Date: {selectedDate}
        </span>
      </div>

      {/* Summary Cards */}

      <div className="daily-summary">
        <div className="daily-summary-card">
          <h3>Total Milk</h3>
          <p>{totalMilk.toFixed(2)} L</p>
        </div>

        <div className="daily-summary-card">
          <h3>Total Amount</h3>
          <p>₹{totalAmount.toFixed(2)}</p>
        </div>

        <div className="daily-summary-card">
          <h3>Verified Records</h3>
          <p>{verifiedRecords}</p>
        </div>

        <div className="daily-summary-card">
          <h3>Pending Records</h3>
          <p>{pendingRecords}</p>
        </div>
      </div>

      {/* Farmer-wise Report */}

      <div className="daily-report-table-card">
        <h2>Farmer-wise Daily Report</h2>

        {farmerReport.length === 0 ? (
          <p className="no-daily-record">
            No milk records available for this date.
          </p>
        ) : (
          <div className="daily-table-container">
            <table>
              <thead>
                <tr>
                  <th>Farmer ID</th>
                  <th>Farmer Name</th>
                  <th>Morning Milk</th>
                  <th>Evening Milk</th>
                  <th>Total Milk</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {farmerReport.map((farmer) => (
                  <tr key={farmer.farmerId}>
                    <td>{farmer.farmerId}</td>

                    <td>{farmer.farmerName}</td>

                    <td>
                      {farmer.morningMilk.toFixed(2)} L
                    </td>

                    <td>
                      {farmer.eveningMilk.toFixed(2)} L
                    </td>

                    <td className="daily-total-milk">
                      {farmer.totalMilk.toFixed(2)} L
                    </td>

                    <td className="daily-total-amount">
                      ₹{farmer.totalAmount.toFixed(2)}
                    </td>

                    <td>
                      <span
                        className={
                          farmer.status === "Verified"
                            ? "daily-verified"
                            : "daily-pending"
                        }
                      >
                        {farmer.status}
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

export default DailyReports;