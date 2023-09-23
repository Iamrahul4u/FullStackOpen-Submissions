import { useEffect, useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";

const BlogsContext = createContext();
const initialState = {
  notification: "",
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { ...state, notification: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
function BlogsProvider({ children }) {
  const [{ notification, error }, dispatch] = useReducer(reducer, initialState);

  const setNotification = (payload) => {
    dispatch({ type: "SET_NOTIFICATION", payload });
    setTimeout(() => dispatch({ type: "SET_NOTIFICATION", payload: "" }), 5000);
  };

  const setError = (payload) => {
    dispatch({ type: "SET_ERROR", payload });
    console.log(error);
    setTimeout(() => dispatch({ type: "SET_ERROR", payload: "" }), 5000);
  };

  return (
    <BlogsContext.Provider
      value={{ notification, dispatch, error, setNotification, setError }}
    >
      {children}
    </BlogsContext.Provider>
  );
}

export const useBlogs = () => {
  const context = useContext(BlogsContext);
  if (context === undefined) return null;
  return context;
};
export default BlogsProvider;
