export interface IAnimal {
  id: number;
  name: string;
  latinName: string;
  yearOfBirth: number;
  shortDescription: string;
  isFed: boolean;
  lastFed: string;
}

export interface IAnimalList {
  animals: IAnimal[];
}
