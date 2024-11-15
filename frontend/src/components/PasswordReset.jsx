import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const PasswordReset = () => {
  const [resetUsername, setResetUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [tokenSent, setTokenSent] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();

  // Extract the token from the URL when the component mounts
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      setTokenSent(true);
    }
  }, [location.search]);

  const handlePasswordResetRequest = async () => {
    if (!resetUsername) {
      setError("Please enter your username to request a password reset.");
      return;
    }
    const response = await fetch(
      `http://localhost:8080/userservice/request-password-reset?username=${resetUsername}`,
      { method: "POST" }
    );
    const result = await response.text();
    if (result.includes("Password reset link sent")) {
      alert("Password reset link has been sent to your email.");
      setTokenSent(true);
    } else {
      setError(result);
    }
  };

  const handlePasswordReset = async () => {
    if (!token || !newPassword) {
      setError("Please enter your new password.");
      return;
    }
    const response = await fetch(
      `http://localhost:8080/userservice/reset-password?token=${token}&newPassword=${newPassword}`,
      { method: "POST" }
    );
    const result = await response.text();
    alert(result);
    if (result === "Password reset successfully") {
      setToken("");
      setNewPassword("");
      setResetUsername("");
      setTokenSent(false);
      setError("");
    } else {
      setError(result);
    }
  };

  return (
    <div className="container">
      <form className="box">
        <div className="columns is-centered">
          <div className="column is-half">
            <h2 className="title has-text-centered">Reset Password</h2>
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
          <div className="column is-narrow">
            <figure className="image is-128x128">
              <img
                src="https://img.freepik.com/free-vector/cute-bear-confused-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat-vector_138676-9369.jpg"
                alt="Avatar"
                className="is-rounded"
              />
            </figure>
          </div>
        </div>

        {/* Username Input (Request Reset Link) */}
        {!tokenSent ? (
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="field">
                <div className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter your username"
                    value={resetUsername}
                    onChange={(e) => setResetUsername(e.target.value)}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <button
                  type="button"
                  className="button is-link is-fullwidth"
                  onClick={handlePasswordResetRequest}
                >
                  Request Reset Link
                </button>
              </div>
            </div>
          </div>
        ) : (
          // New Password Input (Reset Password)
          <div className="columns is-centered">
            <div className="column is-half">
              <h3 className="subtitle has-text-centered">Enter New Password</h3>
              <div className="field">
                <div className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <button
                  type="button"
                  className="button is-link is-fullwidth"
                  onClick={handlePasswordReset}
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Back to Login Link */}
        <div className="columns is-centered">
          <div className="column is-half has-text-centered">
            <Link to="/login" className="button is-text">
              Back to Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
