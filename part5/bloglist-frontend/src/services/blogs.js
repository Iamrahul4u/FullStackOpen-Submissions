import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const createToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data; // Return the updated blog data
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export default { getAll, create, createToken, update };
