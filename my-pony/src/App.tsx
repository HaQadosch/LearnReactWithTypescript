import React from 'react';
import './App.css';
import { Confirm } from './Confirm';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React and Typescript
        </a>
      </header>
      <Confirm
        title={'React and TypeScript'}
        content={'Are you sure you want to learn React and TypeScript?'}
        cancelCaption={'not sure'}
        okCaption={'yes sure'}
      />
    </div>
  );
}

export default App;
