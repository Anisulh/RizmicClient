import { Dialog, Listbox, Popover, Transition } from "@headlessui/react";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  Fragment,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { IUserContext, UserContext } from "../UserContext";
import { useMutation } from "@tanstack/react-query";
import { createClothes, updateClothes } from "../api/clothesAPI";
import {
  IErrorNotificationParams,
  IStatusContext,
  StatusContext,
} from "../StatusContext";
import ColorPicker from "./ColorPicker";
import InfoPopover from "./InfoPopover";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
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

export interface IUpdateClothingData {
  category?: string;
  variant?: string;
  color?: string;
  layerable?: boolean;
  bodyLocation?: string[];
  image?: string;
}

type IColorType = "hex" | "text";
const categories = [
  "tshirt",
  "jacket",
  "sweater",
  "top",
  "shirt",
  "dress",
  "pants",
  "skirt",
  "shorts",
];

interface IBodyLocations {
  head: string;
  upperBody: string;
  lowerBody: string;
}

const bodyLocations: IBodyLocations = {
  head: "Head",
  upperBody: "Upper Body",
  lowerBody: "Lower Body",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ClothesModal({
  open,
  setOpen,
  existingData = null,
  refetch,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  existingData?: IClothingData | null;
  refetch?: () => void;
}) {
  const { user } = useContext(UserContext) as IUserContext;
  const { errorNotification, resetStatus } = useContext(
    StatusContext,
  ) as IStatusContext;

  const [clothingData, setClothingData] = useState<IClothingData>(
    existingData
      ? {
          category: existingData.category,
          variant: existingData.variant,
          color: existingData.color,
          layerable: existingData.layerable,
          bodyLocation: existingData.bodyLocation,
        }
      : {
          category: "",
          variant: "",
          color: "",
          layerable: false,
          bodyLocation: [],
        },
  );
  const { category, variant, color, bodyLocation, layerable } = clothingData;

  const [error, setError] = useState<IErrorNotificationParams>({
    message: null,
    error: null,
  });

  useEffect(() => {
    errorNotification(error);
    return () => {
      resetStatus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      data,
      token,
    }: {
      data: IClothingData | IUpdateClothingData;
      token: string;
    }) =>
      existingData && existingData._id
        ? await updateClothes(
            existingData._id,
            data as IUpdateClothingData,
            token,
          )
        : await createClothes(data as IClothingData, token),
    onSuccess(data) {
      if (data.message) {
        setError({ message: data.message });
      } else {
        setOpen(false);
      }
    },
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    if (e.target.name === "layerable") {
      const tempE = e as ChangeEvent<HTMLInputElement>;
      setClothingData((prevState) => ({
        ...prevState,
        [tempE.target.name]: tempE.target.checked,
      }));
    } else if (e.target.name === "bodyLocation") {
      setClothingData((prevState) => ({
        ...prevState,
        [e.target.name]: [e.target.value],
      }));
    } else {
      setClothingData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const [colorType, setColorType] = useState<IColorType>(
    existingData && existingData.color.startsWith("#") ? "hex" : "text",
  );

  const setColor = (color: string): void => {
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

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (!category || !variant || !color || !bodyLocation) {
      setError({ error: "Please fill in all fields" });
      return;
    }
    if (existingData && user) {
      const tempExistingData = {
        category: existingData.category,
        variant: existingData.variant,
        color: existingData.color,
        layerable: existingData.layerable,
        bodyLocation: existingData.bodyLocation,
      };
      const changedData: Record<string, unknown> = {};
      const filterData = (
        object1: IUpdateClothingData,
        object2: IClothingData,
      ) => {
        for (const key in object1) {
          if (
            Object.prototype.hasOwnProperty.call(object1, key) &&
            Object.prototype.hasOwnProperty.call(object2, key)
          ) {
            const element1 = object1[key as keyof IUpdateClothingData];
            const element2 = object2[key as keyof IClothingData];
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
        mutate({ data: changedData, token: user.token });
        refetch && refetch();
      }
    } else if (user) {
      mutate({ data: clothingData, token: user.token });
    }
  };

  function closeModal(): void {
    setOpen(false);
  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform  rounded-2xl bg-sWhite p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Clothing Item
                  </Dialog.Title>
                  <p className="text-sm text-slategrey">
                    Fill in all fields before submiting
                  </p>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                      <div className="flex items-center mt-6">
                        <div className="w-full">
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Category:
                          </label>
                          <select
                            id="category"
                            name="category"
                            className="shadow-sm border border-gray-300 focus:border-ultramarineBlue focus:outline-none focus:ring-1 focus:ring-ultra  rounded-lg block w-full  text-raisinblack  py-2 px-3 placeholder-gray-600 text-sm"
                            placeholder="Please choose a category:"
                            onChange={handleChange}
                            value={category}
                          >
                            <option value="">Please choose a category</option>
                            {categories.map((item) => {
                              return (
                                <option value={item} key={item}>
                                  {item.charAt(0).toUpperCase() + item.slice(1)}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <InfoPopover
                          title={"Category"}
                          text={
                            "Input what category of clothing does your item fall under. Common categories include, but not limited to, Hats, Sweaters, Shirts, Hoodies, Pants... etc."
                          }
                        />
                      </div>
                      <div className="flex items-center">
                        <div className="w-full my-6 ">
                          <label
                            htmlFor="variant"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Variant:
                          </label>
                          <input
                            id="variant"
                            name="variant"
                            type="text"
                            placeholder="Enter a variant"
                            className="shadow-sm border border-gray-300 focus:border-ultramarineBlue focus:outline-none focus:ring-1 focus:ring-ultra  rounded-lg text-sm block w-full  text-raisinblack py-2 px-3 placeholder-gray-600"
                            onChange={handleChange}
                            value={variant}
                            required
                          />
                        </div>

                        <InfoPopover
                          title={"Variant"}
                          text={
                            "Input the variant this item falls under based on on the specified category. For example, if the clothing falls under the sweater category, the variant can be mock-neck sweater, v-neck sweater, crew-neck sweater... etc."
                          }
                        />
                      </div>
                      <label
                        htmlFor="color"
                        className="block text-sm font-medium text-gray-700 -mt-1"
                      >
                        Color:
                      </label>
                      <div className="flex items-center gap-4 mb-6 ">
                        <div className="relative rounded-md shadow-sm w-full ">
                          <input
                            type="text"
                            id="color"
                            name="color"
                            value={color}
                            className="shadow-sm border border-gray-300 focus:border-ultramarineBlue focus:outline-none focus:ring-1 focus:ring-ultra  rounded-lg block w-full  text-raisinblack pl-20 pr-4 py-2 text-sm placeholder-gray-600"
                            placeholder={
                              colorType === "hex"
                                ? "Please enter hex code"
                                : "Enter color name "
                            }
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              setColor(e.target.value)
                            }
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center">
                            <label htmlFor="colorType" className="sr-only">
                              Color Type:
                            </label>
                            <select
                              id="colorType"
                              name="colorType"
                              className="h-full text-raisinblack rounded-md border-transparent bg-transparent py-0 pl-2 pr-10 sm:text-sm"
                              value={colorType}
                              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setColorType(
                                  e.target.value === "hex" ? "hex" : "text",
                                )
                              }
                            >
                              <option value="text">Text</option>
                              <option value="hex">HEX</option>
                            </select>
                          </div>
                        </div>

                        <Popover className=" relative ">
                          {({ open }) => (
                            <>
                              <Popover.Button
                                className={`
                ${open ? "" : "text-opacity-90"}
                   hover:text-opacity-100 focus:outline-none h-9 mt-1 w-9 shadow-sm border border-gray-300 focus:border-ultramarineBlue focus:ring-1 focus:ring-ultra  rounded-md hover:border-ultramarineBlue`}
                                style={{ backgroundColor: color }}
                                onClick={() => setColorType("hex")}
                              ></Popover.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                              >
                                <Popover.Panel className="absolute  bg-sWhite z-30 mt-3 rounded-md max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                  <div className="bg-sWhite p-5 rounded-md shadow-lg">
                                    <ColorPicker
                                      color={color}
                                      colorType={colorType}
                                      onChange={setColor}
                                    />
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      </div>

                      <div className="flex items-center">
                        <div className="w-full">
                          <Listbox
                            value={bodyLocation}
                            multiple
                            onChange={(value) => {
                              const set = new Set([...bodyLocation, ...value]);
                              setClothingData((prevState) => ({
                                ...prevState,
                                bodyLocation: Array.from(set),
                              }));
                            }}
                          >
                            {({ open }) => (
                              <div className="relative">
                                <Listbox.Label className="block text-sm font-medium text-gray-700">
                                  Body Location:
                                </Listbox.Label>
                                <div className="absolute z-10 bottom-1.5 left-0 flex">
                                  {bodyLocation.map((location, index) => {
                                    return (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setClothingData((prevState) => ({
                                            ...prevState,
                                            bodyLocation: bodyLocation.filter(
                                              (item) => item !== location,
                                            ),
                                          }));
                                        }}
                                        className=" flex items-center gap-2 px-2 py-1 mx-1 border rounded-full bg-cambridgeblue text-sm hover:bg-ultramarineBlue hover:text-white"
                                        key={index}
                                      >
                                        {
                                          bodyLocations[
                                            location as keyof IBodyLocations
                                          ]
                                        }
                                        <XMarkIcon className="w-4 h-4 " />
                                      </button>
                                    );
                                  })}
                                </div>
                                <div className="relative mt-1">
                                  <Listbox.Button className="relative w-full h-10  cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm border border-gray-300 focus:border-ultramarineBlue focus:outline-none focus:ring-1 focus:ring-ultra  sm:text-sm">
                                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                      <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>

                                  <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {Object.keys(bodyLocations).map(
                                        (location, index) => (
                                          <Listbox.Option
                                            key={index}
                                            className={({ active }) =>
                                              classNames(
                                                active
                                                  ? "text-white bg-ultramarineBlue"
                                                  : "text-gray-900",
                                                "relative cursor-default select-none  pl-3 pr-9",
                                              )
                                            }
                                            value={location}
                                          >
                                            {({ selected, active }) => (
                                              <>
                                                <div className="flex items-center">
                                                  <span
                                                    className={classNames(
                                                      selected
                                                        ? "font-semibold"
                                                        : "font-normal",
                                                      "ml-3 block truncate",
                                                    )}
                                                  >
                                                    {
                                                      bodyLocations[
                                                        location as keyof IBodyLocations
                                                      ]
                                                    }
                                                  </span>
                                                </div>

                                                {selected ? (
                                                  <span
                                                    className={classNames(
                                                      active
                                                        ? "text-white"
                                                        : "text-ultramarineBlue",
                                                      "absolute inset-y-0 right-0 flex items-center pr-4",
                                                    )}
                                                  >
                                                    <CheckIcon
                                                      className="h-5 w-5"
                                                      aria-hidden="true"
                                                    />
                                                  </span>
                                                ) : null}
                                              </>
                                            )}
                                          </Listbox.Option>
                                        ),
                                      )}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </div>
                            )}
                          </Listbox>
                        </div>
                        <InfoPopover
                          title={"Body Location"}
                          text={
                            "Enter the location of the body of which this item is supposed to be worn. Ex. sweater would be upperBody"
                          }
                        />
                      </div>
                      <div className="flex items-center mt-6 gap-4">
                        <label
                          htmlFor="layerable"
                          className=" block text-sm font-medium text-gray-700 "
                        >
                          Layerable:
                        </label>
                        <input
                          id="layerable"
                          name="layerable"
                          type="checkbox"
                          className="rounded-sm shadow-sm border border-gray-400 hover:bg-ultramarineBlue focus:border-ultramarineBlue focus:outline-none focus:ring-1 focus:ring-ultra "
                          onChange={handleChange}
                          checked={layerable}
                        />
                      </div>
                      <div className="flex justify-center">
                        <div className="my-3 w-full">
                          <label
                            htmlFor="image"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Image:
                          </label>
                          <input
                            className="block w-full px-3 py-1.5 bg-white border border-solid border-gray-300 rounded-md focus:text-gray-700 focus:bg-white focus:border-ultramarineBlue focus:outline-none text-sm text-gray-700 file:rounded-md file:border file:border-gray-200 file:bg-cambridgeblue file:shadow-sm"
                            type="file"
                            name="image"
                            id="image"
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end gap-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-ourGrey px-4 py-2 text-sm font-medium text-raisinblack hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-ultramarineBlue px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="flex justify-center items-center bg-transparent">
                              <div
                                className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full bg-transparent text-gray-300"
                                role="status"
                              >
                                <span className="sr-only">Loading</span>
                              </div>
                              Processing...
                            </span>
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
