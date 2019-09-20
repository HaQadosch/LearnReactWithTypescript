import React, { useState, useEffect } from 'react';
import './App.css';

import axios, { CancelTokenSource } from 'axios'

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
  const [loading, setLoading] = useState<boolean>(false)
  const [cancelTokenSource/*, setCancelTokenSource*/] = useState<CancelTokenSource>(axios.CancelToken.source())

  const handleCancelClick: React.MouseEventHandler = () => {
    if (cancelTokenSource) {
      console.log('User canceled operation')
      cancelTokenSource.cancel('User canceled operation')
    }
  }

  useEffect(() => {
    async function getSome() {
      setLoading(true)
      axios
        .get<IPost[]>('https://jsonplaceholder.typicode.com/posts', {
          cancelToken: cancelTokenSource.token,
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 5000
        })
        .then(({ data }) => {
          setLoading(false)
          setPosts(data)
        })
        .catch(ex => {
          setLoading(false)
          const { response: { status = 0 } = { status: 0 }, code = '' } = ex
          const error = axios.isCancel(ex)
            ? 'request canceled'
            : code === 'ECONNABORTED'
              ? 'a timeout occured'
              : status === 404
                ? 'resource not found'
                : 'unexpected error occured'
          setError(error)
        })
    }

    getSome()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      {error !== ''
        ? <p className='error'>{error}</p>
        : null
      }
      {loading
        ? <button onClick={handleCancelClick}>Cancel</button>
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
