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
