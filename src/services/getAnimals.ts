import axios from "axios";
import { IAnimal } from "../models/IAnimal";

export const getAnimals = () => {
  let temp: IAnimal[] = [];

  axios
    .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
    .then((response) => {
      temp = response.data;
    });
  return temp;
};
