import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload;

      const anecdoteToChange = state.find((n) => n.id === id);

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };

      const changedAnecdoteMapper = (anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote;

      return state.map(changedAnecdoteMapper);
    },
    newAnecdote(state, action) {
      const anecdote = action.payload;
      state.push(anecdote);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const { vote, newAnecdote, setAnecdotes } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
