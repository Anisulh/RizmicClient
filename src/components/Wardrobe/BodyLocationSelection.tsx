import { Listbox } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React, { Dispatch, SetStateAction } from "react";
import { IBodyLocations, ICreateClothingData } from "./interface";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const bodyLocations: IBodyLocations = {
  head: "Head",
  upperBody: "Upper Body",
  lowerBody: "Lower Body",
};

export default function BodyLocationOptions() {
  return (
    <>
      {Object.keys(bodyLocations).map((location, index) => (
        <Listbox.Option
          key={index}
          className={({ active }) =>
            classNames(
              active ? "text-white bg-ultramarineBlue" : "text-gray-900",
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
                    selected ? "font-semibold" : "font-normal",
                    "ml-3 block truncate",
                  )}
                >
                  {bodyLocations[location as keyof IBodyLocations]}
                </span>
              </div>

              {selected ? (
                <span
                  className={classNames(
                    active ? "text-white" : "text-ultramarineBlue",
                    "absolute inset-y-0 right-0 flex items-center pr-4",
                  )}
                >
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              ) : null}
            </>
          )}
        </Listbox.Option>
      ))}
    </>
  );
}

export function BodyLocationChips({bodyLocation, setClothingData}: {bodyLocation: string[], setClothingData:Dispatch<SetStateAction<ICreateClothingData>>}) {
  return (
    <>
      {bodyLocation.map((location, index) => {
        return (
          <button
            type="button"
            onClick={() => {
              setClothingData((prevState) => ({
                ...prevState,
                bodyLocation: bodyLocation.filter((item) => item !== location),
              }));
            }}
            className=" flex items-center gap-2 px-2 py-1 mx-1 border rounded-full bg-cambridgeblue text-sm hover:bg-ultramarineBlue hover:text-white"
            key={index}
          >
            {bodyLocations[location as keyof IBodyLocations]}
            <XMarkIcon className="w-4 h-4 " />
          </button>
        );
      })}
    </>
  );
}
