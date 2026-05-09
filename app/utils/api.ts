import { fetch } from "expo/fetch";
import { POKEDEX, POKEMON } from "../const/pokeapi";

export const getPromises = (url: string): Promise<any> => {
  return fetch(url).then((response: any) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
};

export const getRegions = async (): Promise<Object> => {
  return getPromises(POKEDEX).then((data: any) => {
    return data.results;
  });
};

export const getPokeDex = async (url: string): Promise<Object> => {
  return getPromises(url);
};

export const getPokemonDetails = async (id: string): Promise<Object> => {
  return getPromises(`${POKEMON}/${id}`);
};
