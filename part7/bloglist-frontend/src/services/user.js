import axios from "axios";

const baseUrl = "http://localhost:3005/api/users";

const getUser = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    const data = await response.data;
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
const getPosts = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
export default { getPosts, getUser };
