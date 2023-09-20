import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import { useSelector } from "react-redux";
import Notification from "./components/Notification";
const App = () => {
  const notification = useSelector((state) => state.notification);
  return (
    <>
      <h2>Anecdotes</h2>
      {notification.isLoading && <Notification />}
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  );
};

export default App;
