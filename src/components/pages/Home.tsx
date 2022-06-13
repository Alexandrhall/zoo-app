import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { getList, saveLocal, getAnimal } from "../../services/StorageService";

export const Home = () => {
  const [animalList, setAnimalList] = useState<IAnimal[]>(getList);

  useEffect(() => {
    if (animalList.length === 0) {
      getAnimal().then((data) => {
        setAnimalList(data);
      });
    }
  }, []);

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
