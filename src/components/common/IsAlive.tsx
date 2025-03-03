import { Character } from "@/api/types";

const isAlive = (character: Character) => {
  return !character.alive ? " ☠️" : null;
};
export default isAlive;
