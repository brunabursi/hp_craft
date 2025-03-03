export interface Wand {
  wood: string;
  core: string;
  length: number;
}

export enum House {
  Gryffindor = "Gryffindor",
  Hufflepuff = "Hufflepuff",
  Ravenclaw = "Ravenclaw",
  Slytherin = "Slytherin",
}

export enum Filter {
  Characters = "All",
  Students = "All Students",
  Staff = "All Staff",
  HouseMembers = "House Members",
  Favorite = "Favorites",
}

type URLString = string;

export type Character = {
  id: string;
  name: string;
  alternate_names: string[];
  species: string;
  gender: string;
  house: House;
  dateOfBirth: string;
  yearOfBirth: number;
  wizard: boolean;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: Wand;
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alternate_actors: string[];
  alive: boolean;
  image: URLString;
};

export type Spell = {
  id: string;
  name: string;
  description: string;
};
