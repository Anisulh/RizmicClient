import { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";
import { IUser } from "../../interface/userInterface";
import {
  IClothingData,
  ICreateClothingData,
  IUpdateClothingData,
} from "./interface";

export const handleChange = (
  { currentTarget }: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setData: Dispatch<SetStateAction<any>>,
): void => {
  if (currentTarget instanceof HTMLInputElement) {
    if (currentTarget.type === "checkbox") {
      setData((prevState: any) => ({
        ...prevState,
        [currentTarget.id]: currentTarget.checked,
      }));
    } else if (currentTarget.files) {
      setData((prevState: any) => ({
        ...prevState,
        [currentTarget.id]: currentTarget.files && currentTarget.files[0],
      }));
    } else {
      setData((prevState: any) => ({
        ...prevState,
        [currentTarget.id]: currentTarget.value,
      }));
    }
  } else if (currentTarget instanceof HTMLSelectElement) {
    setData((prevState: any) => ({
      ...prevState,
      [currentTarget.id]: currentTarget.value,
    }));
  }
};

export const removeImageFromUpload = (
  setData: Dispatch<SetStateAction<any>>,
  imageUploadRef: RefObject<HTMLInputElement>,
) => {
  setData((prevState: any) => ({
    ...prevState,
    image: null,
  }));
  if (imageUploadRef.current) {
    imageUploadRef.current.value = "";
  }
};

export const setColor = (
  color: string,
  setClothingData: Dispatch<SetStateAction<ICreateClothingData>>,
): void => {
  setClothingData((prevState) => ({
    ...prevState,
    color,
  }));
};

export const handleSubmit = (
  clothingData: ICreateClothingData,
  user: IUser | null,
  setOpen: Dispatch<SetStateAction<boolean>>,

  mutate: (data: FormData) => void,
  refetch?: () => void,
  existingData?: IClothingData,
): void => {
  const { category, variant, color, bodyLocation, image } = clothingData;
  if (!category || !variant || !color || !bodyLocation) {
    console.log({ error: "Please fill in all fields" });
    return;
  }
  if (existingData && user) {
    const tempExistingData: IUpdateClothingData = {
      category: existingData.category,
      variant: existingData.variant,
      color: existingData.color,
      layerable: existingData.layerable,
      bodyLocation: existingData.bodyLocation,
      image: existingData.image || undefined,
    };
    const changedData: Record<string, unknown> = {};
    const filterData = (
      object1: IUpdateClothingData,
      object2: ICreateClothingData,
    ) => {
      for (const key in object1) {
        if (
          Object.prototype.hasOwnProperty.call(object1, key) &&
          Object.prototype.hasOwnProperty.call(object2, key)
        ) {
          const element1 = object1[key as keyof IUpdateClothingData];
          const element2 = object2[key as keyof ICreateClothingData];
          if (element1 !== element2) {
            changedData[key] = element2;
          }
        }
      }
    };
    filterData(tempExistingData, clothingData);
    if (Object.keys(changedData).length === 0) {
      setOpen(false);
      return;
    } else {
      const formData = new FormData();

      Object.keys(changedData).map((key) => {
        if (key === "bodyLocation") {
          for (let index = 0; index < bodyLocation.length; index++) {
            const element = bodyLocation[index];
            formData.append("bodyLocation[]", element);
          }
        } else {
          formData.append(String(key), changedData[key] as string | Blob);
        }
      });
      mutate(formData);
      refetch && refetch();
    }
  } else if (user) {
    const formData = new FormData();

    Object.keys(clothingData).map((key) => {
      if (key === "bodyLocation") {
        for (let index = 0; index < bodyLocation.length; index++) {
          const element = bodyLocation[index];
          formData.append("bodyLocation[]", element);
        }
      } else if (key === "image") {
        formData.append(String(key), image ?? "");
      } else {
        formData.append(
          String(key),
          String(clothingData[key as keyof ICreateClothingData]),
        );
      }
    });

    mutate(formData);
  }
};

export function closeModal(setOpen: Dispatch<SetStateAction<boolean>>): void {
  setOpen(false);
}
