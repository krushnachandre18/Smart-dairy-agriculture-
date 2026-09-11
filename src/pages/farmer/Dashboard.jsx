import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>🐄 Smart Dairy & Farm</h1>
      <h2>Farmer Dashboard</h2>

      <p>Welcome, Farmer!</p>

      <hr />

     

      

      {/* Dairy Module */}
      <h3>🥛 Dairy Module</h3>

      <button onClick={() => navigate("/farmer/milkcollection")}>
        Milk Collection
      </button>

      <button onClick={() => navigate("/farmer/payments")}>
        Payments
      </button>

      <hr />

      {/* Farm Module */}
      <h3>🐄 Farm Module</h3>

      <button onClick={() => navigate("/farmer/cows")}>
       🐄 Cow Management
      </button>

      <button onClick={() => navigate("/farmer/Feed")}>
       🌾 Feed Management
      </button>

      <button onClick={() => navigate("/farmer/financial")}>
  💰 Financial Management
</button>
<button onClick={() => navigate("/farmer/reports")}>
  📊 Reports
</button>
     
      <hr />

      {/* AI Module */}
      
      <h3>🤖 AI Insights</h3>
      
      

      <p><button onClick={() => navigate("/farmer/ai-forecast")}>
  🤖 Milk Forecast
</button></p>
      <p><button onClick={() => navigate("/farmer/ai-expense-analysis")}>
  🤖 Expense Analysis
</button></p>
      <p><button
  onClick={() => navigate("/farmer/ai-profit-analysis")}>
  🤖 Profit Analysis
</button></p>
      <p><button
  onClick={() => navigate("/farmer/ai-anomaly-alert")}
>
  ⚠️ Unusual Milk Alert
</button></p>
    </div>
  );
}

export default Dashboard;