import axios from "axios";
const baseUrl = "http://localhost:3005/api/blogs";

let token = null;

const createToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = () => {
  const response = axios.get(baseUrl).then((response) => response.data);
  return response;
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

const updateBlog = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}/comments`, newObject);
    console.log(response.data);
    return response.data; // Return the updated blog data
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
const removeBlog = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
const setComments = async (id, comment) => {
  try {
    const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });
    return response;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
const getComments = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}/comments`);
    return response;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
export default {
  getAll,
  create,
  createToken,
  updateBlog,
  removeBlog,
  getComments,
  setComments,
};
