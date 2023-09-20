import { useDispatch, useSelector } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { OffNotification, OnNotification } from "../reducers/Notification";

function AnecdoteForm() {
  const anecdotes = useSelector(({ anecdotes }) => anecdotes);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let query = e.target.input.value;
    dispatch(addAnecdote(query));
    dispatch(OnNotification(`Created new anecdote '${query}'`));
    e.target.input.value = "";
    setTimeout(() => {
      dispatch(OffNotification());
    }, [5000]);
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
