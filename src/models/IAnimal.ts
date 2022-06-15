export interface IAnimal {
  id: number;
  name: string;
  latinName: string;
  yearOfBirth: number;
  shortDescription: string;
  isFed: boolean;
  lastFed: string;
  imageUrl: string;
  medicine: string;
  longDescription: string;
}

export interface IAnimalList {
  animals: IAnimal[];
}
