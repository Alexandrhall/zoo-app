import axios from "axios";
import { IAnimal } from "../models/IAnimal";

const LOCALSTORAGE_KEY = "animals";

export const getList = <T>(): T[] => {
  let valueFromLS = localStorage.getItem(LOCALSTORAGE_KEY) || "[]";
  return JSON.parse(valueFromLS) as T[];
};

export const saveLocal = <T>(data: T): void => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
};

export const getAnimal = async () => {
  return axios
    .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
    .then((response) => {
      return response.data;
    });
};
