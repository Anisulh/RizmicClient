import { IExistingClothesData } from "../pages/wardrobe/components/ClothesModal";

const baseURL = `${import.meta.env.VITE_BASE_URL}/clothes/`;

export const getClothes = async (): Promise<IExistingClothesData[]> => {
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const response = await fetch(baseURL, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch clothes");
  }
  const data: IExistingClothesData[] = await response.json();
  return data;
};

export const getClothesById = async (
  clothesId: string,
): Promise<IExistingClothesData> => {
  const url = new URL(clothesId, baseURL);
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
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
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
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
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
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

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const favoriteClothes = async (clothesId: string) => {
  const url = new URL(clothesId, baseURL + "favorite/");
  const options: RequestInit = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
};
export const unfavoriteClothes = async (clothesId: string) => {
  const url = new URL(clothesId, baseURL + "unfavorite/");
  const options: RequestInit = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const shareClothes = async (clothesId: string, friends: string[]) => {
  const url = new URL(clothesId, baseURL + "share/");
  const options: RequestInit = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ friends }),
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return error;
  }
};
