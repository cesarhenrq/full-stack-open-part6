import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    vote(state, action) {
      const { id, changedAnecdote } = action.payload;

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

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch(newAnecdote(anecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    const anecdoteToVote = anecdotes.find((n) => n.id === id);
    const changedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    };
    await anecdoteService.update(id, changedAnecdote);
    dispatch(vote({ id, changedAnecdote }));
  };
};

export const { vote, newAnecdote, setAnecdotes } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
