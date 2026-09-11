import { useState } from "react";
import "./Reports.css";

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
  <div className="reports-page">

    {/* Header */}
    <div className="reports-header">
      <div className="reports-icon">📊</div>
      <h1>Reports & Analytics</h1>
      <p>View your dairy and farm performance reports.</p>
    </div>

    {/* Report Selection */}
    <div className="report-selection-card">
      <div>
        <h2>📅 Select Report</h2>
        <p>Choose a report to view detailed information.</p>
      </div>

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
    </div>

    {/* Summary */}
    <div className="reports-summary-grid">

      <div className="report-summary-card milk">
        <span>🥛</span>
        <div>
          <p>Total Milk</p>
          <h2>{totalMilk.toFixed(2)} L</h2>
        </div>
      </div>

      <div className="report-summary-card income">
        <span>💰</span>
        <div>
          <p>Total Income</p>
          <h2>₹{totalIncome.toFixed(2)}</h2>
        </div>
      </div>

      <div className="report-summary-card expense">
        <span>💸</span>
        <div>
          <p>Total Expenses</p>
          <h2>₹{totalExpense.toFixed(2)}</h2>
        </div>
      </div>

      <div
        className={`report-summary-card ${
          profitLoss >= 0 ? "profit" : "loss"
        }`}
      >
        <span>{profitLoss >= 0 ? "📈" : "📉"}</span>
        <div>
          <p>Profit / Loss</p>
          <h2>₹{profitLoss.toFixed(2)}</h2>
        </div>
      </div>

    </div>

    {/* Milk Report */}
    {(reportType === "all" || reportType === "milk") && (
      <div className="report-card">

        <div className="report-card-header">
          <div>
            <h2>🥛 Milk Collection Report</h2>
            <p>Details of collected milk records.</p>
          </div>
        </div>

        {milkRecords.length === 0 ? (
          <div className="report-empty">
            <div>🥛</div>
            <h3>No milk records available</h3>
            <p>Milk collection records will appear here.</p>
          </div>
        ) : (
          <div className="report-table-container">
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
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {milkRecords.map((milk) => (
                  <tr key={milk.id}>
                    <td>{milk.date || "-"}</td>

                    <td>
                      <span className="report-session">
                        {milk.session || "-"}
                      </span>
                    </td>

                    <td>{milk.quantity || 0} L</td>
                    <td>{milk.fat || 0}</td>
                    <td>{milk.snf || 0}</td>
                    <td>₹{milk.rate || 0}</td>

                    <td>
                      <strong>
                        ₹{Number(milk.amount || 0).toFixed(2)}
                      </strong>
                    </td>

                    <td>
                      <span className="report-status">
                        {milk.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    )}

    {/* Income Report */}
    {(reportType === "all" || reportType === "income") && (
      <div className="report-card">

        <div className="report-card-header">
          <div>
            <h2>💰 Income Report</h2>
            <p>Details of all income transactions.</p>
          </div>
        </div>

        {incomeRecords.length === 0 ? (
          <div className="report-empty">
            <div>💵</div>
            <h3>No income records available</h3>
            <p>Income records will appear here.</p>
          </div>
        ) : (
          <div className="report-table-container">
            <table>
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

                    <td>
                      <span className="report-income-badge">
                        {income.incomeType}
                      </span>
                    </td>

                    <td>
                      <strong>
                        ₹{Number(income.amount || 0).toFixed(2)}
                      </strong>
                    </td>

                    <td>{income.description || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    )}

    {/* Expense Report */}
    {(reportType === "all" || reportType === "expense") && (
      <div className="report-card">

        <div className="report-card-header">
          <div>
            <h2>💸 Expense Report</h2>
            <p>Details of all farm expense transactions.</p>
          </div>
        </div>

        {expenseRecords.length === 0 ? (
          <div className="report-empty">
            <div>💸</div>
            <h3>No expense records available</h3>
            <p>Expense records will appear here.</p>
          </div>
        ) : (
          <div className="report-table-container">
            <table>
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

                    <td>
                      <span className="report-expense-badge">
                        {expense.expenseType}
                      </span>
                    </td>

                    <td>
                      <strong>
                        ₹{Number(expense.amount || 0).toFixed(2)}
                      </strong>
                    </td>

                    <td>{expense.description || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    )}

    {/* Profit / Loss Report */}
    {(reportType === "all" || reportType === "profit") && (
      <div className="report-card profit-report-card">

        <div className="report-card-header">
          <div>
            <h2>📊 Profit / Loss Report</h2>
            <p>Overall financial performance of your farm.</p>
          </div>
        </div>

        <div className="profit-report-grid">

          <div>
            <p>Total Income</p>
            <h3>₹{totalIncome.toFixed(2)}</h3>
          </div>

          <div>
            <p>Total Expenses</p>
            <h3>₹{totalExpense.toFixed(2)}</h3>
          </div>

          <div>
            <p>Net Profit / Loss</p>
            <h3>₹{profitLoss.toFixed(2)}</h3>
          </div>

        </div>

        <div
          className={`profit-message ${
            profitLoss > 0
              ? "profit"
              : profitLoss < 0
              ? "loss"
              : "neutral"
          }`}
        >
          {profitLoss > 0 ? (
            <>
              <span>✅</span>
              <strong>Business is in Profit</strong>
            </>
          ) : profitLoss < 0 ? (
            <>
              <span>⚠️</span>
              <strong>Business is in Loss</strong>
            </>
          ) : (
            <>
              <span>➖</span>
              <strong>No Profit, No Loss</strong>
            </>
          )}
        </div>

      </div>
    )}

  </div>
);
}

export default Reports;