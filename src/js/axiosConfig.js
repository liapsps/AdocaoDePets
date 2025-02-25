const API_URL = "http://localhost:1337";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adicionar um interceptor de requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Adicionar um interceptor de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      window.location.href = "../pages/entrar.html";
    }
    return Promise.reject(error);
  }
);
