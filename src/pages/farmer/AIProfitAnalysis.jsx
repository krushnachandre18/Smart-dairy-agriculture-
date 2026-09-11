import { useState } from "react";

function AIProfitAnalysis() {
  const [analysis, setAnalysis] = useState(null);
  const [message, setMessage] = useState("");

  const handleAnalysis = () => {
    const savedIncome = localStorage.getItem("incomeRecords");
    const savedExpenses = localStorage.getItem("expenseRecords");

    const incomeRecords = savedIncome
      ? JSON.parse(savedIncome)
      : [];

    const expenseRecords = savedExpenses
      ? JSON.parse(savedExpenses)
      : [];

    if (incomeRecords.length === 0 && expenseRecords.length === 0) {
      setMessage("No financial data available for AI analysis.");
      setAnalysis(null);
      return;
    }

    const totalIncome = incomeRecords.reduce(
      (total, income) => total + Number(income.amount || 0),
      0
    );

    const totalExpense = expenseRecords.reduce(
      (total, expense) => total + Number(expense.amount || 0),
      0
    );

    const profitLoss = totalIncome - totalExpense;

    let profitPercentage = 0;

    if (totalIncome > 0) {
      profitPercentage = (profitLoss / totalIncome) * 100;
    }

    let status = "";

    if (profitLoss > 0) {
      status = "Profit";
    } else if (profitLoss < 0) {
      status = "Loss";
    } else {
      status = "No Profit / No Loss";
    }

    setAnalysis({
      totalIncome,
      totalExpense,
      profitLoss,
      profitPercentage,
      status,
    });

    setMessage("AI Profit Analysis generated successfully!");
  };

  return (
    <div>
      <h1>🤖 AI Profit Analysis</h1>

      <p>
        This module analyzes income and expenses to
        understand the financial performance of the farm.
      </p>

      <hr />

      <button onClick={handleAnalysis}>
        📊 Analyze Profit
      </button>

      <p>{message}</p>

      {analysis && (
        <>
          <hr />

          <h2>📈 Profit Analysis Result</h2>

          <h3>💰 Total Income</h3>
          <p>₹{analysis.totalIncome.toFixed(2)}</p>

          <h3>💸 Total Expenses</h3>
          <p>₹{analysis.totalExpense.toFixed(2)}</p>

          <h3>📊 Net Profit / Loss</h3>
          <p>
            ₹{Math.abs(analysis.profitLoss).toFixed(2)}
          </p>

          <h3>📈 Profit Percentage</h3>
          <p>
            {analysis.profitPercentage.toFixed(2)}%
          </p>

          <h3>📌 Financial Status</h3>
          <p>{analysis.status}</p>

          <hr />

          <h3>💡 AI Insight</h3>

          {analysis.profitLoss > 0 ? (
            <p>
              ✅ Your farm is currently making a profit.
              Try to maintain your income and control
              unnecessary expenses.
            </p>
          ) : analysis.profitLoss < 0 ? (
            <p>
              ⚠️ Your expenses are higher than your income.
              Review major expenses and look for ways to
              increase income.
            </p>
          ) : (
            <p>
              ➖ Your income and expenses are equal.
              There is currently no profit or loss.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default AIProfitAnalysis;