import axios from "axios";
import { useEffect, useState } from "react";
import { IAnimal, IAnimalList } from "../../models/IAnimal";

export const Home = () => {
  const [animalList, setAnimalList] = useState<IAnimal[]>([]);

  useEffect(() => {
    axios
      .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
      .then((response) => {
        setAnimalList(response.data);
      });
  }, []);

  return (
    <>
      <ul>
        {animalList.map((animal) => {
          return <li key={animal.id}>{animal.name}</li>;
        })}
      </ul>
    </>
  );
};
