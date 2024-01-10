import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 5000, //time it takes to accept a request as failure
});

export default axiosInstance;
