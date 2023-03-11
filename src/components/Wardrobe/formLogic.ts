import {
  ChangeEvent,
  Dispatch,
  RefObject,
  SetStateAction,
} from "react";
import { IUser } from "../../interface/userInterface";
import { IErrorNotificationParams } from "../../contexts/StatusContext";
import {
  IClothingData,
  ICreateClothingData,
  IUpdateClothingData,
} from "./interface";

export const handleChange = (
  { currentTarget }: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setClothingData: Dispatch<SetStateAction<ICreateClothingData>>,
): void => {
  if (currentTarget instanceof HTMLInputElement) {
    if (currentTarget.type === "checkbox") {
      setClothingData((prevState) => ({
        ...prevState,
        [currentTarget.id]: currentTarget.checked,
      }));
    } else if (currentTarget.files) {
      setClothingData((prevState) => ({
        ...prevState,
        [currentTarget.id]: currentTarget.files && currentTarget.files[0],
      }));
    } else {
      setClothingData((prevState) => ({
        ...prevState,
        [currentTarget.id]: currentTarget.value,
      }));
    }
  } else if (currentTarget instanceof HTMLSelectElement) {
    setClothingData((prevState) => ({
      ...prevState,
      [currentTarget.id]: currentTarget.value,
    }));
  }
};

export const removeImageFromUpload = (
  setClothingData: Dispatch<SetStateAction<ICreateClothingData>>,
  imageUploadRef: RefObject<HTMLInputElement>,
) => {
  setClothingData((prevState) => ({
    ...prevState,
    image: null,
  }));
  if (imageUploadRef.current) {
    imageUploadRef.current.value = "";
  }
};

export const setColor = (
  color: string,
  colorType: string,
  setClothingData: Dispatch<SetStateAction<ICreateClothingData>>,
): void => {
  let newColor = color;
  if (colorType === "hex" && !newColor.startsWith("#")) {
    newColor = `#${color}`;
  }
  if (colorType === "text" && newColor.startsWith("#")) {
    newColor = color.slice(1);
  }
  setClothingData((prevState) => ({
    ...prevState,
    color: newColor,
  }));
};

export const handleSubmit = (
  clothingData: ICreateClothingData,
  user: IUser | null,
  setError: Dispatch<SetStateAction<IErrorNotificationParams>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  mutate: (arg0: { data: FormData; token: string }) => void,
  refetch?: () => void,
  existingData?: IClothingData,
): void => {
  const { category, variant, color, bodyLocation, image } = clothingData;
  if (!category || !variant || !color || !bodyLocation) {
    setError({ error: "Please fill in all fields" });
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
      mutate({ data: formData, token: user.token });
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

    mutate({ data: formData, token: user.token });
  }
};

export function closeModal(setOpen: Dispatch<SetStateAction<boolean>>): void {
  setOpen(false);
}
