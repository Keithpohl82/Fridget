import { useState } from 'react';

const Register = () => {
 
  const [username, setUsername] = useState('');
  const [pwHash, setPassword] = useState('');
  const [firstName, SetFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userEmail, setEmailAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    //this connects to the backend to call approprate method
    const response = await fetch('http://localhost:8080/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, pwHash, firstName, lastName, userEmail }),
    });
    const result = await response.text();
    window.location.href = result;
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

      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => SetFirstName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email Address"
        value={userEmail}
        onChange={(e) => setEmailAddress(e.target.value)}
        required
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;