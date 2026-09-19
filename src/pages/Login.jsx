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
    const mobile = document.querySelector(
    'input[placeholder="Enter mobile number"]'
  ).value;
    if (!mobile) {
    alert("Please enter mobile number");
    return;
  }

    if (role === "farmer") {
     localStorage.setItem("loggedInFarmerMobile", mobile);
navigate("/farmer/dashboard");
    } else {
      navigate("/dairy/dashboard");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <section className="login-left">
          <div className="brand-logo">🐄</div>

          <h1>Smart Dairy& Farmer</h1>

          
            
            <br />
            
         

          <p>
            Manage your cows, milk collection, payments and farm
            activities in one smart platform.
          </p>

          <div className="feature-list">
            <div>🥛 Easy Milk Collection</div>
            <div>🐄 Cow Management</div>
            <div>💰 Payment Tracking</div>
            <div>📊 Smart Reports</div>
          </div>
        </section>

        <section className="login-right">
          <div className="login-card">
            <div className="mobile-logo">🐄</div>

            <h2>Welcome Back!</h2>

            <p className="login-subtitle">
              Login to your Smart Dairy& Farmer account
            </p>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Select Login Type</label>

                <select
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                >
                  <option value="farmer">Farmer Login</option>
                  <option value="dairy">Dairy In-charge Login</option>
                </select>
              </div>

              <div className="form-group">
                <label>Mobile Number</label>

                <input
                  type="tel"
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                  placeholder="Enter mobile number"
                  maxLength="10"
                />
              </div>

              <div className="form-group">
                <label>Password</label>

                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                />
              </div>

              {message && (
                <p className="login-message">{message}</p>
              )}

              <button className="login-button" type="submit">
                Login →
              </button>
              <button
  type="button"
  className="register-link-button"
  onClick={() => navigate("/register")}
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