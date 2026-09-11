import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/farmer/dashboard");
  };

  return (
    <div>
      <h1>🐄 Smart Dairy & Farm</h1>
      <h2>Farmer Login</h2>

      <input
        type="text"
        placeholder="Mobile Number"
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
      />

      <br />
      <br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;