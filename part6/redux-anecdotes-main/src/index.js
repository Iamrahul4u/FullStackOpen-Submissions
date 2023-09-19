import React from "react";
import ReactDOM from "react-dom/client";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import reducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";

const combreducer = combineReducers({
  anecdotes: reducer,
  filters: filterReducer,
});

const store = createStore(combreducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
