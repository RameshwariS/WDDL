// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // your backend server address
});

// If using authentication later:
// API.interceptors.request.use((req) => {
//   if (localStorage.getItem('token')) {
//     req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//   }
//   return req;
// });

export default API;
