import { useDispatch, useSelector } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";

function AnecdoteForm() {
  const anecdotes = useSelector(({ anecdotes }) => anecdotes);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newAnecdote(e.target.input.value));
    e.target.input.value = "";
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name='input' />
        </div>
        <button>create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
