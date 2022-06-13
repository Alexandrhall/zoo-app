import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { getList, saveLocal } from "../../services/StorageService";

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
  }, []);

  const fedAnimal = () => {
    if (animal.isFed === false) {
      const newDate = new Date().toISOString();

      const tempList = [...animalList];
      tempList.map((obj) => {
        if (obj.id === animal.id) {
          return (obj.isFed = true) + (obj.lastFed = newDate);
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
