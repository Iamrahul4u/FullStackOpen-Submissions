import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext("");
const TokenProvider = ({ children }) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);
  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };
  const resetToken = () => {
    setToken(null);
    localStorage.clear();
  };
  return (
    <AuthContext.Provider value={{ token, updateToken, setToken, resetToken }}>
      {children}
    </AuthContext.Provider>
  );
};
const useToken = () => {
  const context = useContext(AuthContext);
  return context;
};
export { TokenProvider, AuthContext, useToken };
