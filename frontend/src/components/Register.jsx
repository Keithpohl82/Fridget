import { useState, useEffect } from "react";
import clean from '../Pictures/Clean-Plate-Chef.jpg'; // Avatar Image

const Register = () => {
  const [username, setUsername] = useState("");
  const [pwHash, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");

  const checkUsernameAvailability = async (username) => {
    if (username.trim() === "") {
      setUsernameMessage("");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/users/check-username?username=${username}`);
      const message = await response.text();
      setUsernameMessage(message);
    } catch (error) {
      console.error("Error checking username:", error);
      setUsernameMessage("Error checking username");
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      checkUsernameAvailability(username);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [username]);

  // Check if the passwords match
  useEffect(() => {
    if (reenterPassword && pwHash !== reenterPassword) {
      setPasswordMatchMessage("Passwords do not match");
    } else {
      setPasswordMatchMessage("");
    }
  }, [pwHash, reenterPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (pwHash !== reenterPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    const response = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, pwHash, firstName, lastName, userEmail }),
    });

    const result = await response.text();

    if (response.status === 400) {
      setError(result);
    } else {
      alert(result);
      setUsername("");
      setPassword("");
      setReenterPassword("");
      setFirstName("");
      setLastName("");
      setUserEmail("");
      setUsernameMessage("");
      setPasswordMatchMessage("");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="box">
        <div className="columns is-centered">
          <div className="column is-half">
            <h1 className="title has-text-centered">Register</h1>
          </div>
        </div>

        {error && <p className="help is-danger">{error}</p>}

        <div className="columns is-centered">
          <div className="column is-one-quarter">
            <div className="image is-256x256 is-rounded">
              <img src={clean} alt="Avatar" />
            </div>
          </div>
        </div>

        <div className="columns is-centered">
          <div className="column is-half">
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input ${usernameMessage.includes("available") ? "is-success" : "is-danger"}`}
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
                <p className={`help ${usernameMessage.includes("available") ? "is-success" : "is-danger"}`}>
                  {usernameMessage}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Password and Re-enter Password fields */}
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      placeholder="Enter your password"
                      value={pwHash}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="column is-half">
                <div className="field">
                  <div className="control has-icons-left">
                    <input
                      className={`input ${passwordMatchMessage ? "is-danger" : "is-success"}`}
                      type="password"
                      placeholder="Re-enter your password"
                      value={reenterPassword}
                      onChange={(e) => setReenterPassword(e.target.value)}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                    <p className="help is-danger">{passwordMatchMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* First Name and Last Name inputs */}
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="field">
              <input
                className="input"
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="columns is-centered">
          <div className="column is-half">
            <div className="field">
              <input
                className="input"
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="columns is-centered">
          <div className="column is-half">
            <div className="field">
              <input
                className="input"
                type="email"
                placeholder="Enter your email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered">
          <button type="submit" className="button is-link">
            Register
          </button>
          <button type="reset" className="button is-light">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
