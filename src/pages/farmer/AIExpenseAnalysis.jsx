import { useState } from "react";

function AIExpenseAnalysis() {
  const [analysis, setAnalysis] = useState(null);
  const [message, setMessage] = useState("");

  const handleAnalysis = () => {
    const savedExpenses = localStorage.getItem("expenseRecords");

    if (!savedExpenses) {
      setMessage("No expense data available for AI analysis.");
      setAnalysis(null);
      return;
    }

    const expenseRecords = JSON.parse(savedExpenses);

    if (expenseRecords.length === 0) {
      setMessage("No expense records available for AI analysis.");
      setAnalysis(null);
      return;
    }

    const totalExpense = expenseRecords.reduce(
      (total, expense) => total + Number(expense.amount || 0),
      0
    );

    const averageExpense = totalExpense / expenseRecords.length;

    const highestExpense = expenseRecords.reduce(
      (highest, expense) =>
        Number(expense.amount) > Number(highest.amount)
          ? expense
          : highest,
      expenseRecords[0]
    );

    // Expense type analysis
    const expenseByType = {};

    expenseRecords.forEach((expense) => {
      const type = expense.expenseType;

      if (!expenseByType[type]) {
        expenseByType[type] = 0;
      }

      expenseByType[type] += Number(expense.amount || 0);
    });

    let highestExpenseType = "";
    let highestExpenseTypeAmount = 0;

    Object.entries(expenseByType).forEach(([type, amount]) => {
      if (amount > highestExpenseTypeAmount) {
        highestExpenseType = type;
        highestExpenseTypeAmount = amount;
      }
    });

    setAnalysis({
      totalExpense,
      averageExpense,
      highestExpense,
      highestExpenseType,
      highestExpenseTypeAmount,
    });

    setMessage("AI Expense Analysis generated successfully!");
  };

  return (
    <div>
      <h1>🤖 AI Expense Analysis</h1>

      <p>
        This module analyzes your expense records and
        identifies important expense patterns.
      </p>

      <hr />

      <button onClick={handleAnalysis}>
        🔍 Analyze Expenses
      </button>

      <p>{message}</p>

      {analysis && (
        <>
          <hr />

          <h2>📊 Expense Analysis Result</h2>

          <h3>💸 Total Expense</h3>
          <p>₹{analysis.totalExpense.toFixed(2)}</p>

          <h3>📊 Average Expense</h3>
          <p>₹{analysis.averageExpense.toFixed(2)}</p>

          <h3>🔝 Highest Expense</h3>
          <p>
            {analysis.highestExpense.expenseType} -
            ₹{Number(analysis.highestExpense.amount).toFixed(2)}
          </p>

          <h3>📌 Highest Expense Category</h3>
          <p>
            {analysis.highestExpenseType} -
            ₹{analysis.highestExpenseTypeAmount.toFixed(2)}
          </p>

          <hr />

          <h3>💡 AI Insight</h3>

          <p>
            Your highest spending category is{" "}
            <b>{analysis.highestExpenseType}</b>.
          </p>

          <p>
            Total spending is{" "}
            <b>₹{analysis.totalExpense.toFixed(2)}</b>.
          </p>

          <p>
            You can review the{" "}
            <b>{analysis.highestExpenseType}</b> expenses
            to identify possible cost-saving opportunities.
          </p>
        </>
      )}
    </div>
  );
}

export default AIExpenseAnalysis;