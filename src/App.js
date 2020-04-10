import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(repository => {
      setRepositories(repository.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Teste - ${new Date()}`,
      url: 'teste.com',
      techs: ['React', 'Node']
    });

    setRepositories([...repositories, response.data])


  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if (response.status === 204) {
      const repository = repositories.filter(repo => repo.id !== id);
      setRepositories(repository)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => {
            return (
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
          </button>
              </li>
            )
          })
        }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
