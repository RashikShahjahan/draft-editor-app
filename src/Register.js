import React, { useState } from 'react';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState(''); // New state for invite code

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://banglallm.rashik.sh/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          inviteCode // Include invite code in the request
        }),
      });

      const data = await response.json();
      if (response.ok) {
        onRegister(data);
      } else {
        console.error('Registration failed:', data.detail);
      }
    } catch (error) {
      console.error('There was an error registering:', error);
    }
  };


  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label className="form-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="form-field">
          <label className="form-label">Invite Code:</label>
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
          />
        </div>

        </div>
        <div className="form-action">
          <button className="form-button" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}


export default Register;
