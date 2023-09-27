import { Link, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <div>
        <button>
          <Link to='/author'>authors</Link>
        </button>
        <button>
          <Link to='/books'>books</Link>
        </button>
        <button>
          <Link to='/new'>add book</Link>
        </button>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
