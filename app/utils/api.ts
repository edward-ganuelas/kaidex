import { fetch } from "expo/fetch";
import { POKEDEX, POKEMON } from "../const/pokeapi";

const POKEMON_DETAILS_API_CACHE: { [key: string]: any } = {};
const REGIONS_API_CACHE: { [key: string]: any } = {};
const POKEDEX_API_CACHE: { [key: string]: any } = {};
const POKEMON_SPECIES_API_CACHE: { [key: string]: any } = {};

type CacheCallback = (data: any) => void;

export const getPromises = (
  url: string,
  cacheCallback: CacheCallback,
): Promise<any> => {
  return fetch(url).then(async (response: any) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    if (process.env.NODE_ENV === "development") {
      cacheCallback(data);
    }
    return data;
  });
};

export const getRegions = async (): Promise<Object> => {
  if (REGIONS_API_CACHE["regions"]) {
    return Promise.resolve(REGIONS_API_CACHE["regions"]);
  }
  const cacheCallback = (data: any) => {
    REGIONS_API_CACHE["regions"] = { ...data };
  };
  return getPromises(POKEDEX, cacheCallback).then((data: any) => {
    return data.results;
  });
};

export const getPokeDex = async (url: string): Promise<Object> => {
  if (POKEDEX_API_CACHE[url]) {
    return Promise.resolve(POKEDEX_API_CACHE[url]);
  }
  const cacheCallback = (data: any) => {
    POKEDEX_API_CACHE[url] = data;
  };
  return getPromises(url, cacheCallback);
};

export const getPokemonDetails = async (id: string): Promise<Object> => {
  if (POKEMON_DETAILS_API_CACHE[id]) {
    return Promise.resolve(POKEMON_DETAILS_API_CACHE[id]);
  }
  const cacheCallback = (data: any) => {
    POKEMON_DETAILS_API_CACHE[id] = data;
  };
  return getPromises(`${POKEMON}/${id}`, cacheCallback);
};
export const getPokemonSpecies = async (url: string): Promise<Object> => {
  if (POKEMON_SPECIES_API_CACHE[url]) {
    return Promise.resolve(POKEMON_SPECIES_API_CACHE[url]);
  }
  const cacheCallback = (data: any) => {
    POKEMON_SPECIES_API_CACHE[url] = data;
  };
  return getPromises(url, cacheCallback);
};
