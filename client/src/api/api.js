import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend base
});

// optional: handle 401 globally (redirect to login or clear storage)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      // remove token if unauthorized (optional)
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete api.defaults.headers.common["Authorization"];
      // you could also programmatically redirect to /login if you have access to router here
    }
    return Promise.reject(err);
  }
);

export default api;
