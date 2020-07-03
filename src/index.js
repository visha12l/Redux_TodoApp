import React from "react";
import ReactDOM from "react-dom";
import "./stylesheet/reset.css";
import "./stylesheet/style.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import AddTodo from "./components/AddTodo";
import FlightApp from "./components/FlightApp";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <FlightApp />
  </Provider>,
  document.querySelector(".container")
);
