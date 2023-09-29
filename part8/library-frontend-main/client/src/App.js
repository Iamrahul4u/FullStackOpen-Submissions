import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useToken } from "./context/TokenProvider";
import { ALL_AUTHORS } from "./queries";

const App = () => {
  const { token, setToken } = useToken();
  const client = useApolloClient();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/author");
  }, []);
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
