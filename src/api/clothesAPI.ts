const baseURL = `${import.meta.env.VITE_BASE_URL}/clothes/`;

export const getClothes = async () => {
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  try {
    const response = await fetch(baseURL, options);
    return response.json();
  } catch (error) {
    return error;
  }
};

export const createClothes = async (clothesData: FormData) => {
  const options: RequestInit = {
    method: "POST",
    headers: {},
    credentials: "include",
    body: clothesData,
  };

  try {
    const response = await fetch(baseURL, options);
    return response.json();
  } catch (error) {
    return error;
  }
};

export const updateClothes = async (
  clothesId: string,
  clothingData: FormData,
) => {
  const url = new URL(clothesId, baseURL);
  const options: RequestInit = {
    method: "PUT",
    headers: {},
    credentials: "include",
    body: clothingData,
  };

  const response = await fetch(url, options);
  return response.json();
};

export const deleteClothes = async (clothesId: string) => {
  const url = new URL(clothesId, baseURL);
  const options: RequestInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const response = await fetch(url, options);
  return response.json();
};
