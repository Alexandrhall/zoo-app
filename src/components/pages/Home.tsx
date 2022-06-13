import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { getAnimals } from "../../services/getAnimals";
import { getList, saveLocal } from "../../services/StorageService";

export const Home = () => {
  const [animalList, setAnimalList] = useState<IAnimal[]>([]);
  let tempList: IAnimal[] = [];

  let dataAPI: IAnimal[] = [];

  useEffect(() => {
    setAnimalList(getList<IAnimal>());

    axios
      .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
      .then((response) => {
        tempList = response.data;
        setAnimalList(tempList);
      });
  }, []);

  // useEffect(() => {
  //   setAnimalList(getList<IAnimal>());
  //   const tempList: IAnimal[] = getList();
  //   console.log(tempList);

  //   if (animalList.length === 0) {
  //     axios
  //       .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
  //       .then((response) => {
  //         setAnimalList(response.data);
  //       });
  //   }

  //   saveLocal(animalList);
  // }, []);

  saveLocal(animalList);

  return (
    <>
      <ul className="animalList">
        {animalList.map((animal) => {
          return (
            <Link to={/animals/ + animal.id.toString()} key={animal.id}>
              <span>{animal.name}</span>
              <span>{animal.yearOfBirth}</span>
              <span> {animal.isFed ? "Har ätit" : "Behöver matas"}</span>
              <span> {animal.shortDescription}</span>
              <br />
            </Link>
          );
        })}
      </ul>
    </>
  );
};
