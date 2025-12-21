
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path, method = 'POST', body = null) {
  const res = await fetch(API_BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: body ? JSON.stringify(body) : null
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error");
  return data;
}

export const registerUser = (payload) =>
  request('/api/auth/register', 'POST', payload);

export const registerCompany = (payload) =>
  request('/api/auth/register-company', 'POST', payload);

export const loginUser = (payload) =>
  request('/api/auth/login', 'POST', payload);

export const getSession = () =>
  request('/api/auth/session', 'GET');

export const logoutUser = () =>
  request('/api/auth/logout', 'POST');


export const getPendingUsers = () =>
  request("/api/auth/pending-users", "GET");

export const approveUser = (userId) =>
  request(`/api/auth/approve-user/${userId}`, "POST");

export const createAdmin = (payload) =>
  request("/api/auth/create-admin", "POST", payload);


