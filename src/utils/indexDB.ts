import { openDB, DBSchema } from "idb";
import { IExistingClothesData } from "../pages/wardrobe/components/ClothesModal";
import { IExistingOutfitData } from "../pages/wardrobe/components/OutfitsModal";
import { IUser } from "../interface/userInterface";
import { IFriend } from "../api/friendsAPI";

interface RFDB extends DBSchema {
  auth: {
    key: string;
    value: number;
  };
  user: {
    key: string;
    value: IUser;
  };
  clothes: {
    key: string;
    value: IExistingClothesData[];
  };
  outfits: {
    key: string;
    value: IExistingOutfitData[];
  };
  friends: {
    key: string;
    value: IFriend[];
  };
}

const dbPromise = openDB<RFDB>("RizmicFits", 1, {
  upgrade(db) {
    db.createObjectStore("auth");
    db.createObjectStore("user");
    db.createObjectStore("clothes");
    db.createObjectStore("outfits");
    db.createObjectStore("friends");
  },
});

export async function getAuthCache(): Promise<number> {
  const db = await dbPromise;
  const auth = await db.get("auth", "currentAuth");
  return auth || 0;
}

export async function setAuthCache(tokenExpiry: number): Promise<string> {
  return (await dbPromise).put("auth", tokenExpiry, "currentAuth");
}

export async function clearAuthCache(): Promise<void> {
  return (await dbPromise).delete("auth", "currentAuth");
}

export async function getUserCache(): Promise<IUser | undefined> {
  return (await dbPromise).get("user", "current");
}

export async function setUserCache(user: IUser): Promise<string> {
  return (await dbPromise).put("user", user, "current");
}

export async function clearUserCache(): Promise<void> {
  return (await dbPromise).delete("user", "current");
}

export async function getClothesCache(): Promise<
  IExistingClothesData[] | undefined
> {
  return (await dbPromise).get("clothes", "items");
}

export async function setClothesCache(
  items: IExistingClothesData[],
): Promise<string> {
  return (await dbPromise).put("clothes", items, "items");
}

export async function getOutfitsCache(): Promise<
  IExistingOutfitData[] | undefined
> {
  return (await dbPromise).get("outfits", "items");
}

export async function setOutfitsCache(
  items: IExistingOutfitData[],
): Promise<string> {
  return (await dbPromise).put("outfits", items, "items");
}

export async function getFriendsCache(): Promise<IFriend[] | undefined> {
  return (await dbPromise).get("friends", "items");
}

export async function setFriendsCache(items: IFriend[]): Promise<string> {
  return (await dbPromise).put("friends", items, "items");
}
