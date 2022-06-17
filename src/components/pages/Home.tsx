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
    for (const animal of animalList) {
      if (animal.isFed === true) {
        const newDate: Date = new Date();
        const diff: number = Math.abs(
          newDate.getTime() - Date.parse(animal.lastFed)
        );
        const minutes: number = Math.ceil(diff / (1000 * 60));
        if (minutes > 179) {
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
              <li className="animal">
                <div className="yearAndMedicine">
                  <span>Född: {animal.yearOfBirth}</span>
                  <span>Medicin: {animal.medicine}</span>
                </div>
                <h3>{animal.name}</h3>
                <p>{animal.latinName}</p>
                <img
                  src={animal.imageUrl}
                  alt={animal.name}
                  width="200px"
                  height="150px"
                />{" "}
                <br />
                <p className="animalDesc"> {animal.shortDescription}</p>
                <p> {animal.isFed ? "Har ätit" : "Behöver matas"}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};
