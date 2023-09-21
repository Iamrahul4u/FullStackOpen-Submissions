import axios from "axios";
const base_url = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => {
  return axios.get(base_url).then((response) => response.data);
};

export const createAnecdotes = (anecdote) => {
  if (anecdote.content.length < 5) {
    return Promise.reject(new Error("Content too short"));
  }
  return axios.post(base_url, anecdote).then((response) => response.data);
};

export const updateAnecdote = (anecdote) =>
  axios.put(`${base_url}/${anecdote.id}`, anecdote).then((res) => res.data);
