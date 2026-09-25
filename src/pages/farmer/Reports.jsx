import { useEffect, useState } from "react";
import "./Reports.css";

function Reports() {
  const [farmer, setFarmer] = useState(null);

  const [milkRecords, setMilkRecords] = useState([]);
  const [incomeRecords, setIncomeRecords] = useState([]);
  const [expenseRecords, setExpenseRecords] = useState([]);
  const [cows, setCows] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date();

    return `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}`;
  });

  useEffect(() => {
    loadReportData();
  }, []);

  // =========================
  // LOAD FARMER DATA
  // =========================

const loadReportData = async () => {
  try {
    const loggedInFarmerMobile =
      localStorage.getItem("loggedInFarmerMobile");

    const farmers =
      JSON.parse(localStorage.getItem("farmers")) || [];

    const loggedInFarmer = farmers.find(
      (item) =>
        String(item.mobile) ===
        String(loggedInFarmerMobile)
    );

    setFarmer(loggedInFarmer || null);

    if (!loggedInFarmer) {
      setMilkRecords([]);
      setIncomeRecords([]);
      setExpenseRecords([]);
      setCows([]);
      return;
    }

    const farmerId =
      loggedInFarmer.farmerId;

    // =========================
    // LOAD MILK FROM MYSQL
    // =========================

    const milkResponse = await fetch(
      `http://localhost:5000/api/milk-records/${farmerId}`
    );

    const milkData =
      await milkResponse.json();

    if (milkResponse.ok) {
      setMilkRecords(
        Array.isArray(milkData.records)
          ? milkData.records.map((milk) => ({
              ...milk,
              date:
                milk.collection_date ||
                milk.date,
            }))
          : []
      );
    } else {
      setMilkRecords([]);
      console.error(milkData.message);
    }

    // =========================
    // LOAD INCOME FROM MYSQL
    // =========================

    const incomeResponse = await fetch(
      `http://localhost:5000/api/income/${farmerId}`
    );

    const incomeData =
      await incomeResponse.json();

    if (incomeResponse.ok) {
      setIncomeRecords(
        Array.isArray(incomeData.records)
          ? incomeData.records.map((income) => ({
              ...income,
              incomeType:
                income.income_type,
              date:
                income.income_date,
            }))
          : []
      );
    } else {
      setIncomeRecords([]);
      console.error(incomeData.message);
    }

    // =========================
    // LOAD EXPENSE FROM MYSQL
    // =========================

    const expenseResponse = await fetch(
      `http://localhost:5000/api/expenses/${farmerId}`
    );

    const expenseData =
      await expenseResponse.json();

    if (expenseResponse.ok) {
      setExpenseRecords(
        Array.isArray(expenseData.records)
          ? expenseData.records.map(
              (expense) => ({
                ...expense,
                expenseType:
                  expense.expense_type,
                date:
                  expense.expense_date,
              })
            )
          : []
      );
    } else {
      setExpenseRecords([]);
      console.error(
        expenseData.message
      );
    }

    // =========================
    // LOAD COWS FROM MYSQL
    // =========================

    const cowResponse = await fetch(
      `http://localhost:5000/api/cows/${farmerId}`
    );

    const cowData =
      await cowResponse.json();

    if (cowResponse.ok) {
      setCows(
        Array.isArray(cowData.cows)
          ? cowData.cows
          : []
      );
    } else {
      setCows([]);
      console.error(cowData.message);
    }

  } catch (error) {
    console.error(
      "Report data load error:",
      error
    );

    setMilkRecords([]);
    setIncomeRecords([]);
    setExpenseRecords([]);
    setCows([]);
  }
};
  // =========================
  // DATE PARSER
  // =========================

  const getYearMonth = (dateValue) => {
  if (!dateValue) return null;

  const dateString = String(dateValue).trim();

  // YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const parts = dateString.split("-");

    return {
      year: Number(parts[0]),
      month: Number(parts[1]),
    };
  }

  // M/D/YYYY or MM/DD/YYYY
  // Example: 9/19/2026
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    const parts = dateString.split("/");

    return {
      year: Number(parts[2]),
      month: Number(parts[0]),
    };
  }

  // M-D-YYYY or MM-DD-YYYY
  // Example: 9-19-2026
  if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(dateString)) {
    const parts = dateString.split("-");

    return {
      year: Number(parts[2]),
      month: Number(parts[0]),
    };
  }

  // Other valid date formats
  const parsedDate = new Date(dateString);

  if (!isNaN(parsedDate.getTime())) {
    return {
      year: parsedDate.getFullYear(),
      month: parsedDate.getMonth() + 1,
    };
  }

  return null;
};

  // =========================
  // CHECK SELECTED MONTH
  // =========================

  const isSelectedMonth = (dateValue) => {
    if (!dateValue) {
      return false;
    }

    const selectedParts =
      selectedMonth.split("-");

    const selectedYear =
      Number(selectedParts[0]);

    const selectedMonthNumber =
      Number(selectedParts[1]);

    const dateInfo =
      getYearMonth(dateValue);

    if (!dateInfo) {
      return false;
    }

    return (
      dateInfo.year === selectedYear &&
      dateInfo.month === selectedMonthNumber
    );
  };

  // =========================
  // VERIFIED MILK
  // =========================

  const verifiedMilkRecords =
    milkRecords.filter(
      (record) =>
        String(
          record.status || ""
        ).toLowerCase() === "verified"
    );

  // =========================
  // MONTHLY MILK
  // =========================

  const monthlyMilkRecords =
    verifiedMilkRecords.filter(
      (record) =>
        isSelectedMonth(record.date)
    );

  // =========================
  // MONTHLY INCOME
  // =========================

  const monthlyIncomeRecords =
    incomeRecords.filter(
      (record) =>
        isSelectedMonth(record.date)
    );

  // =========================
  // MONTHLY EXPENSE
  // =========================

  const monthlyExpenseRecords =
    expenseRecords.filter(
      (record) =>
        isSelectedMonth(record.date)
    );

  // =========================
  // MILK TOTAL
  // =========================

  const totalMilk =
    monthlyMilkRecords.reduce(
      (total, record) =>
        total +
        Number(record.quantity || 0),
      0
    );

  // =========================
  // MORNING MILK
  // =========================

  const morningMilk =
    monthlyMilkRecords
      .filter(
        (record) =>
          String(
            record.session || ""
          ).toLowerCase() === "morning"
      )
      .reduce(
        (total, record) =>
          total +
          Number(record.quantity || 0),
        0
      );

  // =========================
  // EVENING MILK
  // =========================

  const eveningMilk =
    monthlyMilkRecords
      .filter(
        (record) =>
          String(
            record.session || ""
          ).toLowerCase() === "evening"
      )
      .reduce(
        (total, record) =>
          total +
          Number(record.quantity || 0),
        0
      );

  // =========================
  // MILK EARNING
  // =========================

  const milkEarning =
    monthlyMilkRecords.reduce(
      (total, record) =>
        total +
        Number(record.amount || 0),
      0
    );

  // =========================
  // OTHER INCOME
  // =========================

  const otherIncome =
    monthlyIncomeRecords.reduce(
      (total, record) =>
        total +
        Number(record.amount || 0),
      0
    );

  // =========================
  // TOTAL INCOME
  // =========================

  const totalMonthlyIncome =
    milkEarning + otherIncome;

  // =========================
  // EXPENSE
  // =========================

  const totalExpense =
    monthlyExpenseRecords.reduce(
      (total, record) =>
        total +
        Number(record.amount || 0),
      0
    );

  // =========================
  // PROFIT
  // =========================

  const profit =
    totalMonthlyIncome -
    totalExpense;

  // =========================
  // PENDING
  // =========================

  const pendingMilk =
    milkRecords.filter(
      (record) =>
        !record.status ||
        String(
          record.status
        ).toLowerCase() === "pending"
    );

  // =========================
  // REJECTED
  // =========================

  const rejectedMilk =
    milkRecords.filter(
      (record) =>
        String(
          record.status || ""
        ).toLowerCase() === "rejected"
    );

  // =========================
  // COW STATUS
  // =========================

  const activeCows =
    cows.filter(
      (cow) =>
        String(
          cow.status || ""
        ).toLowerCase() === "active"
    );

  const pregnantCows =
    cows.filter(
      (cow) =>
        String(
          cow.status || ""
        ).toLowerCase() === "pregnant"
    );

  const inactiveCows =
    cows.filter(
      (cow) =>
        String(
          cow.status || ""
        ).toLowerCase() === "inactive"
    );

  return (
    <div className="reports-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="reports-header">
  <div>
    <h1>📊 Farmer Reports</h1>
    <p>
      View your milk, income, expenses
      and farm performance.
    </p>
  </div>

  <button
    className="print-report-btn"
    onClick={() => window.print()}
  >
    🖨️ Print / Save PDF
  </button>
</div>

      {/* =========================
          FARMER INFORMATION
      ========================= */}

      {farmer && (
        <div className="farmer-info-card">

          <div>
            <span>
              👨‍🌾 Farmer Name
            </span>

            <strong>
              {farmer.name}
            </strong>
          </div>

          <div>
            <span>
              🆔 Farmer ID
            </span>

            <strong>
              {farmer.farmerId}
            </strong>
          </div>

          <div>
            <span>
              📱 Mobile
            </span>

            <strong>
              {farmer.mobile}
            </strong>
          </div>

          <div>
            <span>
              📍 Village
            </span>

            <strong>
              {farmer.village}
            </strong>
          </div>

        </div>
      )}

      {/* =========================
          MONTH SELECTOR
      ========================= */}

      <div className="month-selector-card">

        <label>
          📅 Select Month
        </label>

        <input
          type="month"
          value={selectedMonth}
          onChange={(event) =>
            setSelectedMonth(
              event.target.value
            )
          }
        />

      </div>

      {/* =========================
          MAIN SUMMARY
      ========================= */}

      <div className="report-grid">

        <div className="report-card">
          <span>🥛</span>

          <h3>
            Verified Milk
          </h3>

          <strong>
            {totalMilk.toFixed(2)} L
          </strong>

          <small>
            {monthlyMilkRecords.length}
            {" "}entries this month
          </small>
        </div>

        <div className="report-card">
          <span>💰</span>

          <h3>
            Milk Earning
          </h3>

          <strong>
            ₹{milkEarning.toFixed(2)}
          </strong>

          <small>
            Verified milk amount
          </small>
        </div>

        <div className="report-card">
          <span>💵</span>

          <h3>
            Total Income
          </h3>

          <strong>
            ₹{totalMonthlyIncome.toFixed(2)}
          </strong>

          <small>
            Milk + Other Income
          </small>
        </div>

        <div className="report-card">
          <span>💸</span>

          <h3>
            Total Expenses
          </h3>

          <strong>
            ₹{totalExpense.toFixed(2)}
          </strong>

          <small>
            Selected month
          </small>
        </div>

        <div className="report-card">
          <span>📈</span>

          <h3>
            Monthly Profit
          </h3>

          <strong>
            ₹{profit.toFixed(2)}
          </strong>

          <small>
            Income - Expenses
          </small>
        </div>

        <div className="report-card">
          <span>🐄</span>

          <h3>
            Total Cows
          </h3>

          <strong>
            {cows.length}
          </strong>

          <small>
            My registered cows
          </small>
        </div>

      </div>

      {/* =========================
          MILK SUMMARY
      ========================= */}

      <section className="report-section">

        <div className="section-title">

          <h2>
            🥛 Milk Collection Summary
          </h2>

          <p>
            Verified milk collection
            for selected month.
          </p>

        </div>

        <div className="milk-report-grid">

          <div>
            <span>
              🥛 Total Milk
            </span>

            <strong>
              {totalMilk.toFixed(2)} L
            </strong>
          </div>

          <div>
            <span>
              🌅 Morning Milk
            </span>

            <strong>
              {morningMilk.toFixed(2)} L
            </strong>
          </div>

          <div>
            <span>
              🌇 Evening Milk
            </span>

            <strong>
              {eveningMilk.toFixed(2)} L
            </strong>
          </div>

          <div>
            <span>
              📋 Milk Entries
            </span>

            <strong>
              {monthlyMilkRecords.length}
            </strong>
          </div>

        </div>

        {/* DEBUG / DATA MESSAGE */}

        {monthlyMilkRecords.length === 0 && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#fff7ed",
              borderRadius: "10px",
              color: "#9a3412",
              textAlign: "center",
            }}
          >
            No verified milk records found
            for the selected month.
          </div>
        )}

      </section>

      {/* =========================
          FINANCIAL SUMMARY
      ========================= */}

      <section className="report-section">

        <div className="section-title">

          <h2>
            💰 Financial Summary
          </h2>

          <p>
            Income and expense details
            for selected month.
          </p>

        </div>

        <div className="financial-report-grid">

          <div className="financial-box">

            <h3>
              🥛 Milk Income
            </h3>

            <strong>
              ₹{milkEarning.toFixed(2)}
            </strong>

          </div>

          <div className="financial-box">

            <h3>
              💵 Other Income
            </h3>

            <strong>
              ₹{otherIncome.toFixed(2)}
            </strong>

          </div>

          <div className="financial-box">

            <h3>
              💸 Expenses
            </h3>

            <strong>
              ₹{totalExpense.toFixed(2)}
            </strong>

          </div>

          <div className="financial-box">

            <h3>
              📈 Profit
            </h3>

            <strong>
              ₹{profit.toFixed(2)}
            </strong>

          </div>

        </div>

      </section>

      {/* =========================
          COW SUMMARY
      ========================= */}

      <section className="report-section">

        <div className="section-title">

          <h2>
            🐄 Cow Summary
          </h2>

          <p>
            Your registered cow information.
          </p>

        </div>

        <div className="cow-report-grid">

          <div>
            <span>
              🐄 Total Cows
            </span>

            <strong>
              {cows.length}
            </strong>
          </div>

          <div>
            <span>
              ✅ Active
            </span>

            <strong>
              {activeCows.length}
            </strong>
          </div>

          <div>
            <span>
              🤰 Pregnant
            </span>

            <strong>
              {pregnantCows.length}
            </strong>
          </div>

          <div>
            <span>
              🔴 Inactive
            </span>

            <strong>
              {inactiveCows.length}
            </strong>
          </div>

        </div>

      </section>

      {/* =========================
          MILK STATUS
      ========================= */}

      <section className="report-section">

        <div className="section-title">

          <h2>
            📋 Milk Record Status
          </h2>

        </div>

        <div className="status-report-grid">

          <div className="status-box verified">

            <span>
              ✅
            </span>

            <strong>
              {monthlyMilkRecords.length}
            </strong>

            <small>
              Verified this month
            </small>

          </div>

          <div className="status-box pending">

            <span>
              ⏳
            </span>

            <strong>
              {pendingMilk.length}
            </strong>

            <small>
              Pending records
            </small>

          </div>

          <div className="status-box rejected">

            <span>
              ❌
            </span>

            <strong>
              {rejectedMilk.length}
            </strong>

            <small>
              Rejected records
            </small>

          </div>

        </div>

      </section>

      {/* =========================
          FOOTER
      ========================= */}

      <footer className="reports-footer">

        <strong>
          🐄 Smart Dairy & Farmer Farm
          Management System
        </strong>

        <p>
          Farmer-wise Monthly Performance Report
        </p>

        <small>
          © 2026 Smart Dairy
        </small>

      </footer>

    </div>
  );
}

export default Reports;