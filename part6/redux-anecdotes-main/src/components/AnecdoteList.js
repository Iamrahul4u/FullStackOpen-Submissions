import { useDispatch, useSelector } from "react-redux";
import { Sort, vote } from "../reducers/anecdoteReducer";

function AnecdoteList() {
  const filter = useSelector((state) => state.filters.query);
  let anecdotes = useSelector(({ anecdotes, filters }) =>
    filters.query
      ? anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
      : anecdotes
  );

  const dispatch = useDispatch();
  const handleVote = (id) => {
    dispatch(vote(id));
    dispatch(Sort());
  };
  return (
    <div>
      {anecdotes?.map((anecdote) => (
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
}

export default AnecdoteList;
