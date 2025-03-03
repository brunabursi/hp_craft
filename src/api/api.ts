import axios from "axios";
import { type Character, type Spell, House } from "./types";

const api = axios.create({
  baseURL: "https://hp-api.onrender.com/api",
});

const fetchCharacters = async (): Promise<Character[]> => {
  const response = await api.get("/characters");
  return response.data;
};

const fetchCharacterById = async (id: string): Promise<Character[]> => {
  const response = await api.get(`/character/${id}`);
  return response.data;
};

const fetchHogwartsStudents = async (): Promise<Character[]> => {
  const response = await api.get("/characters/students");
  return response.data;
};

const fetchHogwartsStaff = async (): Promise<Character[]> => {
  const response = await api.get("/characters/staff");
  return response.data;
};

const fetchHouseMembers = async (house: House): Promise<Character[]> => {
  const response = await api.get(`/characters/house/${house.toLowerCase()}`);
  return response.data;
};

const fetchSpells = async (): Promise<Spell[]> => {
  const response = await api.get("/spells");
  return response.data;
};

const fetchFavoriteCharacters = () => {
  const response = localStorage.getItem("hp_craft_favorite_characters");
  return response ? JSON.parse(response) : [];
};

const listOfHouses = Object.values(House);

export {
  fetchFavoriteCharacters,
  fetchCharacters,
  fetchCharacterById,
  fetchHogwartsStudents,
  fetchHogwartsStaff,
  fetchHouseMembers,
  fetchSpells,
  listOfHouses,
};
