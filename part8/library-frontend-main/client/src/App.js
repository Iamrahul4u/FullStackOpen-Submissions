import { useApolloClient, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useToken } from "./context/TokenProvider";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";

export const updateCache = (cache, query, addedPerson) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedPerson)),
    };
  });
};
const App = () => {
  const { token, setToken } = useToken();
  const client = useApolloClient();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/author");
  }, []);
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookOnAdded;
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  function handleLogout() {
    setToken(null);
    client.resetStore();
    client.refetchQueries({
      include: [ALL_AUTHORS],
    });
  }

  return (
    <div>
      <div>
        <button>
          <Link to='/author'>authors</Link>
        </button>
        <button>
          <Link to='/books'>books</Link>
        </button>
        {token && (
          <>
            <button>
              <Link to='/new'>add book</Link>
            </button>
            <button>
              <Link to='/recommend'>Recommendation</Link>
            </button>
            <button>
              <Link to='/author' onClick={(e) => handleLogout(e)}>
                logout
              </Link>
            </button>
          </>
        )}
        {!token && (
          <button>
            <Link to='/login' onClick={(e) => handleLogout(e)}>
              login
            </Link>
          </button>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default App;
