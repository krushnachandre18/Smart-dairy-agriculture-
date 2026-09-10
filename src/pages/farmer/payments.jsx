import { useState } from "react";

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
    <div>
      <h1>💰 Payment History</h1>

      <hr />

      <h3>📊 Payment Summary</h3>

      <p>
        <strong>Total Milk:</strong> {totalMilk} Litres
      </p>

      <p>
        <strong>Total Payment:</strong> ₹
        {totalPayment.toFixed(2)}
      </p>

      <hr />

      <h3>📋 Milk Payment Records</h3>

      {payments.length === 0 ? (
        <p>No payment records available.</p>
      ) : (
        <table border="1" cellPadding="8">
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

                <td>{payment.session}</td>

                <td>{payment.quantity} L</td>

                <td>{payment.fat}%</td>

                <td>{payment.snf}%</td>

                <td>
                  ₹{payment.rate.toFixed(2)}/L
                </td>

                <td>
                  ₹{payment.amount.toFixed(2)}
                </td>

                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Payments;