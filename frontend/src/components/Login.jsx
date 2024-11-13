import { useState } from "react";
import { Link } from "react-router-dom";
import styles from '../styles/Login.module.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/api/users/login?username=${username}&password=${password}`, {
      method: "POST",
    });
    const result = await response.text();
    console.log(result);
    if (result === "Invalid credentials") {
      setUsername("");
      setPassword("");
    }
    alert(result);
  };

  return (
    <div className={styles.login} id={styles.rcorners2}>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        
        <div className={styles.imgcontainer}>
          <img
            src="https://img.freepik.com/free-vector/happy-cute-girl-chef-holding-bowl-with-whisk-banner-logo-cartoon-art-illustration_56104-786.jpg"
            alt="Avatar"
            className={styles.avatar}
          />
        </div>

        <div className={styles.container}>
          <div>
            <input
              className={styles.username}
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
         

          <div class="signup">
            <Link to="/password-reset" style={{ cursor: "pointer", color: "blue" }} className={styles.signup}>
              Forgot Password?
            </Link>
          </div>

           <button type="submit">Login</button>

          <p>Don't have an account?</p>
          <Link to="/register" style={{ cursor: "pointer", color: "blue" }} className={styles.signup}>
              Sign Up!
            </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
