function Dashboard() {
  return (
    <div>
      <h1>🐄 Smart Dairy</h1>
      <h2>Farmer Dashboard</h2>

      <p>Welcome, Farmer!</p>

      <hr />

      <h3>Today's Overview</h3>

      <div>
        <h4>🐄 Total Cows</h4>
        <p>12</p>
      </div>

      <div>
        <h4>🥛 Today's Milk</h4>
        <p>85 Litres</p>
      </div>

      <div>
        <h4>🌾 Today's Feed</h4>
        <p>42 Kg</p>
      </div>

      <div>
        <h4>💰 This Month Income</h4>
        <p>₹42,500</p>
      </div>

      <div>
        <h4>💸 This Month Expense</h4>
        <p>₹18,200</p>
      </div>

      <hr />

      <h3>Quick Actions</h3>

      <button>Add Cow</button>
      <button>Add Milk Record</button>
      <button>Add Feed Record</button>
      <button>Add Expense</button>
    </div>
  );
}

export default Dashboard;;
