export interface IClothingData {
  _id?: string;
  category: string;
  variant: string;
  color: string;
  layerable: boolean;
  bodyLocation: string[];
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: 0;
}

export interface ICreateClothingData {
  category: string;
  variant: string;
  color: string;
  layerable: boolean;
  bodyLocation: string[];
  image: Blob | null;
}

export interface IUpdateClothingData {
  category?: string;
  variant?: string;
  color?: string;
  layerable?: boolean;
  bodyLocation?: string[];
  image?: Blob | string;
}
export interface IBodyLocations {
  head: string;
  upperBody: string;
  lowerBody: string;
}

export interface IWardrobe {
  tshirt: IClothingData[];
  jacket: IClothingData[];
  sweater: IClothingData[];
  top: IClothingData[];
  shirt: IClothingData[];
  dress: IClothingData[];
  pants: IClothingData[];
  skirt: IClothingData[];
  shorts: IClothingData[];
}

export interface IShowCategory {
  tshirt: boolean;
  jacket: boolean;
  sweater: boolean;
  top: boolean;
  shirt: boolean;
  dress: boolean;
  pants: boolean;
  skirt: boolean;
  shorts: boolean;
}
