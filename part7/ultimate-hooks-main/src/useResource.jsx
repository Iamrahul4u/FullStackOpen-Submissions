import axios from "axios";
import { useEffect, useState } from "react";

function useResource(baseUrl) {
  const [resource, setResources] = useState([]);
  const getAll = async () => {
    const response = await axios.get(baseUrl);
    setResources(response.data);
  };

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);
    setResources([...resource, response.data]);
  };
  useEffect(() => {
    getAll();
  }, []);
  return [resource, { getAll, create }];
}

export default useResource;
