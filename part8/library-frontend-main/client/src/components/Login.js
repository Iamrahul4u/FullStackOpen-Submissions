// src/components/LoginForm.js
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../queries";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useToken } from "../context/TokenProvider";

const LoginForm = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN_MUTATION);
  const { updateToken } = useToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      updateToken(token);
      navigate("/author");
    }
  }, [result.data]);
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      login({
        variables: {
          username,
          password,
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type='text'
        name='text'
        placeholder='username'
        value={username}
        onChange={({ target }) => setUserName(target.value)}
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <button type='submit'>Login</button>
    </form>
  );
};

export default LoginForm;
