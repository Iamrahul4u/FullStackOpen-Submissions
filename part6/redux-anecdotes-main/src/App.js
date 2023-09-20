import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { initializeState } from "./reducers/anecdoteReducer";
const App = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getdata() {
      dispatch(initializeState());
    }
    getdata();
  }, []);
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
