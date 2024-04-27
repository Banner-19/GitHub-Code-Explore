import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function HistoryPage() {
  const navigate = useNavigate();
  const { username, repo } = useParams();
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/commits`);
        setCommits(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching commits:', error);
        setLoading(false);
      }
    };

    fetchCommits();
  }, [username, repo]);

  const handleGoBackToRepository = () => {
    navigate(`/repositories/${username}`);
  };

  if (loading) {
    return <div>Loading commit history...</div>;
  }

  return (
    <div>
      <h2>Commit History for {repo}</h2>
      <ul>
        {commits.map((commit) => (
          <li key={commit.sha}>{commit.commit.message}</li>
        ))}
      </ul>
      <button onClick={handleGoBackToRepository}>Repository Page</button>
      <button onClick={() => navigate('/')}>Landing Page</button> {/* This button uses the browser history to go back */}
    </div>
  );
}

export default HistoryPage;
