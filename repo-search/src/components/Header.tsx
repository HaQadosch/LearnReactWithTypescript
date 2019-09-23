import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Header.css'

interface IHeader {

}

interface IViewer {
  name: string
  avatarUrl: string
}

interface IQueryResult {
  data: {
    viewer: IViewer
  }
}

export const Header: React.FC<IHeader> = () => {
  const [viewer, setViewer] = useState<IViewer>({ name: '', avatarUrl: '' })

  useEffect(() => {
    axios
      .post<IQueryResult>('https://api.github.com/graphql', {
        query: `query {
          viewer {
            name
            avatarUrl
          }
        }`
      }, {
        headers: {
          Authorization: "bearer 818899e07bae6d2a310fae56255582844f520c01"
        }
      })
      .then(({data: { data: { viewer }}}) => {
        setViewer(viewer)
      })
  }, [])

  return (
    <div>
      <figure>
        <img src={viewer.avatarUrl} alt="profile avatar" className='avatar' />
        <figcaption>{viewer.name}</figcaption>
      </figure>
      <h2>GitHub Search</h2>
    </div>
  )
}
