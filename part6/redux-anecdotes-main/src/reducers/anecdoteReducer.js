import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotesapi";

const reducer = createSlice({
  name: "reducer",
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    votes(state, action) {
      const voteAnecdote = state.find(
        (anecdote) => anecdote.id === action.payload
      );
      voteAnecdote.votes += 1;
      return state;
    },
    sortByVotes(state) {
      return state.sort((a, b) => b.votes - a.votes);
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});
export const { addAnecdote, votes, sortByVotes, setAnecdotes } =
  reducer.actions;
export default reducer.reducer;

export const addAnecdotethunk = (query) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.addAnecdote(query);
    dispatch(addAnecdote(anecdote));
  };
};

export const initializeState = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getall();
    dispatch(setAnecdotes(anecdotes));
    dispatch(sortByVotes());
  };
};

export const UpdateVotes = (anecdote) => {
  return async (dispatch) => {
    const votesResponse = await anecdoteService.updateVote(anecdote);
    dispatch(votes(anecdote.id));
    dispatch(sortByVotes());
  };
};
