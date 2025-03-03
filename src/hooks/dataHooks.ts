import useSWR from "swr";
import {
  fetchCharacters,
  fetchCharacterById,
  fetchHogwartsStudents,
  fetchHogwartsStaff,
  fetchHouseMembers,
  fetchFavoriteCharacters,
} from "@/api/api";
import { Character, Filter } from "@/api/types";

const defaultFetcher = {
  swrKey: "characters",
  fetcher: fetchCharacters,
};
const fetcherParamsByFilter = {
  [Filter.Students]: {
    swrKey: "students",
    fetcher: fetchHogwartsStudents,
  },
  [Filter.Staff]: {
    swrKey: "staff",
    fetcher: fetchHogwartsStaff,
  },
  [Filter.HouseMembers]: {
    swrKey: "house",
    fetcher: fetchHouseMembers,
  },
};

export const getFetcherParamsByFilter = (filter: Filter) => {
  if (filter === Filter.Characters) {
    return defaultFetcher;
  }
  if (filter === Filter.Favorite) {
    return {
      swrKey: "favorite",
      fetcher: fetchFavoriteCharacters,
    };
  }
  return fetcherParamsByFilter[filter];
};

export const getCharacterById = (id: string) => {
  const { data, error, isLoading } = useSWR<Character[]>(
    `character-${id}`,
    () => fetchCharacterById(id)
  );

  return {
    character: data,
    error,
    isLoading,
  };
};
