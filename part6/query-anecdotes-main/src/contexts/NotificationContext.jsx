import React, { createContext, useContext, useReducer } from "react";

const initialState = { message: null };

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return { message: action.message };
    case "HIDE_NOTIFICATION":
      return { message: null };
    default:
      return state;
  }
};

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const showNotification = (message) => {
    dispatch({ type: "SHOW_NOTIFICATION", message });

    setTimeout(() => {
      dispatch({ type: "HIDE_NOTIFICATION" });
    }, 5000);
  };

  return (
    <NotificationContext.Provider
      value={{ notification: state, showNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) return null;
  return context;
};
export { NotificationProvider };
