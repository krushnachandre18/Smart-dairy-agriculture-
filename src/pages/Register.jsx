import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [village, setVillage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();

    if (
      !name ||
      !mobile ||
      !village ||
      !password ||
      !confirmPassword
    ) {
      setMessage("Please fill all fields.");
      return;
    }

    if (mobile.length !== 10) {
      setMessage("Please enter a valid 10 digit mobile number.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const farmer = {
      name,
      mobile,
      village,
      password,
    };

    localStorage.setItem("farmerAccount", JSON.stringify(farmer));

    alert("Account created successfully!");

    navigate("/");
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <div className="register-logo">🐄</div>

          <h1>Create Account</h1>

          <p>Register your Smart Dairy farmer account</p>
        </div>

        <form className="register-form" onSubmit={handleRegister}>
          <div className="register-form-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="register-form-group">
            <label>Mobile Number</label>

            <input
              type="tel"
              placeholder="Enter 10 digit mobile number"
              maxLength="10"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
            />
          </div>

          <div className="register-form-group">
            <label>Village / City</label>

            <input
              type="text"
              placeholder="Enter village or city"
              value={village}
              onChange={(event) => setVillage(event.target.value)}
            />
          </div>

          <div className="register-form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="register-form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
            />
          </div>

          {message && (
            <p className="register-message">{message}</p>
          )}

          <button className="register-button" type="submit">
            Create Account
          </button>
        </form>

        <p className="login-link-text">
          Already have an account?
        </p>

        <button
          className="back-login-button"
          onClick={() => navigate("/")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Register;