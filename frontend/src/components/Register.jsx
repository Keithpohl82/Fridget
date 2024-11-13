import { useState, useEffect } from "react";
import styles from "../styles/Register.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [pwHash, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState(""); // State for registration error messages
  const [usernameMessage, setUsernameMessage] = useState(""); // State for username availability message

  const checkUsernameAvailability = async (username) => {
    if (username.trim() === "") {
      setUsernameMessage(""); // Clear message if input is empty
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/users/check-username?username=${username}`);
      const message = await response.text();
      setUsernameMessage(message); // Set message based on response
    } catch (error) {
      console.error("Error checking username:", error);
      setUsernameMessage("Error checking username"); // Error message if request fails
    }
  };

  // useEffect to call the check function when username changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      checkUsernameAvailability(username);
    }, 500); // Delay of 500ms to reduce API calls while typing. Hitting endpoints too rapidly is bad. Might need to extend this delay for performance.

    return () => clearTimeout(delayDebounceFn);
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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
      setFirstName("");
      setLastName("");
      setUserEmail("");
      setUsernameMessage(""); // Clear username availability message
    }
  };

  return (
    <div className={styles.login} id={styles.rcorners2}>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className={styles.imgcontainer}>
          <img src="https://img.freepik.com/free-vector/men-chef-holding-plate-cartoon-food-restaurant-logo-hand-draw-vector-illustration_56104-2135.jpg" alt="Avatar" className={styles.avatar} />
        </div>
        <div className={styles.container}>
          <input className={styles.username} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          {usernameMessage && <p style={{ color: usernameMessage.includes("available") ? "green" : "red" }}>{usernameMessage}</p>}
          <input className={styles.password} type="password" placeholder="Password" value={pwHash} onChange={(e) => setPassword(e.target.value)} required />
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <input type="email" placeholder="Email Address" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
