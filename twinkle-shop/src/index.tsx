import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Routes } from './components/Routes'
import { Store } from 'redux';
import { IApplicationState, configureStore } from './components/Store';
import { Provider } from 'react-redux';


interface IRoot {
  store: Store<IApplicationState>
}
const Root: React.FC<IRoot> = ({ store }) => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}

const store = configureStore()
ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
