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
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // ==========================================
  // LOAD SETTINGS FROM MYSQL
  // ==========================================
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/center-settings"
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(
            data.message || "Failed to load center settings."
          );
          return;
        }

        const settings = data.settings;

        if (!settings) {
          return;
        }

        setCenterName(settings.center_name || "");
        setInchargeName(settings.incharge_name || "");
        setMobile(settings.mobile || "");
        setVillage(settings.village || "");
        setAddress(settings.address || "");
        setMilkRate(settings.milk_rate ?? "");
      } catch (error) {
        console.error("Load settings error:", error);

        setMessage(
          "Cannot connect to server. Please make sure backend is running."
        );
      }
    };

    loadSettings();
  }, []);

  // ==========================================
  // SAVE SETTINGS TO MYSQL
  // ==========================================
  const handleSave = async (event) => {
    event.preventDefault();
    setMessage("");

    // Mobile validation
    if (!/^[0-9]{10}$/.test(mobile)) {
      setMessage(
        "Please enter a valid 10 digit mobile number."
      );
      return;
    }

    // Password validation
    if (password !== "" && password.length < 6) {
  setMessage(
    "Dairy login password must be at least 6 characters."
  );
  return;
}

    // Milk rate validation
    if (
      milkRate === "" ||
      Number(milkRate) < 0
    ) {
      setMessage(
        "Please enter a valid milk rate."
      );
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/center-settings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            centerName: centerName.trim(),
            inchargeName: inchargeName.trim(),
            mobile: mobile.trim(),
            village: village.trim(),
            address: address.trim(),
            milkRate: Number(milkRate),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "Failed to save center settings."
        );
        return;
      }

      // Save dairy login credentials locally
      // Login API will use these credentials
      // only until dairy user update API is added.
      // ==========================================
// UPDATE DAIRY LOGIN CREDENTIALS IN MYSQL
// ==========================================

const dairyId = localStorage.getItem("loggedInDairyId");

if (!dairyId) {
  setMessage("Dairy login session not found.");
  return;
}

if (password !== "") {
  const dairyResponse = await fetch(
    `http://localhost:5000/api/dairy-users/${dairyId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: mobile.trim(),
        password: password,
      }),
    }
  );

  const dairyData = await dairyResponse.json();

  if (!dairyResponse.ok) {
    setMessage(
      dairyData.message ||
        "Failed to update dairy login credentials."
    );
    return;
  }
}

// Update current dairy mobile session
localStorage.setItem(
  "dairyMobile",
  mobile.trim()
);

setPassword("");

setMessage(
  "Center settings and dairy login credentials saved successfully."
);

      setMessage(
        "Center settings saved successfully."
      );
    } catch (error) {
      console.error(
        "Save settings error:",
        error
      );

      setMessage(
        "Cannot connect to server. Please make sure backend is running."
      );
    }
  };

  // ==========================================
  // UI
  // ==========================================
  return (
    <div className="center-settings-page">

      {/* NAVBAR */}
      <nav className="center-settings-navbar">
        <h2>⚙️ Center Settings</h2>

        <button
          onClick={() =>
            navigate("/dairy/dashboard")
          }
        >
          ← Back to Dashboard
        </button>
      </nav>

      <main className="center-settings-main">

        {/* HEADER */}
        <div className="center-settings-header">
          <div>
            <span>
              SMART DAIRY CENTER
            </span>

            <h1>
              Center Settings
            </h1>

            <p>
              Manage your dairy center
              information.
            </p>
          </div>

          <div className="settings-icon">
            ⚙️
          </div>
        </div>

        {/* SETTINGS CARD */}
        <section className="settings-card">
          <h2>
            Center Information
          </h2>

          <form onSubmit={handleSave}>

            <div className="settings-grid">

              {/* CENTER NAME */}
              <div className="form-group">
                <label>
                  Center Name
                </label>

                <input
                  type="text"
                  value={centerName}
                  onChange={(event) =>
                    setCenterName(
                      event.target.value
                    )
                  }
                  placeholder="Enter center name"
                  required
                />
              </div>

              {/* INCHARGE */}
              <div className="form-group">
                <label>
                  In-charge Name
                </label>

                <input
                  type="text"
                  value={inchargeName}
                  onChange={(event) =>
                    setInchargeName(
                      event.target.value
                    )
                  }
                  placeholder="Enter in-charge name"
                  required
                />
              </div>

              {/* MOBILE */}
              <div className="form-group">
                <label>
                  Mobile Number
                </label>

                <input
                  type="tel"
                  value={mobile}
                  onChange={(event) =>
                    setMobile(
                      event.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  placeholder="Enter 10 digit mobile number"
                  maxLength="10"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="form-group">
                <label>
                  Dairy Login Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="Minimum 6 characters"
                  minLength="6"
                  
                />
              </div>

              {/* VILLAGE */}
              <div className="form-group">
                <label>
                  Village / City
                </label>

                <input
                  type="text"
                  value={village}
                  onChange={(event) =>
                    setVillage(
                      event.target.value
                    )
                  }
                  placeholder="Enter village or city"
                  required
                />
              </div>

              {/* ADDRESS */}
              <div className="form-group full-width">
                <label>
                  Address
                </label>

                <textarea
                  value={address}
                  onChange={(event) =>
                    setAddress(
                      event.target.value
                    )
                  }
                  placeholder="Enter center address"
                  rows="4"
                  required
                />
              </div>

              {/* MILK RATE */}
              <div className="form-group">
                <label>
                  Default Milk Rate ₹ / Liter
                </label>

                <input
                  type="number"
                  value={milkRate}
                  onChange={(event) =>
                    setMilkRate(
                      event.target.value
                    )
                  }
                  placeholder="Enter milk rate"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

            </div>

            {/* SAVE BUTTON */}
            <button
              className="save-settings-btn"
              type="submit"
            >
              💾 Save Settings
            </button>

            {/* MESSAGE */}
            {message && (
              <p
                className={
                  message.includes(
                    "successfully"
                  )
                    ? "success-message"
                    : "error-message"
                }
              >
                {message}
              </p>
            )}

          </form>
        </section>

      </main>
    </div>
  );
}

export default CenterSettings;