import { useState } from "react";

function Feed() {
  // -----------------------------
  // ADD FEED / STOCK
  // -----------------------------
  const [feedType, setFeedType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");

  const [feedRecords, setFeedRecords] = useState(() => {
    const savedFeed = localStorage.getItem("feedRecords");
    return savedFeed ? JSON.parse(savedFeed) : [];
  });

  // -----------------------------
  // DAILY FEED USAGE
  // -----------------------------
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

  // -----------------------------
  // ADD FEED
  // -----------------------------
  const handleAddFeed = () => {
    if (!feedType || !quantity || !cost) {
      setMessage("Please fill all feed fields");
      return;
    }

    const newFeed = {
      id: Date.now(),
      feedType: feedType,
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

  // -----------------------------
  // ADD DAILY FEED USAGE
  // -----------------------------
  const handleAddUsage = () => {
    if (!usageFeedType || !usageQuantity || !usageDate) {
      setMessage("Please fill all usage fields");
      return;
    }

    const selectedFeed = feedRecords.filter(
      (feed) => feed.feedType === usageFeedType
    );

    const totalStock = selectedFeed.reduce(
      (total, feed) => total + feed.quantity,
      0
    );

    const previousUsage = usageRecords
      .filter((usage) => usage.feedType === usageFeedType)
      .reduce(
        (total, usage) => total + usage.quantity,
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
    setUsageDate(new Date().toISOString().split("T")[0]);

    setMessage("Daily feed usage added successfully!");
  };

  // -----------------------------
  // GET REMAINING STOCK
  // -----------------------------
  const getRemainingStock = (type) => {
    const totalStock = feedRecords
      .filter((feed) => feed.feedType === type)
      .reduce(
        (total, feed) => total + feed.quantity,
        0
      );

    const totalUsed = usageRecords
      .filter((usage) => usage.feedType === type)
      .reduce(
        (total, usage) => total + usage.quantity,
        0
      );

    return totalStock - totalUsed;
  };

  return (
    <div>
      <h1>🌾 Feed Management</h1>

      <hr />

      {/* =========================
          ADD FEED
      ========================= */}
      <h3>➕ Add Feed</h3>

      <label>Feed Type</label>
      <br />

      <input
        type="text"
        placeholder="Example: Green Grass"
        value={feedType}
        onChange={(e) => setFeedType(e.target.value)}
      />

      <br />
      <br />

      <label>Quantity (Kg)</label>
      <br />

      <input
        type="number"
        placeholder="Enter quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <br />
      <br />

      <label>Cost (₹)</label>
      <br />

      <input
        type="number"
        placeholder="Enter cost"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleAddFeed}>
        Add Feed
      </button>

      <p>{message}</p>

      <hr />

      {/* =========================
          FEED STOCK
      ========================= */}
      <h3>📦 Feed Stock</h3>

      {feedRecords.length === 0 ? (
        <p>No feed stock available.</p>
      ) : (
        <table border="1" cellPadding="8">
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
            {feedRecords.map((feed) => (
              <tr key={feed.id}>
                <td>{feed.feedType}</td>

                <td>
                  {feed.quantity} Kg
                </td>

                <td>
                  {usageRecords
                    .filter(
                      (usage) =>
                        usage.feedType === feed.feedType
                    )
                    .reduce(
                      (total, usage) =>
                        total + usage.quantity,
                      0
                    )}{" "}
                  Kg
                </td>

                <td>
                  {getRemainingStock(feed.feedType)} Kg
                </td>

                <td>
                  ₹{feed.cost}
                </td>

                <td>
                  {feed.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr />

      {/* =========================
          DAILY FEED USAGE
      ========================= */}
      <h3>🐄 Daily Feed Usage</h3>

      <label>Feed Type</label>
      <br />

      <select
        value={usageFeedType}
        onChange={(e) =>
          setUsageFeedType(e.target.value)
        }
      >
        <option value="">
          Select Feed Type
        </option>

        {[
          ...new Set(
            feedRecords.map((feed) => feed.feedType)
          ),
        ].map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <br />
      <br />

      <label>Usage Date</label>
      <br />

      <input
        type="date"
        value={usageDate}
        onChange={(e) =>
          setUsageDate(e.target.value)
        }
      />

      <br />
      <br />

      <label>Quantity Used (Kg)</label>
      <br />

      <input
        type="number"
        placeholder="Enter used quantity"
        value={usageQuantity}
        onChange={(e) =>
          setUsageQuantity(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={handleAddUsage}>
        Add Daily Usage
      </button>

      <hr />

      {/* =========================
          FEED HISTORY
      ========================= */}
      <h3>📋 Feed History</h3>

      {feedRecords.length === 0 &&
      usageRecords.length === 0 ? (
        <p>No feed history available.</p>
      ) : (
        <table border="1" cellPadding="8">
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
            {/* Feed Added History */}
            {feedRecords.map((feed) => (
              <tr key={`add-${feed.id}`}>
                <td>{feed.date}</td>
                <td>{feed.feedType}</td>
                <td>Feed Added</td>
                <td>{feed.quantity} Kg</td>
                <td>₹{feed.cost}</td>
              </tr>
            ))}

            {/* Feed Usage History */}
            {usageRecords.map((usage) => (
              <tr key={`usage-${usage.id}`}>
                <td>{usage.date}</td>
                <td>{usage.feedType}</td>
                <td>Daily Usage</td>
                <td>{usage.quantity} Kg</td>
                <td>-</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Feed;