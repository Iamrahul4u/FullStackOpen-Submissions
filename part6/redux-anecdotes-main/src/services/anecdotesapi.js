import axios from "axios";
import anecdoteReducer, { votes } from "../reducers/anecdoteReducer";

const base_url = "http://localhost:3001/anecdotes";
const getall = async () => {
  const response = await axios.get(base_url);
  return response.data;
};

const getId = () => (100000 * Math.random()).toFixed(0);
const addAnecdote = async (query) => {
  const object = {
    content: query,
    id: getId(),
    votes: 0,
  };
  const response = await axios.post(base_url, object);
  return response.data;
};

const updateVote = async (anecdote) => {
  const updatedObject = {
    content: anecdote.content,
    votes: anecdote.votes + 1,
    id: anecdote.id,
  };
  const response = await axios.put(`${base_url}/${anecdote.id}`, updatedObject);
  return response.data;
};
export default { addAnecdote, getall, updateVote };
