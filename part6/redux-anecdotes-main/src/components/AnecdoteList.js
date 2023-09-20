import { useDispatch, useSelector } from "react-redux";
import { UpdateVotes, sortByVotes, votes } from "../reducers/anecdoteReducer";
import {
  OffNotification,
  OnNotification,
  setNotification,
} from "../reducers/Notification";
import { useRef } from "react";

function AnecdoteList() {
  const filter = useSelector((state) => state.filters.query);
  const notification = useSelector((state) => state.notification);
  let anecdotes = useSelector(({ anecdotes, filters }) =>
    filters.query
      ? anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
      : anecdotes
  );

  const dispatch = useDispatch();
  const notificationTimeoutRef = useRef(null);

  const handleVote = (anecdote) => {
    dispatch(UpdateVotes(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 1));
  };
  return (
    <div>
      {anecdotes?.map((anecdote) => (
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
}

export default AnecdoteList;
