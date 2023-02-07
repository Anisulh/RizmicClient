
const baseURL = "http://localhost:7000/clothes/";

export const getClothes = async (token: string | undefined) => {
  if (!token) return;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(baseURL, options);
  return response;
};

export const createClothes = async (clothesData: FormData, token: string) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: clothesData,
  };

  const response = await fetch(baseURL, options);
  return response.json();
};

export const updateClothes = async (
  clothesId: string,
  clothingData: FormData,
  token: string,
) => {
  const url = new URL(clothesId, baseURL);
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: clothingData,
  };

  const response = await fetch(url, options);
  return response.json();
};

export const deleteClothes = async (clothesId: string, token: string) => {
  const url = new URL(clothesId, baseURL);
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, options);
  return response.json();
};
