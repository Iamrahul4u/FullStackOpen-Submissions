import React from "react";
import ReactDOM from "react-dom/client";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import reducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import { configureStore } from "@reduxjs/toolkit";
import Notification from "./reducers/Notification";

const combreducer = configureStore({
  reducer: {
    anecdotes: reducer,
    filters: filterReducer,
    notification: Notification,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={combreducer}>
    <App />
  </Provider>
);
