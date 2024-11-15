import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Password.module.css"; // Using Login styles

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
    const response = await fetch(
      `http://localhost:8080/userservice/request-password-reset?username=${resetUsername}`,
      { method: "POST" }
    );
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
    }
  };

  return (
    <div className={styles.login} id={styles.rcorners2}>
      <form>
        <h2>Reset Password</h2>

        {/* Avatar Display */}
        <div className={styles.imgcontainer}>
          <img
            src="https://img.freepik.com/free-vector/cute-bear-confused-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat-vector_138676-9369.jpg?t=st=1731613878~exp=1731617478~hmac=5e7adc1d6e77f3063bba77245974852c529b0bd26109e756a8afa807c3d72924&w=826"
            alt="Avatar"
            className={styles.avatar} // Circular styling from Login component
          />
        </div>

        {!tokenSent ? (
          <div className={styles.container}>
            <input
              className={styles.username}
              type="text"
              placeholder="Enter your username"
              value={resetUsername}
              onChange={(e) => setResetUsername(e.target.value)}
              required
            />
            <button type="button" onClick={handlePasswordResetRequest}>
              Request Reset Link
            </button>
          </div>
        ) : (
          <div className={styles.container}>
            <h3>Enter New Password</h3>
            <input
              className={styles.password}
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="button" onClick={handlePasswordReset}>
              Reset Password
            </button>
          </div>
        )}
        <div className={styles.signup}>
          <Link to="/login" style={{ cursor: "pointer", color: "blue" }}>
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;
