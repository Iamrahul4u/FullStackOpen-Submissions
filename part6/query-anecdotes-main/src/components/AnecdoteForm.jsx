import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createAnecdotes } from "../requests";
import { useNotification } from "../contexts/NotificationContext";
function generateRandomId() {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 1000);

  return `${timestamp}${randomNum}`;
}
const AnecdoteForm = ({ newAnecdoteMutation }) => {
  const { showNotification } = useNotification();

  const onCreate = (event) => {
    event.preventDefault();
    let content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({
      content,
      votes: 0,
      id: generateRandomId(),
    });
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
