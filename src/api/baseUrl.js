import axios from "axios";

const api = axios.create({
  baseURL: "https://broken-paulina-smarthomee-b125f114.koyeb.app/api",
});

export default api;
