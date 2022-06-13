import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";

export const Animal = () => {
  const [animal, setAnimal] = useState<IAnimal>({
    id: NaN,
    name: "",
    latinName: "",
    yearOfBirth: NaN,
    shortDescription: "",
    isFed: false,
    lastFed: "",
  });
  let params = useParams();

  useEffect(() => {
    axios
      .get<IAnimal>(
        "https://animals.azurewebsites.net/api/animals/" + params.id
      )
      .then((response) => {
        setAnimal(response.data);
      });
  }, [params.id]);

  return (
    <>
      <span>{animal.name}</span> <br />
      <span>{animal.isFed ? "Har ätit" : "Behöver matas"}</span>
    </>
  );
};
