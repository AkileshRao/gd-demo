import './App.css';
import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom'

function App() {
  const [repos, setRepos] = useState([])

  const fetchRepos = () => {
    fetch("https://api.github.com/orgs/godaddy/repos")
      .then(response => response.json())
      .then(reposResponse => setRepos(reposResponse))
      .catch(err => console.log(err))
  }

  const handleClick = (id) => {
    const selectedRepo = repos.find(repo => repo.id == id);
    console.log(selectedRepo)
    return redirect(`/repos/${selectedRepo.id}`);
  }

  useEffect(() => {
    fetchRepos()
  }, [])


  return (
    <div className="App p-4">
      <h1 className='text-3xl font-bold mb-4'>Github repos</h1>
      <div className='grid grid-cols-3 gap-2'>
        {
          repos.map(repo => {
            return <button key={repo.id} className='p-4 bg-cyan-300' onClick={e => handleClick(repo.id)}>
              <p className='text-xl' >{repo.name}</p>
            </button>
          })
        }
      </div>
    </div>
  );
}

export default App;
