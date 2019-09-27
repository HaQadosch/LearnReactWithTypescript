import React from 'react';
import './App.css';

import { Header } from './components/Header'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { RepoSearch } from './components/RepoSearch'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ebe966db3d4c5cbeede3aabafaedd38398796a6c`
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
