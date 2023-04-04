import axios from "axios";

// Obtener el uid del usuario desde localStorage
const uid = localStorage.getItem("uid");

// Crear una instancia de axios con la configuración necesaria
const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar un interceptor que agrega el uid del usuario a las peticiones
instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${uid}`;
  return config;
});

export default instance;
