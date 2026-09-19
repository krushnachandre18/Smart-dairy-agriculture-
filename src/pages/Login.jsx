import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer");
  const [message, setMessage] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    setMessage("");

    if (!mobile.trim()) {
      setMessage("Please enter mobile number.");
      return;
    }

    if (!password.trim()) {
      setMessage("Please enter password.");
      return;
    }

    // =========================
    // FARMER LOGIN
    // =========================

    if (role === "farmer") {
      const farmers =
        JSON.parse(localStorage.getItem("farmers")) || [];

      const farmer = farmers.find(
        (item) =>
          String(item.mobile) === String(mobile) &&
          String(item.password) === String(password)
      );

      if (!farmer) {
        setMessage(
          "Invalid farmer mobile number or password."
        );
        return;
      }

      localStorage.setItem(
        "loggedInFarmerMobile",
        mobile
      );

      localStorage.setItem(
        "loggedInFarmerId",
        farmer.farmerId || ""
      );

      navigate("/farmer/dashboard");
      return;
    }

    // =========================
    // DAIRY LOGIN
    // =========================

    if (role === "dairy") {
      const dairyMobile =
        localStorage.getItem("dairyMobile");

      const dairyPassword =
        localStorage.getItem("dairyPassword");

      // Default Dairy Login
      const defaultDairyMobile = "9999999999";
      const defaultDairyPassword = "dairy123";

      const savedMobile =
        dairyMobile || defaultDairyMobile;

      const savedPassword =
        dairyPassword || defaultDairyPassword;

      if (
        String(mobile) !== String(savedMobile) ||
        String(password) !== String(savedPassword)
      ) {
        setMessage(
          "Invalid dairy mobile number or password."
        );
        return;
      }

      localStorage.setItem(
        "loggedInRole",
        "dairy"
      );

      navigate("/dairy/dashboard");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* ================= LEFT SIDE ================= */}

        <section className="login-left">

          <div className="brand-logo">🐄</div>

          <h1>Smart Dairy & Farmer</h1>

          <br />

          <p>
            Manage your cows, milk collection,
            payments and farm activities in one
            smart platform.
          </p>

          <div className="feature-list">
            <div>🥛 Easy Milk Collection</div>
            <div>🐄 Cow Management</div>
            <div>💰 Payment Tracking</div>
            <div>📊 Smart Reports</div>
          </div>

        </section>

        {/* ================= RIGHT SIDE ================= */}

        <section className="login-right">

          <div className="login-card">

            <div className="mobile-logo">🐄</div>

            <h2>Welcome Back!</h2>

            <p className="login-subtitle">
              Login to your Smart Dairy & Farmer
              account
            </p>

            <form onSubmit={handleLogin}>

              {/* LOGIN TYPE */}

              <div className="form-group">

                <label>
                  Select Login Type
                </label>

                <select
                  value={role}
                  onChange={(event) => {
                    setRole(event.target.value);
                    setMessage("");
                  }}
                >
                  <option value="farmer">
                    Farmer Login
                  </option>

                  <option value="dairy">
                    Dairy In-charge Login
                  </option>
                </select>

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
                    setMobile(event.target.value)
                  }
                  placeholder="Enter mobile number"
                  maxLength="10"
                />

              </div>

              {/* PASSWORD */}

              <div className="form-group">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter password"
                />

              </div>

              {/* MESSAGE */}

              {message && (
                <p className="login-message">
                  {message}
                </p>
              )}

              {/* LOGIN BUTTON */}

              <button
                className="login-button"
                type="submit"
              >
                Login →
              </button>

              {/* REGISTER */}

              <button
                type="button"
                className="register-link-button"
                onClick={() =>
                  navigate("/register")
                }
              >
                Create New Account
              </button>

            </form>

            <p className="login-footer">
              Smart Dairy & Farm System
            </p>

          </div>

        </section>

      </div>
    </div>
  );
}

export default Login;