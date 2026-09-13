import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CenterSettings.css";

function CenterSettings() {
  const navigate = useNavigate();

  const [centerName, setCenterName] = useState("");
  const [inchargeName, setInchargeName] = useState("");
  const [mobile, setMobile] = useState("");
  const [village, setVillage] = useState("");
  const [address, setAddress] = useState("");
  const [milkRate, setMilkRate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedSettings = JSON.parse(
      localStorage.getItem("centerSettings") || "{}"
    );

    setCenterName(savedSettings.centerName || "");
    setInchargeName(savedSettings.inchargeName || "");
    setMobile(savedSettings.mobile || "");
    setVillage(savedSettings.village || "");
    setAddress(savedSettings.address || "");
    setMilkRate(savedSettings.milkRate || "");
  }, []);

  const handleSave = (event) => {
    event.preventDefault();

    const settings = {
      centerName,
      inchargeName,
      mobile,
      village,
      address,
      milkRate,
    };

    localStorage.setItem(
      "centerSettings",
      JSON.stringify(settings)
    );

    setMessage("Center settings saved successfully.");
  };

  return (
    <div className="center-settings-page">
      <nav className="center-settings-navbar">
        <h2>⚙️ Center Settings</h2>

        <button onClick={() => navigate("/dairy/dashboard")}>
          ← Back to Dashboard
        </button>
      </nav>

      <main className="center-settings-main">
        <div className="center-settings-header">
          <div>
            <span>SMART DAIRY CENTER</span>
            <h1>Center Settings</h1>
            <p>Manage your dairy center information.</p>
          </div>

          <div className="settings-icon">⚙️</div>
        </div>

        <section className="settings-card">
          <h2>Center Information</h2>

          <form onSubmit={handleSave}>
            <div className="settings-grid">
              <div className="form-group">
                <label>Center Name</label>
                <input
                  type="text"
                  value={centerName}
                  onChange={(event) =>
                    setCenterName(event.target.value)
                  }
                  placeholder="Enter center name"
                  required
                />
              </div>

              <div className="form-group">
                <label>In-charge Name</label>
                <input
                  type="text"
                  value={inchargeName}
                  onChange={(event) =>
                    setInchargeName(event.target.value)
                  }
                  placeholder="Enter in-charge name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(event) =>
                    setMobile(event.target.value)
                  }
                  placeholder="Enter mobile number"
                  maxLength="10"
                  required
                />
              </div>

              <div className="form-group">
                <label>Village / City</label>
                <input
                  type="text"
                  value={village}
                  onChange={(event) =>
                    setVillage(event.target.value)
                  }
                  placeholder="Enter village or city"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Address</label>
                <textarea
                  value={address}
                  onChange={(event) =>
                    setAddress(event.target.value)
                  }
                  placeholder="Enter center address"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Default Milk Rate ₹ / Liter</label>
                <input
                  type="number"
                  value={milkRate}
                  onChange={(event) =>
                    setMilkRate(event.target.value)
                  }
                  placeholder="Enter milk rate"
                  min="0"
                  required
                />
              </div>
            </div>

            <button className="save-settings-btn" type="submit">
              Save Settings
            </button>

            {message && (
              <p className="success-message">{message}</p>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}

export default CenterSettings;