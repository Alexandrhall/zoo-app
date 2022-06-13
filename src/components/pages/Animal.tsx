import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { getList, saveLocal } from "../../services/StorageService";

export const Animal = () => {
  const [animalList, setAnimalList] = useState<IAnimal[]>([]);

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
    setAnimalList(getList<IAnimal>());
    const tempList: IAnimal[] = getList();
    setAnimal(tempList[+params.id - 1]);
  }, []);

  const fedAnimal = () => {
    if (animal.isFed === false) {
      const newDate = new Date();
      let utcDate = newDate.toISOString();

      setAnimal({
        id: animal.id,
        name: animal.name,
        latinName: animal.latinName,
        yearOfBirth: animal.yearOfBirth,
        shortDescription: animal.shortDescription,
        isFed: true,
        lastFed: utcDate,
      });
      let tempList = [...animalList];
      tempList.map((obj) => {
        if (obj.id === animal.id) {
          return (obj.isFed = true);
        }
      });
      setAnimalList(tempList);
      saveLocal(animalList);
    }
  };

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
