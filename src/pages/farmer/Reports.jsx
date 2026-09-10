import { useState } from "react";

function Reports() {
  const [reportType, setReportType] = useState("all");

  // Milk Records
  const milkRecords = JSON.parse(
    localStorage.getItem("milkRecords") || "[]"
  );

  // Income Records
  const incomeRecords = JSON.parse(
    localStorage.getItem("incomeRecords") || "[]"
  );

  // Expense Records
  const expenseRecords = JSON.parse(
    localStorage.getItem("expenseRecords") || "[]"
  );

  // Total Milk
  const totalMilk = milkRecords.reduce(
    (total, record) => total + Number(record.quantity || 0),
    0
  );

  // Total Income
  const totalIncome = incomeRecords.reduce(
    (total, record) => total + Number(record.amount || 0),
    0
  );

  // Total Expense
  const totalExpense = expenseRecords.reduce(
    (total, record) => total + Number(record.amount || 0),
    0
  );

  // Profit / Loss
  const profitLoss = totalIncome - totalExpense;

  return (
    <div>
      <h1>📊 Reports</h1>
      <p>View Dairy and Farm Reports</p>

      <hr />

      {/* Report Selection */}
      <h3>📅 Select Report</h3>

      <select
        value={reportType}
        onChange={(e) => setReportType(e.target.value)}
      >
        <option value="all">All Reports</option>
        <option value="milk">Milk Collection</option>
        <option value="income">Income</option>
        <option value="expense">Expenses</option>
        <option value="profit">Profit / Loss</option>
      </select>

      <hr />

      {/* Summary */}
      <h2>📌 Summary</h2>

      <p>
        🥛 <b>Total Milk:</b> {totalMilk} Litres
      </p>

      <p>
        💰 <b>Total Income:</b> ₹{totalIncome}
      </p>

      <p>
        💸 <b>Total Expenses:</b> ₹{totalExpense}
      </p>

      <p>
        📊 <b>Profit / Loss:</b> ₹{profitLoss}
      </p>

      <hr />

      {/* Milk Report */}
      {(reportType === "all" || reportType === "milk") && (
        <>
          <h2>🥛 Milk Collection Report</h2>

          {milkRecords.length === 0 ? (
            <p>No milk records available.</p>
          ) : (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Session</th>
                  <th>Quantity</th>
                  <th>Fat</th>
                  <th>SNF</th>
                  <th>Rate</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {milkRecords.map((milk) => (
                  <tr key={milk.id}>
                    <td>{milk.date}</td>
                    <td>{milk.session}</td>
                    <td>{milk.quantity} L</td>
                    <td>{milk.fat}</td>
                    <td>{milk.snf}</td>
                    <td>₹{milk.rate}</td>
                    <td>₹{milk.amount}</td>
                    <td>{milk.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {/* Income Report */}
      {(reportType === "all" || reportType === "income") && (
        <>
          <h2>💰 Income Report</h2>

          {incomeRecords.length === 0 ? (
            <p>No income records available.</p>
          ) : (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Income Type</th>
                  <th>Amount</th>
                  <th>Description</th>
                </tr>
              </thead>

              <tbody>
                {incomeRecords.map((income) => (
                  <tr key={income.id}>
                    <td>{income.date}</td>
                    <td>{income.incomeType}</td>
                    <td>₹{income.amount}</td>
                    <td>{income.description || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {/* Expense Report */}
      {(reportType === "all" || reportType === "expense") && (
        <>
          <h2>💸 Expense Report</h2>

          {expenseRecords.length === 0 ? (
            <p>No expense records available.</p>
          ) : (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Expense Type</th>
                  <th>Amount</th>
                  <th>Description</th>
                </tr>
              </thead>

              <tbody>
                {expenseRecords.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.date}</td>
                    <td>{expense.expenseType}</td>
                    <td>₹{expense.amount}</td>
                    <td>{expense.description || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {/* Profit / Loss Report */}
      {(reportType === "all" || reportType === "profit") && (
        <>
          <h2>📊 Profit / Loss Report</h2>

          <p>
            <b>Total Income:</b> ₹{totalIncome}
          </p>

          <p>
            <b>Total Expenses:</b> ₹{totalExpense}
          </p>

          <h3>
            Net Profit / Loss: ₹{profitLoss}
          </h3>

          {profitLoss > 0 ? (
            <p>✅ Business is in Profit</p>
          ) : profitLoss < 0 ? (
            <p>⚠️ Business is in Loss</p>
          ) : (
            <p>➖ No Profit, No Loss</p>
          )}
        </>
      )}
    </div>
  );
}

export default Reports;