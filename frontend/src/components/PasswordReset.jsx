import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const PasswordReset = () => {
  const [resetUsername, setResetUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [tokenSent, setTokenSent] = useState(false);
  const [token, setToken] = useState("");
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

  // Request a password reset link via email
  const handlePasswordResetRequest = async () => {
    if (!resetUsername) {
      alert("Please enter your username to request a password reset.");
      return;
    }
    const response = await fetch(`http://localhost:8080/api/users/request-password-reset?username=${resetUsername}`, {
      method: "POST",
    });
    const result = await response.text();
    if (result.includes("Password reset link sent")) {
      alert("Password reset link has been sent to your email.");
      setTokenSent(true);
    } else {
      alert(result);
    }
  };

  // Handle password reset with the new password and token
  const handlePasswordReset = async () => {
    if (!token || !newPassword) {
      alert("Please enter your new password.");
      return;
    }
    const response = await fetch(`http://localhost:8080/api/users/reset-password?token=${token}&newPassword=${newPassword}`, {
      method: "POST",
    });
    const result = await response.text();
    alert(result);
    if (result === "Password reset successfully") {
      setToken("");
      setNewPassword("");
      setResetUsername("");
      setTokenSent(false);
    }
  };

  return (
    <div className="password-reset" id="rcorners2">
      <h2>Reset Password</h2>
      {!tokenSent ? (
        <div>
          <input type="text" placeholder="Enter your username" value={resetUsername} onChange={(e) => setResetUsername(e.target.value)} />
          <button onClick={handlePasswordResetRequest}>Request Reset Link</button>
        </div>
      ) : (
        <div>
          <h3>Enter New Password</h3>
          <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <button onClick={handlePasswordReset}>Reset Password</button>
        </div>
      )}
      <div>
        <Link to="/" style={{ cursor: "pointer", color: "blue" }}>
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default PasswordReset;
