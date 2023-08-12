import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

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
      state.push(asObject(anecdote));
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { vote, newAnecdote, setAnecdotes } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
