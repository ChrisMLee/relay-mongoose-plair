import User from './components/User.js';
import AppHomeRoute from './routes/AppHomeRoute';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import React from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';

import storageMiddleware from './libs/storageMiddleware';

// const storageMiddleware = store => next => action => {
//   console.group(action.type);
//   console.info('dispatching', action);
//   let result = next(action);
//   console.log('next state', store.getState());
//   console.groupEnd(action.type);
//   return result;
// };


import rootReducer from './reducers';

//const store = createStore(rootReducer);

let createStoreWithMiddleware = applyMiddleware(storageMiddleware)(createStore);
let store = createStoreWithMiddleware(rootReducer);

//let userId = getQueryParams(document.location.search).user || "561aecc701caeedd0b93ea97";

// ReactDOM.render(
//   <Relay.RootContainer
//     Component={User}
//     //TODO Update userId
//     route={new AppHomeRoute({userId: userId})}
//   />,
//   document.getElementById('root')
// );

let rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);



