import axios from "axios";

const BASE_URL = "/api/persons";
const getPerson = () => {
  return axios.get(`${BASE_URL}`).then((response) => response.data);
};
const deletePerson = (id) => {
  return axios.delete(`${BASE_URL}/${id}`).then((response) => response.data);
};

const addPerson = (person) => {
  return axios.post(`${BASE_URL}`, person).then((response) => response.data);
};

const updatePerson = (id, person) => {
  return axios
    .put(`${BASE_URL}/${id}`, person)
    .then((response) => response.data);
};
export { getPerson, deletePerson, addPerson, updatePerson };
