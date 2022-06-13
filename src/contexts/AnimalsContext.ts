import axios from "axios";
import { IAnimal } from "../models/IAnimal";
import { getList, saveLocal } from "../services/StorageService";

export const getAnimals = () => {
  let tempList: IAnimal[] = [];

  tempList = getList();

  if (tempList.length == 0) {
    axios
      .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
      .then((response) => {
        tempList = response.data;
      });
  }
  saveLocal(tempList);
};
