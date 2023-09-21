import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import axios from "axios";
import { createAnecdotes, getAnecdotes, updateAnecdote } from "./requests";

const App = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdotes, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    },
  });
  const handleVoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });
  const handleVote = (anecdote) => {
    handleVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
  });
  console.log(JSON.parse(JSON.stringify(result)));
  const anecdotes = result.data;
  if (result.isLoading) {
    return <div>Loading...</div>;
  }
  if (result.isError) {
    return (
      <div>anecdote service is not available due to problems in server</div>
    );
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />

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
};

export default App;
