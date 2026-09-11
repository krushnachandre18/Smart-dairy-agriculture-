import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/farmer/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-logo">
          🐄
        </div>

        <h1>Smart Dairy & Farm</h1>

        <p className="login-subtitle">
          Farmer Management System
        </p>

        <h2>Farmer Login</h2>

        <div className="login-form">
          <label>Mobile Number</label>
          <input
            type="text"
            placeholder="Enter mobile number"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
          />

          <button onClick={handleLogin}>
            Login
          </button>
        </div>

        <p className="login-footer">
          Manage your farm smarter with Smart Dairy
        </p>

      </div>
    </div>
  );
}

export default Login;