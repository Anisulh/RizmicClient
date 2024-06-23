const baseURL = `${import.meta.env.VITE_BASE_URL}/outfits/`;

export const getOutfits = async () => {
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
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

export const getOutfitsById = async (outfitsId: string) => {
  const url = new URL(outfitsId, baseURL);
  const options: RequestInit = {
    method: "GET",
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

export const createOutfits = async (outfitsData: FormData) => {
  const options: RequestInit = {
    method: "POST",
    headers: {},
    credentials: "include",
    body: outfitsData,
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

export const updateOutfits = async (
  outfitsId: string,
  clothingData: FormData,
) => {
  const url = new URL(outfitsId, baseURL);
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
export const getFavoriteOutfits = async () => {
  const url = new URL("favorite/", baseURL);
  const options: RequestInit = {
    method: "GET",
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

export const favoriteOutfits = async (outfitsId: string) => {
  const url = new URL(outfitsId, baseURL + "favorite/");
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
export const unfavoriteOutfits = async (outfitsId: string) => {
  const url = new URL(outfitsId, baseURL + "unfavorite/");
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

export const deleteOutfits = async (outfitsId: string) => {
  const url = new URL(outfitsId, baseURL);
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

export const shareOutfits = async (outfitsId: string, friends: string[]) => {
  const url = new URL(outfitsId, baseURL + "share/");
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
