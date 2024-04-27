import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RepositoryPage() {
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`);
        setUser(userResponse.data);

        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
        setRepositories(reposResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  const handleShowCommits = (repoName) => {
    navigate(`/history/${username}/${repoName}`);
  };

  return (
    <div>
      {user ? (
        <div>
          <h2><a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.name}</a></h2>
          <img src={user.avatar_url} alt="Profile" />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <h3>Repositories:</h3>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
            <button onClick={() => handleShowCommits(repo.name)}>Show commits</button>
            <p>{repo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepositoryPage;
