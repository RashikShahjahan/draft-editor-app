// Login.js

import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // You would replace this URL with the URL to your authentication API
      const response = await fetch('https://localhost:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      const data = await response.json();
      if (data.access_token) {
        onLogin(data.access_token);
      } else {
        // Handle errors, e.g. show an error message
        console.error('Login failed:', data.detail);
      }
    } catch (error) {
      console.error('There was an error logging in:', error);
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
        </div>
        <div className="form-action">
          <button className="form-button" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}


export default Login;
