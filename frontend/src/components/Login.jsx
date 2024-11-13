import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetUsername, setResetUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8080/api/users/login?username=${username}&password=${password}`,
      {
        method: "POST",
      }
    );
    const result = await response.text();
    console.log(result);
    if (result === "Invalid credentials") {
      setUsername("");
      setPassword("");
      alert(result);
    } else {
    window.location.href = result;
    }
  };

  const handlePasswordResetRequest = async () => {
    if (!resetUsername) {
      alert("Please enter your username to request a password reset.");
      return;
    }
    const response = await fetch(
      `http://localhost:8080/api/users/request-password-reset?username=${resetUsername}`,
      {
        method: "POST",
      }
    );
    const result = await response.text();
    setResetToken(
      result.includes("Password reset token: ") ? result.split(": ")[1] : ""
    );
    alert(result);
  };

  const handlePasswordReset = async () => {
    if (!resetToken || !newPassword) {
      alert("Please enter the token and your new password.");
      return;
    }
    const response = await fetch(
      `http://localhost:8080/api/users/reset-password?token=${resetToken}&newPassword=${newPassword}`,
      {
        method: "POST",
      }
    );
    const result = await response.text();
    alert(result);
    if (result === "Password reset successfully") {
      setResetToken("");
      setNewPassword("");
      setResetUsername("");
      setIsResettingPassword(false);
    }
  };

  return (
    <div className="login" id="rcorners2">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="imgcontainer">
          <img
            src="https://img.freepik.com/free-vector/happy-cute-girl-chef-holding-bowl-with-whisk-banner-logo-cartoon-art-illustration_56104-786.jpg?semt=ais_hybrid"
            alt="Avatar"
            className="avatar"
          />
        </div>

        <div className="container">
          <div className="username">
            <input
              className="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              name="username"
            />
          </div>

          <div className="password">
            <input
              className="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              name="password"
            />
          </div>
          <div>
            <p
              onClick={() => setIsResettingPassword(true)}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Forgot Password?
            </p>
          </div>

          <button type="submit">Login</button>
        </div>

        <div>
          <p>Don't have an account?</p>
          <p className="sign">Sign Up!</p>
        </div>
      </form>

      {isResettingPassword && (
        <div className="reset-password-section">
          <h2>Reset Password</h2>
          <div>
            <input
              type="text"
              placeholder="Enter your username"
              value={resetUsername}
              onChange={(e) => setResetUsername(e.target.value)}
            />
            <button onClick={handlePasswordResetRequest}>
              Request Reset Token
            </button>
          </div>
          {resetToken && (
            <div>
              <h3>Your Reset Token: {resetToken}</h3>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button onClick={handlePasswordReset}>Reset Password</button>
            </div>
          )}
          <button onClick={() => setIsResettingPassword(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Login;
