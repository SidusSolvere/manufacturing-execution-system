const API = "http://localhost:5000";

const request = async (url, method = "GET", body) => {
  const res = await fetch(API + url, {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) throw new Error("Request failed");

  const data = await res.json();
  console.log("fetchCompanyUsers DATA:", data); 

  return data; 
};

export const fetchCompanyUsers = () => request("/api/users/company");
