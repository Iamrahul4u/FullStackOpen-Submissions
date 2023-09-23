import { useEffect, useState } from "react";
import user from "../services/user";
import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();
  const [saveuser, setUser] = useState({});
  useEffect(() => {
    async function getPost() {
      try {
        const response = await user.getPosts(id);
        console.log(response);
        setUser(response);
      } catch (error) {
        console.log(error);
      }
    }
    getPost();
  }, [id]);
  return (
    saveuser && (
      <div>
        <h1>{saveuser.name}</h1>
        <h3>added blogs</h3>
        <ul>
          {saveuser.blogs &&
            saveuser.blogs?.map((user) => <li key={user.id}>{user.title}</li>)}
        </ul>
      </div>
    )
  );
}

export default User;
