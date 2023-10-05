import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 1000,
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const getUserProjects = (id) => {
  return instance.get(`/project/${id}`);
};

export const createNewProjects = (obj) => {
  return instance.post(`/project/create-project`, obj);
};
export const deleteProjects = (id) => {
  return instance.delete(`/project/${id}`);
};
export const editProjects = (post) => {
  return instance.put(`/project/${post.id}`, post);
};

export const getTasks = (id) => {
  return instance.get(`/task/${id}`);
};
export const deleteTasks = (id) => {
  return instance.delete(`/task/${id}`);
};

export const editTaskApi = (post) => {
  return instance.put(`/task/${post.id}`, post);
};

export const createTasks = (task) => {
  return instance.post(`/task`, task);
};

export const getAllUsers = () => {
  return instance.get(`/auth/allusers`);
};

export const getMyProfile = (id) => {
  return instance.get(`/admin/my-profile/${id}`);
};
