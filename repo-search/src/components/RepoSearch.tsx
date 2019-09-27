import React, { useState } from 'react'
import './RepoSearch.css'

import { ApolloClient } from 'apollo-boost'
import { produce } from 'immer'
import { RepoDetails } from './RepoDetails'
interface IRepoSearch {
  client: ApolloClient<any>
}

interface ISearch {
  orgName: string
  repoName: string
}

export const RepoSearch: React.FC<IRepoSearch> = () => {
  const [search, setSearch] = useState<ISearch>({ orgName: 'HaQadosch', repoName: 'LearnReactWithTypescript' })
  const [variables, setVariables] = useState<ISearch>()

  const handleSearch: React.FormEventHandler<HTMLFormElement> = evt => {
    evt.preventDefault()
    setVariables(search)
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
      {variables ? <RepoDetails search={variables} /> : null}
    </div>
  )
}
