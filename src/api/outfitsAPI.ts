const baseURL = "/outfits/";

export const getOutfits = async (token: string | undefined) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(baseURL, options);
    return response.json();
  } catch (error) {
    return error;
  }
};

export const createOutfits = async (outfitsData: FormData, token: string) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: outfitsData,
  };

  try {
    const response = await fetch(baseURL, options);
    return response.json();
  } catch (error) {
    return error;
  }
};

export const updateOutfits = async (
  outfitsId: string,
  clothingData: FormData,
  token: string,
) => {
  const url = new URL(outfitsId, baseURL);
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: clothingData,
  };

  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    return error;
  }
};
export const getFavoriteOutfits = async (token: string) => {
  const url = new URL("favorite/", baseURL);
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    return error;
  }
};

export const favoriteOutfits = async (outfitsId: string, token: string) => {
  const url = new URL(outfitsId, baseURL + "favorite/");
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    return error;
  }
};
export const unfavoriteOutfits = async (outfitsId: string, token: string) => {
  const url = new URL(outfitsId, baseURL + "unfavorite/");
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    return error;
  }
};

export const deleteOutfits = async (outfitsId: string, token: string) => {
  const url = new URL(outfitsId, baseURL);
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    return error;
  }
};
