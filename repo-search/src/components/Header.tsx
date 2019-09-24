import React from 'react'
import './Header.css'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

interface IHeader {

}

interface IViewer {
  name: string
  avatarUrl: string
}

interface IQueryResult {
  viewer: IViewer
}

const GET_VIEWER = gql`
  query getViewer {
    viewer {
      name
      avatarUrl
    }
  }
`

export const Header: React.FC<IHeader> = () => {
  const { loading, error, data } = useQuery<IQueryResult>(GET_VIEWER)

  return (
    <div>
      {loading
        ? <p>Loading...</p>
        : error
          ? <div className="viewer">{error.toString()}</div>
          : <figure>
            <img src={data && data.viewer.avatarUrl} alt="profile avatar" className='avatar' />
            <figcaption>{data && data.viewer.name}</figcaption>
          </figure>
      }
      <h2>GitHub Search</h2>
    </div>
  )
}
