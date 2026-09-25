import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer");
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
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

    try {
      // =========================
      // FARMER LOGIN
      // =========================
      if (role === "farmer") {
        const response = await fetch(
          "http://localhost:5000/api/farmers/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mobile: mobile.trim(),
              password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(
            data.message || "Invalid farmer mobile number or password."
          );
          return;
        }

        const farmer = data.farmer;

        // Save logged-in farmer information
        localStorage.setItem(
          "loggedInFarmerMobile",
          farmer.mobile
        );

        localStorage.setItem(
          "loggedInFarmerId",
          farmer.farmer_id
        );

        localStorage.setItem(
          "loggedInFarmerDbId",
          farmer.id
        );

        localStorage.setItem(
          "loggedInRole",
          "farmer"
        );

        navigate("/farmer/dashboard");
        return;
      }

      // =========================
      // DAIRY LOGIN
      // =========================
    if (role === "dairy") {
  const response = await fetch(
    "http://localhost:5000/api/dairy/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: mobile.trim(),
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    setMessage(
      data.message || "Invalid dairy mobile number or password."
    );
    return;
  }

  const dairyUser = data.dairyUser;

  localStorage.setItem(
    "loggedInDairyId",
    dairyUser.id
  );

  localStorage.setItem(
    "dairyMobile",
    dairyUser.mobile
  );

  localStorage.setItem(
    "loggedInRole",
    "dairy"
  );

  navigate("/dairy/dashboard");
}
    } catch (error) {
      console.error("Login error:", error);

      setMessage(
        "Cannot connect to server. Please make sure backend is running."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <h1>🥛 Smart Dairy</h1>

        <p>Login to your account</p>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Login As</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="farmer">
                👨‍🌾 Farmer
              </option>

              <option value="dairy">
                🥛 Dairy
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Mobile Number</label>

            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
              maxLength="10"
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter password"
            />
          </div>

          {message && (
            <p className="login-message">
              {message}
            </p>
          )}

          <button type="submit">
            Login
          </button>

        </form>

        <div className="register-link">
          <p>New farmer?</p>

          <button
            type="button"
            onClick={() => navigate("/register")}
          >
            Create Farmer Account
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;