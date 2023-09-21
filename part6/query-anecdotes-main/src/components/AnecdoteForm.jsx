import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createAnecdotes } from "../requests";
function generateRandomId() {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 1000);

  return `${timestamp}${randomNum}`;
}
const AnecdoteForm = ({ newAnecdoteMutation }) => {
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.length < 5) {
      return;
    }
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0, id: generateRandomId() });
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
