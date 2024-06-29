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

const DB_VERSION = 2; // Increase this when new stores are added

const dbPromise = openDB<RFDB>("RizmicFits", DB_VERSION, {
  upgrade(db, oldVersion) {
    if (oldVersion < 1) {
      // Create initial stores
      db.createObjectStore("auth");
    }
    if (oldVersion < 2) {
      // Add new stores in version 2
      db.createObjectStore("user");
      db.createObjectStore("clothes");
      db.createObjectStore("outfits");
      db.createObjectStore("friends");
    }
  },
});

export async function getAuthCache(): Promise<number> {
  const db = await dbPromise;
  const auth = await db.get("auth", "items");
  return auth || 0;
}

export async function setAuthCache(tokenExpiry: number): Promise<string> {
  return (await dbPromise).put("auth", tokenExpiry, "items");
}

export async function clearAuthCache(): Promise<void> {
  return (await dbPromise).delete("auth", "items");
}

export async function getUserCache(): Promise<IUser | undefined> {
  return (await dbPromise).get("user", "items");
}

export async function setUserCache(user: IUser): Promise<string> {
  return (await dbPromise).put("user", user, "items");
}

export async function clearUserCache(): Promise<void> {
  return (await dbPromise).delete("user", "items");
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

export async function clearAllCache(): Promise<void> {
  await clearAuthCache();
  await clearUserCache();
  await (await dbPromise).delete("clothes", "items");
  await (await dbPromise).delete("outfits", "items");
  await (await dbPromise).delete("friends", "items");
}
