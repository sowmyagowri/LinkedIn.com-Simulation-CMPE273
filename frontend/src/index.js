import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import {Route, Switch} from 'react-router-dom';
import { createStore, applyMiddleware, compose} from "redux";
import promise from "redux-promise";
import RootReducer from "./Reducers";
import * as serviceWorker from './serviceWorker';

const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, composePlugin(applyMiddleware(promise)));

ReactDOM.render(
  <Provider store={store}>
      <App/>
  </Provider>,

  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
