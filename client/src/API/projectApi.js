const API = "http://localhost:5000";
import axios from "axios";
const request = async (url, method = "GET", body) => {
  const res = await fetch(API + url, {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) throw new Error("Request failed");
  return res.json();
};

export const fetchProjects = () => request("/api/projects");
export const fetchProjectById = (id) => request(`/api/projects/${id}`);
export const saveProject = (payload) => request("/api/projects/save", "POST", payload);
export const inviteUserToProject = (projectId, userId) => request(`/api/projects/${projectId}/invite`, "POST", { userId });
export const assignUserToProject = (projectId, userId, role) => request(`/api/projects/${projectId}/assign`, "POST", { userId, role,});
export const fetchProjectWorkspace = (projectId) => request(`/api/projects/${projectId}/workspace`);
export const createProject = (payload) =>
  request("/api/projects", "POST", payload);
export const fetchProjectMembers = async (projectId) => {
  const res = await axios.get(`http://localhost:5000/api/projects/${projectId}/members`,{withCredentials: true});
  console.log("API Response:", res); 
  return res.data.data;
};
