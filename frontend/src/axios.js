import axios from "axios";

const api = axios.create({
  baseURL: "https://movie-reviews-wxai.onrender.com", // your backend
  withCredentials: true, // ✅ always send cookies/session
});

export default api;
