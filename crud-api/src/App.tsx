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

  useEffect(() => {
    async function getSome() {
      axios
        .get<IPost[]>('https://jsonplaceholder.typicode.com/posts')
        .then(({ data }) => {
          setPosts(data)
        })
    }

    getSome()
  }, [])

  return (
    <div className="App">
      <ul className="posts">{
        posts.map(({userId, id = 0, title, body}) => (
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
