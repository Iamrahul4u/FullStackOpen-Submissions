import { useEffect, useState } from "react";
import userService from "../services/user";
import { Link } from "react-router-dom";
function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUser() {
      const response = await userService.getUser();
      setUsers(response);
    }
    fetchUser();
  }, []);
  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name} </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
