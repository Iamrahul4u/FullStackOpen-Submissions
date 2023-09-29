import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/Login";
import { setContext } from "@apollo/client/link/context";
import { TokenProvider } from "./context/TokenProvider";
import Recommendation from "./components/Recommendation";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});
const wsLink = new GraphQLWsLink(createClient({ url: "ws://localhost:4000" }));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/author",
        element: <Authors />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "new",
        element: <NewBook />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "/recommend",
        element: <Recommendation />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <TokenProvider>
    <ApolloProvider client={client}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ApolloProvider>
  </TokenProvider>
);
