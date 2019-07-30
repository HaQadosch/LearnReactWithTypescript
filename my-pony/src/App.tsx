import React, { useState } from 'react';
import './App.css';
import { Confirm } from './Confirm';

const App: React.FC = () => {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(true)

  const onOKClick = () => {
    console.log('handleOKClick')
    setConfirmOpen(false)
  }
  
  const onCancelClick = () => {
    console.log('handleCancelClick')
    setConfirmOpen(true)
  }

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
        open={confirmOpen}
        title={'React and TypeScript'}
        content={'Are you sure you want to learn React and TypeScript?'}
        cancelCaption={'not sure'}
        okCaption={'yes sure'}
        onCancelClick={onCancelClick}
        onOKClick={onOKClick}
      />
    </div>
  );
}

export default App;
