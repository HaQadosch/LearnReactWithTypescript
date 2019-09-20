import React, { useState, useEffect } from 'react';
import './App.css';

import axios, { CancelTokenSource } from 'axios'
import { produce } from 'immer'
interface IPost {
  userId: number
  id?: number
  title: string
  body: string
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [cancelTokenSource/*, setCancelTokenSource*/] = useState<CancelTokenSource>(axios.CancelToken.source())
  const [editPost, setEditPost] = useState<IPost>({ body: '', title: '', userId: 0, id: 0 })

  const handleCancelClick: React.MouseEventHandler = () => {
    if (cancelTokenSource) {
      console.log('User canceled operation')
      cancelTokenSource.cancel('User canceled operation')
    }
  }

  const handleInputTitleChange: React.FormEventHandler<HTMLInputElement> = ({ currentTarget: { value } }) => {
    setEditPost(produce(editPost, draft => {
      draft.title = value
    }))
  }

  const handleTextAreaBodyChange: React.FormEventHandler<HTMLTextAreaElement> = ({ currentTarget: { value } }) => {
    setEditPost(produce(editPost, draft => {
      draft.body = value
    }))
  }

  const handleSaveClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (editPost.id) {
      axios
        .put<IPost>(`https://jsonplaceholder.typicode.com/posts/${editPost.id}`,
          editPost,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then(() => {
          setPosts(posts.filter(({ id }) => id !== editPost.id).concat(editPost))
          setEditPost({ body: '', title: '', userId: 0, id: 0 })
        })
    } else {
      axios
        .post<IPost>('https://jsonplaceholder.typicode.com/posts',
          editPost,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(({ data }) => setPosts(posts.concat(data)))
        .then(() => {
          setEditPost({ body: '', title: '', userId: 0, id: 0 })
        })
    }
  }

  const handleUpdateClick = (post: IPost): React.MouseEventHandler<HTMLButtonElement> => () => {
    setEditPost(post)
  }

  const handleDeleteClick = ({ id }: IPost): React.MouseEventHandler<HTMLButtonElement> => () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        setPosts(posts.filter(({ id: postId }) => postId !== id))
      })
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
          setPosts(data)
          setLoading(false)
        })
        .catch(ex => {
          const { response: { status = 0 } = { status: 0 }, code = '' } = ex
          const error = axios.isCancel(ex)
            ? 'request canceled'
            : code === 'ECONNABORTED'
              ? 'a timeout occured'
              : status === 404
                ? 'resource not found'
                : 'unexpected error occured'
          setError(error)
          setLoading(false)
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
      <div className="post-edit">
        <input type="text" name="title" id="title" placeholder='Enter title' value={editPost.title} onChange={handleInputTitleChange} />
        <textarea name="body" id="body" cols={30} rows={10} placeholder='Enter body' value={editPost.body} onChange={handleTextAreaBodyChange} ></textarea>
        <button onClick={handleSaveClick} >Save</button>
      </div>
      <ul className="posts">{
        posts.map(post => {
          const { id = 0, title, body } = post
          return (
            <li key={id}>
              <h3>{title}</h3>
              <p>{body}</p>
              <button onClick={handleUpdateClick(post)} >Update</button>
              <button onClick={handleDeleteClick(post)} >Delete</button>
            </li>
          )
        })
      }</ul>
    </div>
  );
}

export default App;
