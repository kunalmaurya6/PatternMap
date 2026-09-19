import axios from "axios";

const BASE_URK:string='http://localhost:8080/api';

export const api = axios.create({
  baseURL: BASE_URK,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});