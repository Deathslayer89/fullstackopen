import axios from "axios";
const baseurl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseurl);
  return request.then((response) => response.data);
};

const create = (newObj) => {
  const request = axios.post(baseurl, newObj);
  return request.then((response) => response.data);
};

const update = (id, obj) => {
  const request = axios.put(`${baseurl}/${id}`, obj);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseurl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, remove };
