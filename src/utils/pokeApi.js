// src/api/pokeApi.js
import axios from "axios";

export const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 8000,
});
