const baseURL = `${import.meta.env.VITE_BASE_URL}/friends/`;

export interface IFriend {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  email: string;
}

export interface IFriendRequest {
  firstName: string;
  lastName: string;
  profilePicture: string;
  email: string;
}
export const getFriends = async (): Promise<IFriend[]> => {
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
  return data;
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
