import { useDispatch, useSelector } from "react-redux";
import { addAnecdotethunk } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/Notification";

function AnecdoteForm() {
  const anecdotes = useSelector(({ anecdotes }) => anecdotes);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let query = e.target.input.value;
    dispatch(addAnecdotethunk(query));
    dispatch(setNotification(`you created '${query}'`, 10));
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
