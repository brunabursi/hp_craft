import { House, Character, Filter } from "@/api/types";
import { create } from "zustand";

type StoreProperties = {
  isDarkMode: boolean;
  favoriteHouse: House;
  favoriteCharacters: Character[];
  filter: Filter;
};
type StoreComputedProperties = {
  favoriteCharacterIds: () => Record<string, boolean>;
};
type StoreActions = {
  setFavoriteHouse: (house: House) => void;
  addFavoriteCharacter: (character: Character) => void;
  removeFavoriteCharacter: (id: string) => void;
  toggleDarkMode: () => void;
  setFilter: (filter: Filter) => void;
};

type AppState = StoreProperties & StoreComputedProperties & StoreActions;

const STORAGE_KEY_FAVORITES = "hp_craft_favorite_characters";

function saveCharactersToLocalStorage(characters: Character[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(characters));
  } catch (error) {
    console.error("Failed to save favorite characters to localStorage:", error);
  }
}

function loadCharactersFromLocalStorage(): Character[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_FAVORITES);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error(
      "Failed to load favorite characters from localStorage:",
      error
    );
    return [];
  }
}

export const useAppStore = create<AppState>((set, get) => ({
  isDarkMode: getUserDarkModePreference(),
  favoriteHouse: House.Ravenclaw,
  favoriteCharacters: loadCharactersFromLocalStorage(),
  filter: Filter.Students,
  favoriteCharacterIds: () =>
    get().favoriteCharacters.reduce<Record<string, boolean>>(
      (acc, character) => {
        acc[character.id] = true;
        return acc;
      },
      {}
    ),

  setFavoriteHouse: (house) => set({ favoriteHouse: house }),

  addFavoriteCharacter: (character) =>
    set((state) => {
      const updatedCharacters = [...state.favoriteCharacters, character];
      saveCharactersToLocalStorage(updatedCharacters);
      return {
        favoriteCharacters: updatedCharacters,
      };
    }),

  removeFavoriteCharacter: (id: Character["id"]) =>
    set((state) => {
      const updatedCharacters = state.favoriteCharacters.filter(
        (character) => character.id !== id
      );
      saveCharactersToLocalStorage(updatedCharacters);
      return {
        favoriteCharacters: updatedCharacters,
      };
    }),

  setFilter: (filter: Filter) => set({ filter }),

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));

function getUserDarkModePreference() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
