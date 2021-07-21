import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

const UserService = {

  getAll: () => axios.get(`${baseUrl}/getAll`),

  getUser: (id) => axios.get(`${baseUrl}/user/${id}`),

  create: (user) => axios.post(`${baseUrl}/add`, user),

  update: (id, user) => axios.put(`${baseUrl}/update/${id}`, user),

  delete: (id) => axios.delete(`${baseUrl}/delete/${id}`),

  createFile: (id, img) => axios.post(`${baseUrl}/uploadimg/${id}`, img),
  updateNameImage: (id, name) => axios.put(`${baseUrl}/update-name-img/${id}`, name)
};

export default UserService;