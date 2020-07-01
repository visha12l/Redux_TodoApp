import React from "react";
import ReactDOM from "react-dom";
import "./stylesheet/index.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import AddTodo from "./components/AddTodo";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <AddTodo />
  </Provider>,
  document.querySelector(".container")
);
