import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>🐄 Smart Dairy</h1>
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

      <p>Milk Forecast: Coming Soon</p>
      <p>Expense Analysis: Coming Soon</p>
      <p>Profit Analysis: Coming Soon</p>
      <p>Unusual Milk Reading Alert: Coming Soon</p>
    </div>
  );
}

export default Dashboard;