// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DraftEditor from './DraftEditor';
import Login from './Login';
import Register from './Register';
import './App.css';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  const handleRegister = (data) => {
    console.log('Registration successful:', data);
    handleLogin(data.access_token);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/login" element={!authToken ? <Login onLogin={handleLogin} /> : <Navigate replace to="/" />} />
            <Route path="/register" element={!authToken ? <Register onRegister={handleRegister} /> : <Navigate replace to="/" />} />
            <Route path="/" element={authToken ? <DraftEditor /> : <Navigate replace to="/login" />} />
          </Routes>
          {authToken && (
            <button onClick={handleLogout}>Logout</button>
          )}
        </header>
      </div>
    </Router>
  );
}

export default App;
