import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import happy from '../Pictures/Happy-Chef.jpg';

const Login = ({ refreshUser }) => {
  const [identifier, setIdentifier] = useState(""); // Username or email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Initialize the navigate function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8080/userservice/login?identifier=${identifier}&password=${password}`,
        {
          method: "POST",
          credentials: "include", // Ensure session cookies are sent
        }
      );
      const result = await response.text();

      if (response.ok) {
        alert(result); // Login successful
        refreshUser(); // Notify Navbar to update
        
        // Redirect to the homepage
        navigate("/"); // Navigate to the homepage
      } else {
        setError(result);
        setIdentifier(""); // Clear input fields if login fails
        setPassword("");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <form onSubmit={handleSubmit} className="box">
        <div className="avatar-container" style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={happy} // Replace with actual image URL
            alt="Avatar"
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              border: "2px solid #ffdd57", // Optional: adds a border to the avatar
              objectFit: "cover",
            }}
          />
        </div>
        <h1 className="title has-text-centered">Login</h1>
        {error && <p className="help is-danger has-text-centered">{error}</p>}

        <div className="field">
          <div className="control has-icons-left">
            <input
              className="input"
              type="text"
              placeholder="Username or Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
          </div>
        </div>

        <div className="field">
          <div className="control has-icons-left">
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </div>
        </div>

        <p>
          <Link to="/password-reset" className="is-link">
            Forgot Password?
          </Link>
        </p>

        <div className="field is-grouped is-grouped-centered">
          <button type="submit" className="button is-link">
            Login
          </button>
        </div>

        <p className="has-text-centered">
          Don't have an account?{" "}
          <Link to="/register" className="is-link">
            Sign Up!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
