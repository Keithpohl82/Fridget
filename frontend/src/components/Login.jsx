import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Login.module.css";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Changed from username to identifier
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(
    "https://img.freepik.com/free-vector/happy-cute-girl-chef-holding-bowl-with-whisk-banner-logo-cartoon-art-illustration_56104-786.jpg"
  ); // Default avatar

  // List of avatar options
  const avatarOptions = [
    "https://img.freepik.com/free-vector/happy-cute-girl-chef-holding-bowl-with-whisk-banner-logo-cartoon-art-illustration_56104-786.jpg",
    "https://img.freepik.com/free-vector/cute-shiba-inu-dog-chef-cooking-egg-fried-cartoon-vector-icon-illustration-animal-food-isolated_138676-8268.jpg",
    "https://img.freepik.com/free-vector/cute-cat-chef-cooking-cartoon-vector-icon-illustration-animal-food-icon-concept-isolated-flat-vector_138676-9606.jpg",
    "https://img.freepik.com/free-vector/cute-bear-chef-cooking-honey-cartoon-vector-icon-illustration-animal-food-icon-concept-isolated_138676-7927.jpg",
    "https://img.freepik.com/free-vector/cute-cow-chef-cooking-steak-meat-cartoon-vector-icon-illustration-animal-food-icon-isolated-flat_138676-8887.jpg",
    "https://img.freepik.com/free-vector/cute-astronaut-chef-with-fish-knife-cartoon-vector-icon-illustration-science-food-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4140.jpg",
    "https://img.freepik.com/free-vector/men-chef-holding-plate-cartoon-food-restaurant-logo-hand-draw-vector-illustration_56104-2135.jpg"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8080/api/users/login?identifier=${identifier}&password=${password}`,
      {
        method: "POST",
      }
    );
    const result = await response.text();
    console.log(result);
    if (result === "Invalid credentials") {
      setIdentifier(""); // Clear only the identifier field if login fails
      setPassword("");
    }
    alert(result);
  };

  return (
    <div className={styles.login} id={styles.rcorners2}>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        {/* Avatar Display */}
        <div className={styles.imgcontainer}>
          <img
            src={selectedAvatar}
            alt="Selected Avatar"
            className={styles.avatar}
          />
        </div>

        {/* Avatar Selection Options */}
        <div className={styles.avatarSelection}>
          <p>Select an Avatar:</p>
          <div className={styles.avatarOptions}>
            {avatarOptions.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className={`${styles.avatarOption} ${
                  selectedAvatar === avatar ? styles.selected : ""
                }`}
                onClick={() => setSelectedAvatar(avatar)} // Update selected avatar
              />
            ))}
          </div>
        </div>

        {/* Username and Password Inputs */}
        <div className={styles.container}>
          <div>
            <input
              className={styles.username}
              type="text"
              placeholder="Username or Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              className={styles.password}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="signup">
            <Link
              to="/password-reset"
              style={{ cursor: "pointer", color: "blue" }}
              className={styles.signup}
            >
              Forgot Password?
            </Link>
          </div>

          <button type="submit">Login</button>

          <p>Don't have an account?</p>
          <Link
            to="/register"
            style={{ cursor: "pointer", color: "blue" }}
            className={styles.signup}
          >
            Sign Up!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
