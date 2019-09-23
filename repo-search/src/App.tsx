import React from 'react';
import './App.css';

import { Header } from './components/Header'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'


const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer a413be060a887d1587b252d8636df73c37a40bca`
  }
})

const App: React.FC = () => {
  return (
    <ApolloProvider client={client} >
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
