import { IExistingClothesData } from "../pages/wardrobe/components/ClothesModal";
import { IExistingOutfitData } from "../pages/wardrobe/components/OutfitsModal";
import { getFriendsCache, setFriendsCache } from "../utils/indexDB";

const baseURL = `${import.meta.env.VITE_BASE_URL}/friends/`;

export interface IFriend {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

export interface ISharedClothing {
  _id: string;
  sharedBy: string;
  sharedWith: string;
  clothingItem: IExistingClothesData;
  status: string;
  sharedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
export interface ISharedOutfit {
  _id: string;
  sharedBy: string;
  sharedWith: string;
  outfitItem: IExistingOutfitData;
  status: string;
  sharedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface IFriendProfile extends IFriend {
  since: string;
  sharedClothes: ISharedClothing[];
  sharedOutfits: ISharedOutfit[];
}

export interface IFriendRequest {
  status: string;
  recipient: string;
  requester: IFriend;
}
export const getFriends = async (): Promise<IFriend[]> => {
  try {
    const url = new URL(baseURL);
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

    await setFriendsCache(data);
    return data;
  } catch (error) {
    // If fetch fails, try to get data from cache
    const cachedData = await getFriendsCache();
    if (cachedData) {
      return cachedData;
    }

    throw error;
  }
};

export const getFriendRequests = async (): Promise<IFriendRequest[]> => {
  const url = new URL(baseURL + "requests");
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-cache",
  };
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const sendFriendRequestAPI = async (userId: string) => {
  const url = new URL(baseURL + `request/${userId}`);
  const options: RequestInit = {
    method: "POST",
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

export const acceptFriendRequestAPI = async (userId: string) => {
  const url = new URL(baseURL + `accept/${userId}`);
  const options: RequestInit = {
    method: "PUT",
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

export const unfriendAPI = async (userId: string) => {
  const url = new URL(baseURL + `unfriend/${userId}`);
  const options: RequestInit = {
    method: "DELETE",
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

export const shareClothesWithFriends = async (
  clothesId: string,
  friends: string[],
) => {
  const url = new URL(baseURL + `share/clothing/${clothesId}`);
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ friends }),
  };
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const shareOutfitsWithFriends = async (
  outfitsId: string,
  friends: string[],
) => {
  const url = new URL(baseURL + `share/outfit/${outfitsId}`);
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ friends }),
  };
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const fetchFriendProfile = async (
  userId: string | undefined,
): Promise<IFriendProfile> => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const url = new URL(baseURL + `profile/${userId}`);
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
