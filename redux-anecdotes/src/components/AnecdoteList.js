import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    const sortedAnecdotes = [...state.anecdotes].sort(
      (a, b) => b.votes - a.votes
    );

    if (state.filter === "") {
      return sortedAnecdotes;
    }

    return sortedAnecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });

  const handleVote = (id) => {
    dispatch(voteAnecdote(id));

    dispatch(
      setNotificationWithTimeout(
        `you voted '${anecdotes.find((a) => a.id === id).content}'`,
        5
      )
    );
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
