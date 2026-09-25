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

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage("");

    // ==========================================
    // VALIDATION
    // ==========================================

    if (
      !name.trim() ||
      !mobile.trim() ||
      !village.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setMessage("Please fill all fields.");
      return;
    }

    if (!/^\d{10}$/.test(mobile.trim())) {
      setMessage("Mobile number must be 10 digits.");
      return;
    }

    if (password.length < 6) {
      setMessage(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      // ==========================================
      // GET FARMERS FROM MYSQL
      // ==========================================

      const farmersResponse = await fetch(
        "http://localhost:5000/api/farmers"
      );

      const farmersData =
        await farmersResponse.json();

      if (!farmersResponse.ok) {
        setMessage(
          farmersData.message ||
            "Failed to fetch farmers."
        );
        return;
      }

      const existingFarmers =
        farmersData.farmers || [];

      // ==========================================
      // CHECK DUPLICATE MOBILE
      // ==========================================

      const duplicateMobile =
        existingFarmers.find(
          (farmer) =>
            String(farmer.mobile) ===
            String(mobile.trim())
        );

      if (duplicateMobile) {
        setMessage(
          "Farmer with this mobile number already exists."
        );
        return;
      }

      // ==========================================
      // GENERATE FARMER ID
      // ==========================================

      let maxNumber = 0;

      existingFarmers.forEach((farmer) => {
        const idNumber = parseInt(
          String(farmer.farmer_id || "").replace(
            /\D/g,
            ""
          ),
          10
        );

        if (
          !isNaN(idNumber) &&
          idNumber > maxNumber
        ) {
          maxNumber = idNumber;
        }
      });

      const farmerId = `F${String(
        maxNumber + 1
      ).padStart(3, "0")}`;

      // ==========================================
      // SAVE FARMER TO MYSQL
      // ==========================================

      const response = await fetch(
        "http://localhost:5000/api/farmers",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            farmerId: farmerId,
            name: name.trim(),
            mobile: mobile.trim(),
            village: village.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "Farmer registration failed."
        );
        return;
      }

      // ==========================================
      // SUCCESS
      // ==========================================

      alert(
        `Farmer registered successfully!\nFarmer ID: ${farmerId}`
      );

      // Clear form
      setName("");
      setMobile("");
      setVillage("");
      setPassword("");
      setConfirmPassword("");

      // Go to login
      navigate("/");
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      setMessage(
        "Cannot connect to server. Please make sure backend is running."
      );
    }
  };

  return (
    <div className="register-page">

      <div className="register-container">

        <h1>👨‍🌾 Farmer Registration</h1>

        <p>Create your farmer account</p>

        <form onSubmit={handleRegister}>

          {/* Farmer Name */}
          <div className="form-group">

            <label>
              Farmer Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter farmer name"
            />

          </div>

          {/* Mobile */}
          <div className="form-group">

            <label>
              Mobile Number
            </label>

            <input
              type="text"
              value={mobile}
              onChange={(e) =>
                setMobile(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
              placeholder="Enter 10 digit mobile number"
              maxLength="10"
            />

          </div>

          {/* Village */}
          <div className="form-group">

            <label>
              Village
            </label>

            <input
              type="text"
              value={village}
              onChange={(e) =>
                setVillage(e.target.value)
              }
              placeholder="Enter village"
            />

          </div>

          {/* Password */}
          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Minimum 6 characters"
            />

          </div>

          {/* Confirm Password */}
          <div className="form-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Confirm password"
            />

          </div>

          {/* Message */}
          {message && (
            <p className="register-message">
              {message}
            </p>
          )}

          <button type="submit">
            Register
          </button>

        </form>

        <div className="login-link">

          <p>
            Already have an account?
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
          >
            ← Back to Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Register;