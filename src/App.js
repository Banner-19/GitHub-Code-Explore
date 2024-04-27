import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'; // Import Routes instead of Route
import LandingPage from './components/LandingPage';
import RepositoryPage from './components/RepositoryPage';
import HistoryPage from './components/HistoryPage';


function App() {
  const [username, setUsername] = useState('');

  const handleUsernameSubmit = (newUsername) => {
    setUsername(newUsername);
  };

  return (
    <BrowserRouter>
      <Routes> {/* Use Routes instead of Route */}
        <Route path="/" element={<LandingPage onUsernameSubmit={handleUsernameSubmit} />} />
        <Route path="/repositories/:username" element={<RepositoryPage />} />
        <Route path="/history/:username/:repo" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
