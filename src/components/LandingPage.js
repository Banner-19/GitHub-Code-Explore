import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'

function LandingPage({ onUsernameSubmit }) {
  const [username, setUsername] = useState('');
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUsernameSubmit(username);
    history(`/repositories/${username}`);
  };

  return (
    <div>
      <h1>GitHub Repository Explorer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default LandingPage;
