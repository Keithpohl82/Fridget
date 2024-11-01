import { useState } from 'react';

const Register = () => {
 
  const [username, setUsername] = useState('');
  const [pwHash, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    //this connects to the backend to call approprate method
    const response = await fetch('http://localhost:8080/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, pwHash }),
    });
    const result = await response.text();
    alert(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      
        <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      
      <input
        type="password"
        placeholder="Password"
        value={pwHash}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;