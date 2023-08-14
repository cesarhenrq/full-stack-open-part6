import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";
import { getAnecdotes, updateAnecdote } from "./requests";

import { useSetNotification } from "./contexts/NotificationContext";

const App = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const setAndClearNotification = useSetNotification();

  const handleVote = (anecdote) => {
    mutate({ ...anecdote, votes: anecdote.votes + 1 });
    setAndClearNotification(`you voted "${anecdote.content}"`);
  };

  const result = useQuery("anecdotes", getAnecdotes, {
    retry: 1,
  });

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  if (result.isError) {
    return <div>anecdotes service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
