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

export const RepoSearch: React.FC<IRepoSearch> = () => {
  const [search, setSearch] = useState<ISearch>({ orgName: '', repoName: '' })
  const { loading, error, data } = useQuery()

  const handleSearch: React.FormEventHandler<HTMLFormElement> = evt => {
    evt.preventDefault()
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
    </div>
  )
}
