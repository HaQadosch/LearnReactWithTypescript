import React from 'react';
import './App.css';

import { Header } from './components/Header'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { RepoSearch } from './components/RepoSearch'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer 29a28d5391a9630b07af086f02062ce76eab083c`
  }
})

const App: React.FC = () => {
  return (
    <ApolloProvider client={client} >
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <RepoSearch client={client} />
      </div>
    </ApolloProvider>
  );
}

export default App;
