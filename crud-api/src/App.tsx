import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios'

interface IPost {
  userId: number
  id?: number
  title: string
  body: string
}

interface IPosts {
  posts: IPost[]
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    async function getSome() {
      axios
        .get<IPost[]>('https://jsonplaceholder.typicode.com/posts', {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 5000
        })
        .then(({ data }) => {
          setPosts(data)
        })
        .catch(({ response: { status = 0 } = { status: 0 }, code }) => {
          console.log({ code })
          const error = code === 'ECONNABORTED' 
            ? 'a timeout occured' 
            : status === 404
              ? 'resource not found'
              : 'unexpected error occured'
          setError(error)
        })
    }

    getSome()
  }, [])

  return (
    <div className="App">
      {error !== ''
        ? <p className='error'>{error}</p>
        : null
      }
      <ul className="posts">{
        posts.map(({ userId, id = 0, title, body }) => (
          <li key={id}>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))
      }</ul>
    </div>
  );
}

export default App;
