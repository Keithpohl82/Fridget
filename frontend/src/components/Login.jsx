import { useState } from "react";
import { Link } from "react-router-dom";

// Avatar Image
const avatar = "https://img.freepik.com/free-vector/happy-cute-girl-chef-holding-bowl-with-whisk-banner-logo-cartoon-art-illustration_56104-786.jpg";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Username or email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const response = await fetch(
      `http://localhost:8080/userservice/login?identifier=${identifier}&password=${password}`,
      {
        method: "POST",
      }
    );
    const result = await response.text();

    if (result === "Invalid credentials") {
      setError("Invalid username or password. Please try again.");
      setIdentifier(""); // Clear input fields if login fails
      setPassword("");
    } else {
      alert(result);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="box">
        <div className="columns is-centered">
          <div className="column is-half">
            <h1 className="title has-text-centered">Login</h1>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="columns is-centered">
            <div className="column is-half">
              <p className="help is-danger has-text-centered">{error}</p>
            </div>
          </div>
        )}

        {/* Avatar Display */}
        <div className="columns is-centered">
          <div className="column is-one-quarter">
            <div className="image is-256x256 is-rounded">
              <img src={avatar} alt="Avatar" className="is-rounded" />
            </div>
          </div>
        </div>

        {/* Username or Email Input */}
        <div className="columns is-centered">
          <div className="column is-half">
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
          </div>
        </div>

        {/* Password Input */}
        <div className="columns is-centered">
          <div className="column is-half">
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
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="columns is-centered">
          <div className="column is-half has-text-centered">
            <Link to="/password-reset" className="is-link">
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Login Button */}
        <div className="field is-grouped is-grouped-centered">
          <button type="submit" className="button is-link">
            Login
          </button>
          <button type="reset" className="button is-light">
            Cancel
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="columns is-centered">
          <div className="column is-half has-text-centered">
            <p>Don't have an account? <Link to="/register" className="is-link">Sign Up!</Link></p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
