import axios from 'axios';
export const api = axios.create({ baseURL: 'https://pokeapi.co/api/v2' });
export const getPokemonList = (limit: number, offset: number) =>
  api.get(`/pokemon?limit=${limit}&offset=${offset}`);
export const getPokemonDetail = (name: string) =>
  api.get(`/pokemon/${name}`);
