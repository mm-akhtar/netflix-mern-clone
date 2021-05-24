import axios from "axios";

const instance = axios.create({
  baseURL: "https://akhtar-netflix-api.herokuapp.com",
});

export default instance;
