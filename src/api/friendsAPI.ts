import { getFriendsCache, setFriendsCache } from "../utils/indexDB";

const baseURL = `${import.meta.env.VITE_BASE_URL}/friends/`;

export interface IFriend {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
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
