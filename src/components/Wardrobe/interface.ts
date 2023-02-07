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