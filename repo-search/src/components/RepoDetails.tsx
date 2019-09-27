import React from 'react'
import './RepoSearch.css'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { produce } from 'immer'

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
  query GetRepo ($orgName: String!, $repoName: String!) {
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

const STAR_REPO = gql`
  mutation starRepo ($repoId: ID!) {
    addStar(input: { starrableId: $repoId}) {
      starrable {
        stargazers {
          totalCount
        }
      }
    }
  }
`

export const RepoDetails: React.FC<IRepoDetails> = ({ search: variables }) => {
  const { loading, error, data = { repository: defaultRepo } } = useQuery<IQueryResult, ISearch>(GET_REPO, { variables })
  const [addStar, { loading: mutLoading, error: mutError/*, data: mutData*/, client }] = useMutation(STAR_REPO, {
    variables: { repoId: data.repository.id },
    // refetchQueries: () => [{ query: GET_REPO, variables }],
    update: (cache, { data: { addStar: { starrable: { stargazers: { totalCount } } } } }) => {
      const oldData = cache.readQuery<IQueryResult, ISearch>({ query: GET_REPO, variables })
      if (client && oldData) {
        const newData = produce(oldData, draft => {
          draft.repository.stargazers.totalCount = totalCount
        })
        client.writeQuery({ query: GET_REPO, data: newData })
      }
    }
  })

  return (
    <div className='repo-search'>
      {loading ? <p>Loading...</p> : null}
      {!loading && !error && data.repository && data.repository.id ? (
        <div className="repository-item">
          <h4>
            {data.repository.name}
            {data.repository.stargazers ? ` ${data.repository.stargazers.totalCount} stars` : ''}
          </h4>
          <p>{data.repository.description}</p>
          <div>
            {!data.repository.viewerHasStarred && (
              <div>
                <button onClick={() => addStar()} disabled={mutLoading} >{mutLoading ? 'Adding...' : 'Star!'}</button>
                {mutError && <div>{mutError.message}</div>}
              </div>
            )}
          </div>
          <div>Last 5 issues: {data.repository.issues && data.repository.issues.edges ? (
            <ul>
              {data.repository.issues.edges.map(({ node: { id, title } }) => (
                <li key={id}>{title}</li>
              ))}
            </ul>
          ) : null}</div>
        </div>
      ) : null
      }
      {error ? <p>Error</p> : null}
    </div >
  )
}
