import axios from "axios";

const apiURLs = {
  development: "http://localhost:8080",
  production: "",
};

// Essa instância do axios sabe qual é a baseURL que deve ser usada nas requisições
const api = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });

api.interceptors.request.use((config) => {
  // Captura o loogedInUser do localStorage
  const loggedInUserJSON = localStorage.getItem("loggedInUser");

  // Converte o JSON em objeto
  const parsedLoggedInUser = JSON.parse(loggedInUserJSON || '""');

  if (parsedLoggedInUser.token) {
    config.headers = { Authorization: `Bearer ${parsedLoggedInUser.token}` };
  }

  return config;
});

export default api;
