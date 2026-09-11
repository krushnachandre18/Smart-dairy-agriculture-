import { useState } from "react";
import "./Payments.css";

function Payments() {
  const [payments, setPayments] = useState(() => {
    const savedRecords = localStorage.getItem("milkRecords");

    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  // Total payment
  const totalPayment = payments.reduce(
    (total, payment) => total + payment.amount,
    0
  );

  // Total milk
  const totalMilk = payments.reduce(
    (total, payment) => total + payment.quantity,
    0
  );

  return (
  <div className="payments-page">

    {/* Header */}
    <div className="payments-header">
      <div>
        <span className="payments-badge">💰 DAIRY MANAGEMENT</span>
        <h1>Dairy Payments</h1>
        <p>View your milk collection payments and payment history.</p>
      </div>

      <div className="payments-header-icon">💰</div>
    </div>

    {/* Payment Summary */}
    <div className="payments-card">

      <div className="payments-card-heading">
        <div>
          <h2>📊 Payment Summary</h2>
          <p>Overview of your total milk and payment amount.</p>
        </div>
      </div>

      <div className="payment-summary-grid">

        <div className="payment-summary-box milk-payment-box">
          <div className="payment-summary-icon">🥛</div>
          <div>
            <span>Total Milk</span>
            <strong>{totalMilk.toFixed(2)} L</strong>
            <small>Collected milk</small>
          </div>
        </div>

        <div className="payment-summary-box total-payment-box">
          <div className="payment-summary-icon">💰</div>
          <div>
            <span>Total Payment</span>
            <strong>₹{totalPayment.toFixed(2)}</strong>
            <small>Total milk payment</small>
          </div>
        </div>

      </div>

    </div>

    {/* Payment Records */}
    <div className="payments-card">

      <div className="payments-card-heading">
        <div>
          <h2>📋 Milk Payment Records</h2>
          <p>Detailed history of your milk collection payments.</p>
        </div>

        <div className="payment-record-count">
          {payments.length} Records
        </div>
      </div>

      {payments.length === 0 ? (

        <div className="payment-empty">
          <div>💰</div>
          <h3>No Payment Records</h3>
          <p>
            Milk payment records will appear here after adding milk
            collection entries.
          </p>
        </div>

      ) : (

        <div className="payment-table-container">
          <table className="payment-table">

            <thead>
              <tr>
                <th>Date</th>
                <th>Session</th>
                <th>Milk</th>
                <th>Fat</th>
                <th>SNF</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (

                <tr key={payment.id}>

                  <td>{payment.date}</td>

                  <td>
                    <span className="payment-session">
                      {payment.session === "Morning"
                        ? "🌅 Morning"
                        : "🌙 Evening"}
                    </span>
                  </td>

                  <td>
                    <strong>{payment.quantity} L</strong>
                  </td>

                  <td>{payment.fat}%</td>

                  <td>{payment.snf}%</td>

                  <td>
                    ₹{payment.rate.toFixed(2)}/L
                  </td>

                  <td>
                    <strong className="payment-amount">
                      ₹{payment.amount.toFixed(2)}
                    </strong>
                  </td>

                  <td>
                    {payment.status === "Verified" ? (
                      <span className="payment-status verified">
                        ✓ Verified
                      </span>
                    ) : (
                      <span className="payment-status pending">
                        Pending
                      </span>
                    )}
                  </td>

                </tr>

              ))}
            </tbody>

          </table>
        </div>

      )}

    </div>

    {/* Footer */}
    <div className="payments-footer">
      🐄 Smart Dairy & Farmer Farm Management System
    </div>

  </div>
);
}

export default Payments;