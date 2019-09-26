import React, { useState } from 'react'
import './RepoSearch.css'

import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

import { produce } from 'immer'

interface IRepoSearch {
  client: ApolloClient<any>
}

interface ISearch {
  orgName: string
  repoName: string
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

export const RepoSearch: React.FC<IRepoSearch> = () => {
  const [search, setSearch] = useState<ISearch>({ orgName: '', repoName: '' })
  const [variables, setVariables] = useState<ISearch>({ orgName: 'HaQadosch', repoName: 'LearnReactWithTypescript' })
  const [repo, setRepo] = useState<IRepo>(defaultRepo)
  const { loading, error, data } = useQuery<IQueryResult, ISearch>(GET_REPO, {
    variables: {
      repoName: variables.repoName,
      orgName: variables.orgName
    }
  })
  
  const handleSearch: React.FormEventHandler<HTMLFormElement> = evt => {
    evt.preventDefault()
    if (!loading && !error && data && data.repository && search) {
      setVariables(search)
      setRepo(data.repository)
    }
  }

  const handleOrgNameInputChange: React.FormEventHandler<HTMLInputElement> = ({ currentTarget: { value } }) => {
    setSearch(produce(search, draft => {
      draft.orgName = value
    }))
  }

  const handleRepoNameInputChange: React.FormEventHandler<HTMLInputElement> = ({ currentTarget: { value } }) => {
    setSearch(produce(search, draft => {
      draft.repoName = value
    }))
  }

  return (
    <div className='repo-search'>
      <form onSubmit={handleSearch} >
        <label htmlFor="organisation">Organisation</label>
        <input type="text" name="organisation" id="organisation" onChange={handleOrgNameInputChange} value={search.orgName} />
        <label htmlFor="repo">Repository</label>
        <input type="text" name="repo" id="repo" onChange={handleRepoNameInputChange} value={search.repoName} />
        <button type="submit">Search</button>
      </form>
      {error ? <p>{error}</p> : null}
      {repo.id ? (
        <div className="repo-item">
          <h4>
            {repo.name}
            {repo.stargazers ? ` ${repo.stargazers.totalCount} stars` : ''}
          </h4>
          <p>{repo.description}</p>
          <div>Last 5 issues: {repo.issues && repo.issues.edges ? (
            <ul>
              {repo.issues.edges.map(({ node: { id, title } }) => (
                <li key={id}>{title}</li>
              ))}
            </ul>
          ) : null}</div>
        </div>
      ) : null}
    </div>
  )
}
