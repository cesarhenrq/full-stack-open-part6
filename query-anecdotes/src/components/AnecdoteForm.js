import { useMutation, useQueryClient } from "react-query";

import { createAnecdote } from "../requests";

import { useSetNotification } from "../contexts/NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const setAndClearNotification = useSetNotification();

  const { mutate } = useMutation(createAnecdote, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("anecdotes");
      setAndClearNotification(`you created "${data.content}"`);
    },
    onError: (error) => {
      setAndClearNotification(error.response.data.error);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
