import React from 'react'
import './RepoSearch.css'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

interface ISearch {
  orgName: string
  repoName: string
}

interface IRepoDetails {
  search: ISearch
}

interface IRepo {
  id: string
  name: string
  description: string
  viewerHasStarred: boolean
  stargazers: {
    totalCount: number
  }
  issues: {
    edges: [
      {
        node: {
          id: string
          title: string
          url: string
        }
      }
    ]
  }
}

interface IQueryResult {
  repository: IRepo
}

const GET_REPO = gql`
  query GetRepo($orgName: String!, $repoName: String!) {
    repository(owner: $orgName, name: $repoName) {
      id
      name 
      description 
      viewerHasStarred 
      stargazers {
        totalCount
      }
      issues(last: 5) {
        edges {
          node {
            id 
            title 
            url 
          }
        }
      }
    }
  }
`

const defaultRepo: IRepo = {
  id: "",
  name: "",
  description: "",
  viewerHasStarred: false,
  stargazers: {
    totalCount: 0
  },
  issues: {
    edges: [
      {
        node: {
          id: "",
          title: "",
          url: ""
        }
      }
    ]
  }
};

export const RepoDetails: React.FC<IRepoDetails> = ({ search: variables }) => {
  const { loading, error, data = { repository: defaultRepo } } = useQuery<IQueryResult, ISearch>(GET_REPO, { variables })

  return (
    <div className='repo-search'>
      {loading ? <p>Loading...</p> : null}
      {!error && data.repository && data.repository.id ? (
        <div className="repository-item">
          <h4>
            {data.repository.name}
            {data.repository.stargazers ? ` ${data.repository.stargazers.totalCount} stars` : ''}
          </h4>
          <p>{data.repository.description}</p>
          <div>Last 5 issues: {data.repository.issues && data.repository.issues.edges ? (
            <ul>
              {data.repository.issues.edges.map(({ node: { id, title } }) => (
                <li key={id}>{title}</li>
              ))}
            </ul>
          ) : null}</div>
        </div>
      ) : null}
      {error ? <p>Error</p> : null}
    </div>
  )
}
