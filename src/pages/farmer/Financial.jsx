import { useState } from "react";
import "./Financial.css";

function Financial() {
  const [activeSection, setActiveSection] = useState("");

  // ================= INCOME =================

  const [incomeType, setIncomeType] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeDate, setIncomeDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [incomeDescription, setIncomeDescription] = useState("");

  const [incomeRecords, setIncomeRecords] = useState(() => {
    const savedIncome = localStorage.getItem("incomeRecords");
    return savedIncome ? JSON.parse(savedIncome) : [];
  });

  // ================= EXPENSES =================

  const [expenseType, setExpenseType] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [expenseDescription, setExpenseDescription] = useState("");

  const [expenseRecords, setExpenseRecords] = useState(() => {
    const savedExpenses = localStorage.getItem("expenseRecords");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  // ================= MESSAGE =================

  const [message, setMessage] = useState("");

  // ================= DAIRY PAYMENTS =================

  const [milkRecords] = useState(() => {
    const savedMilk = localStorage.getItem("milkRecords");
    return savedMilk ? JSON.parse(savedMilk) : [];
  });

  // ================= FEED RECORDS =================

  const [feedRecords] = useState(() => {
    const savedFeed = localStorage.getItem("feedRecords");
    return savedFeed ? JSON.parse(savedFeed) : [];
  });

  // ================= ADD INCOME =================

  const handleAddIncome = () => {
    if (!incomeType || !incomeAmount || !incomeDate) {
      setMessage("Please fill all income fields");
      return;
    }

    if (Number(incomeAmount) <= 0) {
      setMessage("Income amount must be greater than 0");
      return;
    }

    const newIncome = {
      id: Date.now(),
      incomeType: incomeType,
      amount: Number(incomeAmount),
      date: incomeDate,
      description: incomeDescription,
    };

    const updatedIncome = [...incomeRecords, newIncome];

    setIncomeRecords(updatedIncome);

    localStorage.setItem(
      "incomeRecords",
      JSON.stringify(updatedIncome)
    );

    setIncomeType("");
    setIncomeAmount("");
    setIncomeDescription("");
    setIncomeDate(
      new Date().toISOString().split("T")[0]
    );

    setMessage("Income added successfully!");
  };

  // ================= ADD EXPENSE =================

  const handleAddExpense = () => {
    if (!expenseType || !expenseAmount || !expenseDate) {
      setMessage("Please fill all expense fields");
      return;
    }

    if (Number(expenseAmount) <= 0) {
      setMessage("Expense amount must be greater than 0");
      return;
    }

    const newExpense = {
      id: Date.now(),
      expenseType: expenseType,
      amount: Number(expenseAmount),
      date: expenseDate,
      description: expenseDescription,
    };

    const updatedExpenses = [
      ...expenseRecords,
      newExpense,
    ];

    setExpenseRecords(updatedExpenses);

    localStorage.setItem(
      "expenseRecords",
      JSON.stringify(updatedExpenses)
    );

    setExpenseType("");
    setExpenseAmount("");
    setExpenseDescription("");
    setExpenseDate(
      new Date().toISOString().split("T")[0]
    );

    setMessage("Expense added successfully!");
  };

  // ================= CALCULATE TOTALS =================

  const totalIncome = incomeRecords.reduce(
    (total, income) =>
      total + Number(income.amount || 0),
    0
  );

  // Other expenses entered manually
  const otherExpenses = expenseRecords.reduce(
    (total, expense) =>
      total + Number(expense.amount || 0),
    0
  );

  // ================= FEED EXPENSE =================

  const feedExpense = feedRecords.reduce(
    (total, feed) =>
      total + Number(feed.cost || 0),
    0
  );

  // Total expense = manual expenses + feed expenses
  const totalExpense = otherExpenses + feedExpense;

  // ================= DAIRY PAYMENT =================

  const dairyPayment = milkRecords.reduce(
    (total, milk) =>
      total + Number(milk.amount || 0),
    0
  );

  // ================= TOTAL INCOME =================

  const totalFinancialIncome =
    totalIncome + dairyPayment;

  // ================= PROFIT / LOSS =================

  const profitLoss =
    totalFinancialIncome - totalExpense;

  // ================= MAIN MENU =================

 if (!activeSection) {
  return (
    <div className="financial-page">

      <div className="financial-header">
        <div className="financial-icon">💰</div>

        <h1>Financial Management</h1>

        <p>
          Manage income, expenses, dairy payments and
          profit or loss.
        </p>
      </div>

      <div className="financial-menu-grid">

        <button
          className="financial-menu-card"
          onClick={() => {
            setActiveSection("income");
            setMessage("");
          }}
        >
          <span>💵</span>
          <strong>Income</strong>
          <small>
            Add and manage your income records
          </small>
        </button>

        <button
          className="financial-menu-card"
          onClick={() => {
            setActiveSection("expenses");
            setMessage("");
          }}
        >
          <span>💸</span>
          <strong>Expenses</strong>
          <small>
            Track farm and other expenses
          </small>
        </button>

        <button
          className="financial-menu-card"
          onClick={() => {
            setActiveSection("payments");
            setMessage("");
          }}
        >
          <span>🥛</span>
          <strong>Dairy Payments</strong>
          <small>
            View milk payment records
          </small>
        </button>

        <button
          className="financial-menu-card"
          onClick={() => {
            setActiveSection("profitloss");
            setMessage("");
          }}
        >
          <span>📊</span>
          <strong>Profit / Loss</strong>
          <small>
            Check your overall financial performance
          </small>
        </button>

      </div>

    </div>
  );
}
  // ================= INCOME SECTION =================

 if (activeSection === "income") {
  return (
    <div className="financial-section">

      {/* Header */}
      <div className="financial-section-top">
        <div>
          <h1>💵 Income Management</h1>
          <p>Add and manage your farm income records.</p>
        </div>

        <button
          className="financial-back-button"
          onClick={() => {
            setActiveSection("");
            setMessage("");
          }}
        >
          ← Back
        </button>
      </div>

      {/* Add Income */}
      <div className="financial-form-card">

        <div className="financial-form-title">
          <span>💵</span>
          <div>
            <h2>Add Income</h2>
            <p>Enter your income details below.</p>
          </div>
        </div>

        <div className="financial-form-grid">

          <div className="financial-form-group">
            <label>Income Type</label>
            <select
              value={incomeType}
              onChange={(e) => setIncomeType(e.target.value)}
            >
              <option value="">Select Income Type</option>
              <option value="Milk Income">Milk Income</option>
              <option value="Cow Sale">Cow Sale</option>
              <option value="Calf Sale">Calf Sale</option>
              <option value="Other Income">Other Income</option>
            </select>
          </div>

          <div className="financial-form-group">
            <label>Amount (₹)</label>
            <input
              type="number"
              placeholder="Enter income amount"
              value={incomeAmount}
              onChange={(e) => setIncomeAmount(e.target.value)}
            />
          </div>

          <div className="financial-form-group">
            <label>Date</label>
            <input
              type="date"
              value={incomeDate}
              onChange={(e) => setIncomeDate(e.target.value)}
            />
          </div>

          <div className="financial-form-group">
            <label>Description</label>
            <input
              type="text"
              placeholder="Example: Cow sale"
              value={incomeDescription}
              onChange={(e) => setIncomeDescription(e.target.value)}
            />
          </div>

        </div>

        <button
          className="financial-add-button"
          onClick={handleAddIncome}
        >
          ➕ Add Income
        </button>

        {message && (
          <p className="financial-message">{message}</p>
        )}

      </div>

      {/* Income History */}
      <div className="financial-list-card">

        <div className="financial-list-header">
          <div>
            <h2>📋 Income History</h2>
            <p>View all recorded income transactions.</p>
          </div>
        </div>

        {incomeRecords.length === 0 ? (

          <div className="financial-empty">
            <div>💵</div>
            <h3>No income records available</h3>
            <p>Add an income record to start tracking your earnings.</p>
          </div>

        ) : (

          <div className="financial-table-container">
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
                      <span className="income-type-badge">
                        {income.incomeType}
                      </span>
                    </td>

                    <td>
                      <strong>₹{Number(income.amount).toFixed(2)}</strong>
                    </td>

                    <td>
                      {income.description || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        )}

      </div>

      {/* Total Income */}
      <div className="total-income-card">
        <div>
          <p>Total Income</p>
          <h2>₹{totalIncome.toFixed(2)}</h2>
        </div>

        <span>💰</span>
      </div>

    </div>
  );
}

  // ================= EXPENSE SECTION =================

  if (activeSection === "expenses") {
  return (
    <div className="financial-section">

      {/* Header */}
      <div className="financial-section-top">
        <div>
          <h1>💸 Expense Management</h1>
          <p>Track farm expenses and feed-related costs.</p>
        </div>

        <button
          className="financial-back-button"
          onClick={() => {
            setActiveSection("");
            setMessage("");
          }}
        >
          ← Back
        </button>
      </div>

      {/* Add Expense */}
      <div className="financial-form-card">

        <div className="financial-form-title">
          <span>💸</span>
          <div>
            <h2>Add Expense</h2>
            <p>Enter your farm expense details below.</p>
          </div>
        </div>

        <div className="financial-form-grid">

          <div className="financial-form-group">
            <label>Expense Type</label>

            <select
              value={expenseType}
              onChange={(e) => setExpenseType(e.target.value)}
            >
              <option value="">Select Expense Type</option>
              <option value="Medicine">Medicine</option>
              <option value="Veterinary">Veterinary</option>
              <option value="Labour">Labour</option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water</option>
              <option value="Cow Purchase">Cow Purchase</option>
              <option value="Other Expense">Other Expense</option>
            </select>
          </div>

          <div className="financial-form-group">
            <label>Amount (₹)</label>

            <input
              type="number"
              placeholder="Enter expense amount"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
            />
          </div>

          <div className="financial-form-group">
            <label>Date</label>

            <input
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
            />
          </div>

          <div className="financial-form-group">
            <label>Description</label>

            <input
              type="text"
              placeholder="Example: Cow medicine"
              value={expenseDescription}
              onChange={(e) => setExpenseDescription(e.target.value)}
            />
          </div>

        </div>

        <button
          className="financial-add-button expense-add-button"
          onClick={handleAddExpense}
        >
          ➕ Add Expense
        </button>

        {message && (
          <p className="financial-message">{message}</p>
        )}

      </div>

      {/* Expense History */}
      <div className="financial-list-card">

        <div className="financial-list-header">
          <div>
            <h2>📋 Expense History</h2>
            <p>View all manually added expense records.</p>
          </div>
        </div>

        {expenseRecords.length === 0 ? (

          <div className="financial-empty">
            <div>💸</div>
            <h3>No expense records available</h3>
            <p>Add an expense record to start tracking your costs.</p>
          </div>

        ) : (

          <div className="financial-table-container">

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
                      <span className="expense-type-badge">
                        {expense.expenseType}
                      </span>
                    </td>

                    <td>
                      <strong>
                        ₹{Number(expense.amount).toFixed(2)}
                      </strong>
                    </td>

                    <td>
                      {expense.description || "-"}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

          </div>

        )}

      </div>

      {/* Expense Summary */}
      <div className="expense-summary-grid">

        <div className="expense-summary-card manual">
          <div>
            <p>Manual Expenses</p>
            <h2>₹{otherExpenses.toFixed(2)}</h2>
          </div>
          <span>💸</span>
        </div>

        <div className="expense-summary-card feed">
          <div>
            <p>Feed Expenses</p>
            <h2>₹{feedExpense.toFixed(2)}</h2>
          </div>
          <span>🌾</span>
        </div>

        <div className="expense-summary-card total">
          <div>
            <p>Total Expenses</p>
            <h2>₹{totalExpense.toFixed(2)}</h2>
          </div>
          <span>📊</span>
        </div>

      </div>

    </div>
  );
}
  // ================= DAIRY PAYMENTS =================

 if (activeSection === "payments") {
  return (
    <div className="financial-section">

      {/* Header */}
      <div className="financial-section-top">
        <div>
          <h1>🥛 Dairy Payments</h1>
          <p>View your milk collection payment records.</p>
        </div>

        <button
          className="financial-back-button"
          onClick={() => {
            setActiveSection("");
            setMessage("");
          }}
        >
          ← Back
        </button>
      </div>

      {milkRecords.length === 0 ? (

        /* Empty State */
        <div className="financial-list-card">
          <div className="financial-empty dairy-empty">
            <div>🥛</div>
            <h3>No dairy payment records available</h3>
            <p>
              Milk collection records will appear here when available.
            </p>
          </div>
        </div>

      ) : (

        <>
          {/* Total Dairy Payment */}
          <div className="dairy-payment-total">
            <div>
              <p>Total Dairy Payment</p>
              <h2>₹{dairyPayment.toFixed(2)}</h2>
              <small>Total payment calculated from milk records</small>
            </div>

            <span>💰</span>
          </div>

          {/* Payment History */}
          <div className="financial-list-card dairy-payment-history">

            <div className="financial-list-header">
              <div>
                <h2>📋 Dairy Payment History</h2>
                <p>
                  View milk quantity, rate and payment details.
                </p>
              </div>
            </div>

            <div className="financial-table-container">
              <table>

                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Session</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {milkRecords.map((milk) => (

                    <tr key={milk.id}>

                      <td>
                        {milk.date || "-"}
                      </td>

                      <td>
                        <span className="session-badge">
                          {milk.session || "-"}
                        </span>
                      </td>

                      <td>
                        <strong>
                          {milk.quantity || 0} L
                        </strong>
                      </td>

                      <td>
                        ₹{milk.rate || 0}
                      </td>

                      <td>
                        <strong>
                          ₹{Number(milk.amount || 0).toFixed(2)}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`payment-status ${
                            (milk.status || "Pending")
                              .toLowerCase()
                          }`}
                        >
                          {milk.status || "Pending"}
                        </span>
                      </td>

                    </tr>

                  ))}
                </tbody>

              </table>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
  // ================= PROFIT / LOSS =================

  if (activeSection === "profitloss") {
  return (
    <div className="financial-section">

      {/* Header */}
      <div className="financial-section-top">
        <div>
          <h1>📊 Profit / Loss Analysis</h1>
          <p>Check your overall farm financial performance.</p>
        </div>

        <button
          className="financial-back-button"
          onClick={() => {
            setActiveSection("");
            setMessage("");
          }}
        >
          ← Back
        </button>
      </div>

      {/* Income Summary */}
      <div className="profit-summary-section">

        <div className="profit-summary-card other-income">
          <span>💵</span>
          <div>
            <p>Other Income</p>
            <h2>₹{totalIncome.toFixed(2)}</h2>
          </div>
        </div>

        <div className="profit-summary-card dairy-income">
          <span>🥛</span>
          <div>
            <p>Dairy Payments</p>
            <h2>₹{dairyPayment.toFixed(2)}</h2>
          </div>
        </div>

        <div className="profit-summary-card total-income">
          <span>💰</span>
          <div>
            <p>Total Income</p>
            <h2>₹{totalFinancialIncome.toFixed(2)}</h2>
          </div>
        </div>

      </div>

      {/* Expense Summary */}
      <div className="financial-list-card profit-expense-card">

        <div className="financial-list-header">
          <div>
            <h2>💸 Expense Summary</h2>
            <p>Breakdown of your total farm expenses.</p>
          </div>
        </div>

        <div className="profit-expense-grid">

          <div className="expense-detail-item">
            <span>🌾</span>
            <div>
              <p>Feed Expenses</p>
              <h3>₹{feedExpense.toFixed(2)}</h3>
            </div>
          </div>

          <div className="expense-detail-item">
            <span>💸</span>
            <div>
              <p>Other Expenses</p>
              <h3>₹{otherExpenses.toFixed(2)}</h3>
            </div>
          </div>

          <div className="expense-detail-item total-expense-detail">
            <span>📉</span>
            <div>
              <p>Total Expenses</p>
              <h3>₹{totalExpense.toFixed(2)}</h3>
            </div>
          </div>

        </div>

      </div>

      {/* Net Profit / Loss */}
      <div
        className={`net-result-card ${
          profitLoss > 0
            ? "profit"
            : profitLoss < 0
            ? "loss"
            : "no-profit-loss"
        }`}
      >

        <div>
          <p>📊 Net Profit / Loss</p>

          <h2>
            ₹{profitLoss.toFixed(2)}
          </h2>

          {profitLoss > 0 ? (
            <strong>✅ You are in Profit.</strong>
          ) : profitLoss < 0 ? (
            <strong>⚠️ You are in Loss.</strong>
          ) : (
            <strong>➖ No Profit, No Loss.</strong>
          )}
        </div>

        <span>
          {profitLoss > 0
            ? "📈"
            : profitLoss < 0
            ? "📉"
            : "➖"}
        </span>

      </div>

    </div>
  );
}

  return null;
}

export default Financial;