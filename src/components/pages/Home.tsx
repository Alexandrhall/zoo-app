import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { getList, saveLocal, getAnimal } from "../../services/StorageService";

export const Home = () => {
  const [animalList, setAnimalList] = useState<IAnimal[]>(getList);

  useEffect(() => {
    if (animalList.length !== 0) return;

    getAnimal().then((data) => {
      setAnimalList(data);
    });
  });

  useEffect(() => {
    checkTime();
  });

  saveLocal(animalList);

  const checkTime = () => {
    console.log("checkTimeHome");

    for (const animal of animalList) {
      if (animal.isFed === true) {
        const newDate = new Date();
        const diff = Math.abs(newDate.getTime() - Date.parse(animal.lastFed));
        const minutes = Math.ceil(diff / (1000 * 60));
        console.log(minutes);
        if (minutes > 1) {
          const tempList = [...animalList];
          tempList.map((obj) => {
            return (obj.isFed = false);
          });
          setAnimalList(tempList);
          saveLocal(tempList);
        }
      }
    }
  };

  setInterval(() => {
    checkTime();
  }, 1000 * 60);

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
