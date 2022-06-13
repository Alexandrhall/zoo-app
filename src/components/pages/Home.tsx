import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      <ul className="animalList">
        {animalList.map((animal) => {
          return (
            <Link to={/animals/ + animal.id.toString()} key={animal.id}>
              <span>{animal.name}</span>
              <span>{animal.yearOfBirth}</span>
              <span>{animal.isFed.toString()}</span>
              <br />
            </Link>
          );
        })}
      </ul>
    </>
  );
};
