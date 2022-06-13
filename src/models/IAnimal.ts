export interface IAnimal {
  id: number;
  name: string;
  latinName: string;
  yearOfBirth: number;
  shortDescription: string;
}

export interface IAnimalList {
  animals: IAnimal[];
}
