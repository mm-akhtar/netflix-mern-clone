import axios from "axios";

const instance = axios.create({
  baseURL: process.env.Base_URL,
});

export default instance;
