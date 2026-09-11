import { useState } from "react";
import "./Feed.css";

function Feed() {
  // =========================
  // Active Section
  // =========================
  const [activeSection, setActiveSection] = useState("menu");

  // =========================
  // ADD FEED / STOCK
  // =========================
  const [feedType, setFeedType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");

  const [feedRecords, setFeedRecords] = useState(() => {
    const savedFeed = localStorage.getItem("feedRecords");
    return savedFeed ? JSON.parse(savedFeed) : [];
  });

  // =========================
  // DAILY FEED USAGE
  // =========================
  const [usageFeedType, setUsageFeedType] = useState("");
  const [usageQuantity, setUsageQuantity] = useState("");

  const [usageDate, setUsageDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [usageRecords, setUsageRecords] = useState(() => {
    const savedUsage = localStorage.getItem("feedUsageRecords");
    return savedUsage ? JSON.parse(savedUsage) : [];
  });

  const [message, setMessage] = useState("");

  // =========================
  // ADD FEED
  // =========================
  const handleAddFeed = () => {
    if (!feedType || !quantity || !cost) {
      setMessage("Please fill all feed fields");
      return;
    }

    if (Number(quantity) <= 0) {
      setMessage("Quantity must be greater than 0");
      return;
    }

    if (Number(cost) < 0) {
      setMessage("Cost cannot be negative");
      return;
    }

    const newFeed = {
      id: Date.now(),
      feedType: feedType.trim(),
      quantity: Number(quantity),
      cost: Number(cost),
      date: new Date().toLocaleDateString(),
    };

    const updatedRecords = [...feedRecords, newFeed];

    setFeedRecords(updatedRecords);

    localStorage.setItem(
      "feedRecords",
      JSON.stringify(updatedRecords)
    );

    setFeedType("");
    setQuantity("");
    setCost("");

    setMessage("Feed stock added successfully!");
  };

  // =========================
  // ADD DAILY FEED USAGE
  // =========================
  const handleAddUsage = () => {
    if (!usageFeedType || !usageQuantity || !usageDate) {
      setMessage("Please fill all usage fields");
      return;
    }

    if (Number(usageQuantity) <= 0) {
      setMessage("Usage quantity must be greater than 0");
      return;
    }

    // Total stock added for selected feed
    const selectedFeed = feedRecords.filter(
      (feed) => feed.feedType === usageFeedType
    );

    const totalStock = selectedFeed.reduce(
      (total, feed) => total + Number(feed.quantity || 0),
      0
    );

    // Total already used
    const previousUsage = usageRecords
      .filter(
        (usage) => usage.feedType === usageFeedType
      )
      .reduce(
        (total, usage) => total + Number(usage.quantity || 0),
        0
      );

    const availableStock = totalStock - previousUsage;

    if (Number(usageQuantity) > availableStock) {
      setMessage(
        `Not enough stock! Available ${availableStock} Kg`
      );
      return;
    }

    const newUsage = {
      id: Date.now(),
      feedType: usageFeedType,
      quantity: Number(usageQuantity),
      date: usageDate,
    };

    const updatedUsageRecords = [
      ...usageRecords,
      newUsage,
    ];

    setUsageRecords(updatedUsageRecords);

    localStorage.setItem(
      "feedUsageRecords",
      JSON.stringify(updatedUsageRecords)
    );

    setUsageFeedType("");
    setUsageQuantity("");

    setUsageDate(
      new Date().toISOString().split("T")[0]
    );

    setMessage(
      "Daily feed usage added successfully!"
    );
  };

  // =========================
  // GET REMAINING STOCK
  // =========================
  const getRemainingStock = (type) => {
    const totalStock = feedRecords
      .filter((feed) => feed.feedType === type)
      .reduce(
        (total, feed) => total + Number(feed.quantity || 0),
        0
      );

    const totalUsed = usageRecords
      .filter((usage) => usage.feedType === type)
      .reduce(
        (total, usage) =>
          total + Number(usage.quantity || 0),
        0
      );

    return totalStock - totalUsed;
  };

  // =========================
  // UNIQUE FEED TYPES
  // =========================
  const uniqueFeedTypes = [
    ...new Set(
      feedRecords.map((feed) => feed.feedType)
    ),
  ];

  // =========================
  // FEED STOCK SUMMARY
  // =========================
  const feedStockSummary = uniqueFeedTypes.map(
    (type) => {
      const totalAdded = feedRecords
        .filter(
          (feed) => feed.feedType === type
        )
        .reduce(
          (total, feed) =>
            total + Number(feed.quantity || 0),
          0
        );

      const totalUsed = usageRecords
        .filter(
          (usage) => usage.feedType === type
        )
        .reduce(
          (total, usage) =>
            total + Number(usage.quantity || 0),
          0
        );

      const remaining = totalAdded - totalUsed;

      return {
        type,
        totalAdded,
        totalUsed,
        remaining,
      };
    }
  );

  // =========================
  // LOW STOCK ALERT
  // =========================
  const lowStockItems = feedStockSummary.filter(
    (feed) => feed.remaining <= 10
  );

  // =========================
  // JSX
  // =========================
  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
     {activeSection === "menu" && (
  <div className="feed-menu">

    <div className="feed-header">
      <div className="feed-icon">🌾</div>

      <h1>Feed Management</h1>

      <p>
        Manage feed types, stock, daily usage and feed history.
      </p>
    </div>

    <div className="feed-menu-grid">

      <button
        className="feed-menu-card"
        onClick={() => {
          setActiveSection("feedType");
          setMessage("");
        }}
      >
        <span>🌱</span>
        <strong>Feed Type & Stock</strong>
        <small>Add new feed and stock quantity</small>
      </button>

      <button
        className="feed-menu-card"
        onClick={() => {
          setActiveSection("feedStock");
          setMessage("");
        }}
      >
        <span>📦</span>
        <strong>Feed Stock</strong>
        <small>View available feed stock</small>
      </button>

      <button
        className="feed-menu-card"
        onClick={() => {
          setActiveSection("dailyUsage");
          setMessage("");
        }}
      >
        <span>🥣</span>
        <strong>Daily Feed Usage</strong>
        <small>Record daily feed consumption</small>
      </button>

      <button
        className="feed-menu-card"
        onClick={() => {
          setActiveSection("summary");
          setMessage("");
        }}
      >
        <span>📊</span>
        <strong>Stock Summary</strong>
        <small>Check stock and low-stock alerts</small>
      </button>

      <button
        className="feed-menu-card"
        onClick={() => {
          setActiveSection("history");
          setMessage("");
        }}
      >
        <span>📋</span>
        <strong>Feed History</strong>
        <small>View all feed transactions</small>
      </button>

    </div>

  </div>
)}
      {activeSection === "feedType" && (
  <div className="feed-section">

    <div className="section-top">
      <div>
        <h1>🌱 Feed Type & Stock</h1>
        <p>Add new feed and manage your feed stock.</p>
      </div>

      <button
        className="back-button"
        onClick={() => {
          setActiveSection("menu");
          setMessage("");
        }}
      >
        ← Back
      </button>
    </div>

    <div className="feed-form-card">

      <div className="form-title">
        <span>🌱</span>
        <div>
          <h2>Add Feed Stock</h2>
          <p>Enter the feed type, quantity and cost.</p>
        </div>
      </div>

      <div className="feed-form-grid">

        <div className="form-group">
          <label>Feed Type</label>

          <input
            type="text"
            placeholder="Example: Green Grass"
            value={feedType}
            onChange={(e) =>
              setFeedType(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Quantity (Kg)</label>

          <input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Cost (₹)</label>

          <input
            type="number"
            placeholder="Enter cost"
            value={cost}
            onChange={(e) =>
              setCost(e.target.value)
            }
          />
        </div>

      </div>

      <button
        className="add-feed-button"
        onClick={handleAddFeed}
      >
        ➕ Add Feed Stock
      </button>

      {message && (
        <p className="feed-message">{message}</p>
      )}

    </div>

  </div>
)}

     {activeSection === "feedStock" && (
  <div className="feed-section">

    <div className="section-top">
      <div>
        <h1>📦 Feed Stock</h1>
        <p>View added feed stock and remaining quantity.</p>
      </div>

      <button
        className="back-button"
        onClick={() => {
          setActiveSection("menu");
          setMessage("");
        }}
      >
        ← Back
      </button>
    </div>

    <div className="feed-list-card">

      <div className="list-header">
        <div>
          <h2>📦 Available Feed Stock</h2>
          <p>
            Total stock records:{" "}
            <strong>{feedRecords.length}</strong>
          </p>
        </div>
      </div>

      {feedRecords.length === 0 ? (
        <div className="empty-feed">
          <div>📦</div>
          <h3>No feed stock available</h3>
          <p>Add feed stock to start managing your inventory.</p>

          <button
            className="add-feed-button"
            onClick={() => {
              setActiveSection("feedType");
              setMessage("");
            }}
          >
            ➕ Add Feed Stock
          </button>
        </div>
      ) : (
        <div className="feed-table-container">

          <table>
            <thead>
              <tr>
                <th>Feed Type</th>
                <th>Added Quantity</th>
                <th>Used Quantity</th>
                <th>Remaining Stock</th>
                <th>Cost</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {feedRecords.map((feed) => {

                const usedQuantity = usageRecords
                  .filter(
                    (usage) =>
                      usage.feedType === feed.feedType
                  )
                  .reduce(
                    (total, usage) =>
                      total +
                      Number(usage.quantity || 0),
                    0
                  );

                const remainingStock =
                  getRemainingStock(feed.feedType);

                return (
                  <tr key={feed.id}>

                    <td>
                      <strong>{feed.feedType}</strong>
                    </td>

                    <td>
                      {feed.quantity} Kg
                    </td>

                    <td>
                      {usedQuantity} Kg
                    </td>

                    <td>
                      <span
                        className={`stock-badge ${
                          remainingStock <= 10
                            ? "low"
                            : "available"
                        }`}
                      >
                        {remainingStock} Kg
                      </span>
                    </td>

                    <td>
                      <strong>₹{feed.cost}</strong>
                    </td>

                    <td>{feed.date}</td>

                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>
      )}

    </div>

  </div>
)}
      {activeSection === "dailyUsage" && (
  <div className="feed-section">

    <div className="section-top">
      <div>
        <h1>🥣 Daily Feed Usage</h1>
        <p>Record the daily feed consumed by your farm.</p>
      </div>

      <button
        className="back-button"
        onClick={() => {
          setActiveSection("menu");
          setMessage("");
        }}
      >
        ← Back
      </button>
    </div>

    <div className="feed-form-card">

      <div className="form-title">
        <span>🥣</span>

        <div>
          <h2>Add Daily Feed Usage</h2>
          <p>Enter the feed type, date and quantity used.</p>
        </div>
      </div>

      <div className="feed-form-grid">

        <div className="form-group">
          <label>Feed Type</label>

          <select
            value={usageFeedType}
            onChange={(e) =>
              setUsageFeedType(e.target.value)
            }
          >
            <option value="">
              Select Feed Type
            </option>

            {uniqueFeedTypes.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Usage Date</label>

          <input
            type="date"
            value={usageDate}
            onChange={(e) =>
              setUsageDate(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Quantity Used (Kg)</label>

          <input
            type="number"
            placeholder="Example: 5"
            value={usageQuantity}
            onChange={(e) =>
              setUsageQuantity(e.target.value)
            }
          />
        </div>

      </div>

      <button
        className="add-feed-button"
        onClick={handleAddUsage}
      >
        ➕ Add Daily Usage
      </button>

      {message && (
        <p className="feed-message">
          {message}
        </p>
      )}

    </div>

  </div>
)}
     {activeSection === "summary" && (
  <div className="feed-section">

    <div className="section-top">
      <div>
        <h1>📊 Feed Stock Summary</h1>
        <p>Monitor feed stock, usage and low-stock alerts.</p>
      </div>

      <button
        className="back-button"
        onClick={() => {
          setActiveSection("menu");
          setMessage("");
        }}
      >
        ← Back
      </button>
    </div>

    <div className="feed-list-card">

      <div className="list-header">
        <div>
          <h2>📊 Stock Overview</h2>
          <p>Current status of all feed types.</p>
        </div>
      </div>

      {feedStockSummary.length === 0 ? (
        <div className="empty-feed">
          <div>📦</div>
          <h3>No feed stock available</h3>
          <p>
            Add feed stock to see the stock summary.
          </p>

          <button
            className="add-feed-button"
            onClick={() => {
              setActiveSection("feedType");
              setMessage("");
            }}
          >
            ➕ Add Feed Stock
          </button>
        </div>
      ) : (
        <>
          <div className="feed-table-container">

            <table>
              <thead>
                <tr>
                  <th>Feed Type</th>
                  <th>Total Added</th>
                  <th>Total Used</th>
                  <th>Remaining</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {feedStockSummary.map((feed) => (
                  <tr key={feed.type}>

                    <td>
                      <strong>{feed.type}</strong>
                    </td>

                    <td>
                      {feed.totalAdded} Kg
                    </td>

                    <td>
                      {feed.totalUsed} Kg
                    </td>

                    <td>
                      <strong>
                        {feed.remaining} Kg
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`stock-status ${
                          feed.remaining <= 10
                            ? "low"
                            : "available"
                        }`}
                      >
                        {feed.remaining <= 10
                          ? "⚠️ Low Stock"
                          : "✅ Available"}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

          </div>

          {lowStockItems.length > 0 && (
            <div className="low-stock-alert">

              <div className="alert-icon">
                ⚠️
              </div>

              <div>
                <h3>Low Stock Alert</h3>

                <p>
                  The following feed items have
                  low stock:
                </p>

                <ul>
                  {lowStockItems.map((feed) => (
                    <li key={feed.type}>
                      <strong>{feed.type}</strong>
                      {" - "}
                      {feed.remaining} Kg remaining
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

          {lowStockItems.length === 0 && (
            <div className="safe-stock-alert">
              <span>✅</span>
              <div>
                <strong>All Feed Stocks Are Safe</strong>
                <p>
                  All feed items are currently above
                  the low-stock level.
                </p>
              </div>
            </div>
          )}
        </>
      )}

    </div>

  </div>
)}

      {activeSection === "history" && (
  <div className="feed-section">

    <div className="section-top">
      <div>
        <h1>📋 Feed History</h1>
        <p>View all feed stock additions and daily usage records.</p>
      </div>

      <button
        className="back-button"
        onClick={() => {
          setActiveSection("menu");
          setMessage("");
        }}
      >
        ← Back
      </button>
    </div>

    <div className="feed-list-card">

      <div className="list-header">
        <div>
          <h2>📋 Feed Transaction History</h2>
          <p>
            Track feed additions and daily consumption.
          </p>
        </div>
      </div>

      {feedRecords.length === 0 && usageRecords.length === 0 ? (
        <div className="empty-feed">
          <div>📋</div>

          <h3>No feed history available</h3>

          <p>
            Add feed stock or daily usage to see history.
          </p>

          <button
            className="add-feed-button"
            onClick={() => {
              setActiveSection("feedType");
              setMessage("");
            }}
          >
            ➕ Add Feed Stock
          </button>
        </div>
      ) : (
        <div className="feed-table-container">

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Feed Type</th>
                <th>Action</th>
                <th>Quantity</th>
                <th>Cost</th>
              </tr>
            </thead>

            <tbody>

              {feedRecords.map((feed) => (
                <tr key={`add-${feed.id}`}>

                  <td>{feed.date}</td>

                  <td>
                    <strong>{feed.feedType}</strong>
                  </td>

                  <td>
                    <span className="history-action added">
                      📦 Feed Added
                    </span>
                  </td>

                  <td>
                    {feed.quantity} Kg
                  </td>

                  <td>
                    <strong>₹{feed.cost}</strong>
                  </td>

                </tr>
              ))}

              {usageRecords.map((usage) => (
                <tr key={`usage-${usage.id}`}>

                  <td>{usage.date}</td>

                  <td>
                    <strong>{usage.feedType}</strong>
                  </td>

                  <td>
                    <span className="history-action used">
                      🥣 Daily Usage
                    </span>
                  </td>

                  <td>
                    {usage.quantity} Kg
                  </td>

                  <td>-</td>

                </tr>
              ))}

            </tbody>
          </table>

        </div>
      )}

    </div>

  </div>
)}
    </div>
  );
}

export default Feed;