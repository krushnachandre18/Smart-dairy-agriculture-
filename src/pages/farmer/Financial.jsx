import { useState } from "react";

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
    setIncomeDate(new Date().toISOString().split("T")[0]);

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

    const updatedExpenses = [...expenseRecords, newExpense];

    setExpenseRecords(updatedExpenses);

    localStorage.setItem(
      "expenseRecords",
      JSON.stringify(updatedExpenses)
    );

    setExpenseType("");
    setExpenseAmount("");
    setExpenseDescription("");
    setExpenseDate(new Date().toISOString().split("T")[0]);

    setMessage("Expense added successfully!");
  };

  // ================= CALCULATE TOTALS =================

  const totalIncome = incomeRecords.reduce(
    (total, income) => total + Number(income.amount),
    0
  );

  const totalExpense = expenseRecords.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  const dairyPayment = milkRecords.reduce(
    (total, milk) => total + Number(milk.amount || 0),
    0
  );

  const totalFinancialIncome = totalIncome + dairyPayment;

  const profitLoss = totalFinancialIncome - totalExpense;

  // ================= MAIN MENU =================

  if (!activeSection) {
    return (
      <div>
        <h1>💰 Financial Management</h1>

        

        <hr />

        <button onClick={() => setActiveSection("income")}>
          💵 Income
        </button>

        <br />
        <br />

        <button onClick={() => setActiveSection("expenses")}>
          💸 Expenses
        </button>

        <br />
        <br />

        <button onClick={() => setActiveSection("payments")}>
          🥛 Dairy Payments
        </button>

        <br />
        <br />

        <button onClick={() => setActiveSection("profitloss")}>
          📊 Profit / Loss
        </button>
      </div>
    );
  }

  // ================= INCOME SECTION =================

  if (activeSection === "income") {
    return (
      <div>
        <h1>💵 Income</h1>

        <button onClick={() => setActiveSection("")}>
          ← Back
        </button>

        <hr />

        <p>{message}</p>

        <label>Income Type</label>
        <br />

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

        <br />
        <br />

        <label>Amount (₹)</label>
        <br />

        <input
          type="number"
          placeholder="Enter income amount"
          value={incomeAmount}
          onChange={(e) => setIncomeAmount(e.target.value)}
        />

        <br />
        <br />

        <label>Date</label>
        <br />

        <input
          type="date"
          value={incomeDate}
          onChange={(e) => setIncomeDate(e.target.value)}
        />

        <br />
        <br />

        <label>Description</label>
        <br />

        <input
          type="text"
          placeholder="Example: Cow sale"
          value={incomeDescription}
          onChange={(e) => setIncomeDescription(e.target.value)}
        />

        <br />
        <br />

        <button onClick={handleAddIncome}>
          Add Income
        </button>

        <hr />

        <h3>📋 Income History</h3>

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

        <hr />

        <h3>Total Income</h3>
        <h2>₹{totalIncome}</h2>
      </div>
    );
  }

  // ================= EXPENSE SECTION =================

  if (activeSection === "expenses") {
    return (
      <div>
        <h1>💸 Expenses</h1>

        <button onClick={() => setActiveSection("")}>
          ← Back
        </button>

        <hr />

        <p>{message}</p>

        <label>Expense Type</label>
        <br />

        <select
          value={expenseType}
          onChange={(e) => setExpenseType(e.target.value)}
        >
          <option value="">Select Expense Type</option>
          <option value="Feed Expense">Feed Expense</option>
          <option value="Medicine">Medicine</option>
          <option value="Veterinary">Veterinary</option>
          <option value="Labour">Labour</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Cow Purchase">Cow Purchase</option>
          <option value="Other Expense">Other Expense</option>
        </select>

        <br />
        <br />

        <label>Amount (₹)</label>
        <br />

        <input
          type="number"
          placeholder="Enter expense amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />

        <br />
        <br />

        <label>Date</label>
        <br />

        <input
          type="date"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
        />

        <br />
        <br />

        <label>Description</label>
        <br />

        <input
          type="text"
          placeholder="Example: Cow medicine"
          value={expenseDescription}
          onChange={(e) =>
            setExpenseDescription(e.target.value)
          }
        />

        <br />
        <br />

        <button onClick={handleAddExpense}>
          Add Expense
        </button>

        <hr />

        <h3>📋 Expense History</h3>

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

        <hr />

        <h3>Total Expenses</h3>
        <h2>₹{totalExpense}</h2>
      </div>
    );
  }

  // ================= DAIRY PAYMENTS =================

  if (activeSection === "payments") {
    return (
      <div>
        <h1>🥛 Dairy Payments</h1>

        <button onClick={() => setActiveSection("")}>
          ← Back
        </button>

        <hr />

        {milkRecords.length === 0 ? (
          <p>No dairy payment records available.</p>
        ) : (
          <>
            <h3>Total Dairy Payment</h3>

            <h2>₹{dairyPayment.toFixed(2)}</h2>

            <hr />

            <h3>📋 Dairy Payment History</h3>

            <table border="1" cellPadding="8">
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
                    <td>{milk.date || "-"}</td>
                    <td>{milk.session || "-"}</td>
                    <td>{milk.quantity || 0} L</td>
                    <td>₹{milk.rate || 0}</td>
                    <td>₹{milk.amount || 0}</td>
                    <td>{milk.status || "Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    );
  }

  // ================= PROFIT / LOSS =================

  if (activeSection === "profitloss") {
    return (
      <div>
        <h1>📊 Profit / Loss</h1>

        <button onClick={() => setActiveSection("")}>
          ← Back
        </button>

        <hr />

        <h3>💵 Other Income</h3>
        <h2>₹{totalIncome.toFixed(2)}</h2>

        <h3>🥛 Dairy Payments</h3>
        <h2>₹{dairyPayment.toFixed(2)}</h2>

        <h3>💰 Total Income</h3>
        <h2>₹{totalFinancialIncome.toFixed(2)}</h2>

        <hr />

        <h3>💸 Total Expenses</h3>
        <h2>₹{totalExpense.toFixed(2)}</h2>

        <hr />

        <h3>📊 Net Profit / Loss</h3>

        <h2>₹{profitLoss.toFixed(2)}</h2>

        {profitLoss > 0 ? (
          <p>✅ You are in Profit.</p>
        ) : profitLoss < 0 ? (
          <p>⚠️ You are in Loss.</p>
        ) : (
          <p>➖ No Profit, No Loss.</p>
        )}
      </div>
    );
  }

  return null;
}

export default Financial;