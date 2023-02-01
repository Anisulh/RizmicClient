import { IClothingData } from "../components/ClothesModal";

const baseURL = "http://localhost:7000/clothes/";

export const getClothes = async (token: string | undefined) => {
  if (!token) return;
  console.log(token);
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(baseURL, options);
  return response.json();
};

export const createClothes = async (
  clothesData: IClothingData,
  token: string,
) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(clothesData),
  };

  const response = await fetch(baseURL, options);
  return response.json();
};
