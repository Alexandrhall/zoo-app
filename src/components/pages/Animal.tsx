import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { getList, saveLocal } from "../../services/StorageService";
import "../../styles/Animal.scss";

export const Animal = () => {
  const [animalList, setAnimalList] = useState<IAnimal[]>(getList);

  const [animal, setAnimal] = useState<IAnimal>({
    id: NaN,
    name: "",
    latinName: "",
    yearOfBirth: NaN,
    shortDescription: "",
    isFed: false,
    lastFed: "",
  });
  const params = useParams() as { id: string };

  useEffect(() => {
    const tempList: IAnimal[] = [...animalList];
    setAnimal(tempList[+params.id - 1]);
  }, [params.id, animalList]);

  useEffect(() => {
    checkTime();
  });

  const fedAnimal = () => {
    if (animal.isFed === false) {
      const newDate = new Date().toISOString();

      const tempList = [...animalList];
      tempList.map((obj) => {
        if (obj.id === animal.id) {
          return (obj.isFed = true) && (obj.lastFed = newDate);
        }
        return null;
      });

      setAnimalList(tempList);
      saveLocal(animalList);
    }
  };

  const checkTime = () => {
    console.log("checkTimeAnimal");

    if (animal.isFed === true) {
      const newDate = new Date();
      const diff = Math.abs(newDate.getTime() - Date.parse(animal.lastFed));
      const minutes = Math.ceil(diff / (1000 * 60));
      if (minutes > 179) {
        const tempList = [...animalList];
        tempList.map((obj) => {
          return (obj.isFed = false);
        });
        setAnimalList(tempList);
        saveLocal(tempList);
      }
    }
  };

  setInterval(() => {
    checkTime();
  }, 1000 * 60);

  return (
    <>
      <span>{animal.name}</span> <br />
      <span>{animal.isFed ? "Har ätit" : "Behöver matas"}</span>
      <button
        onClick={() => {
          fedAnimal();
        }}
      >
        Mata djur
      </button>
      <br />
      <Link to={"/"}>Klicka här får gå tillbaka</Link>
    </>
  );
};
