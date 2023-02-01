import React, { Fragment, useState } from "react";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import ChevronLeftIcon from "@heroicons/react/24/outline/ChevronLeftIcon";
import { Dialog, Transition } from "@headlessui/react";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

export default function FilterCard() {
  const [dropDowns, setDropDowns] = useState({
    typeOpen: false,
    colorOpen: false,
    sizeOpen: false,
  });
  const [open, setOpen] = useState(true);
  const { typeOpen, colorOpen, sizeOpen } = dropDowns;

  return (
    <div className="border shadow-lg w-64 rounded-md px-4 py-2 pb-10 absolute top-90 -left-64">
      <h2 className="font-bold text-2xl py-2">Filter</h2>
      <div className="flex justify-between items-center py-2">
        <p>Apparel Type:</p>
        <button
          onClick={() =>
            setDropDowns((prevState) => ({ ...prevState, typeOpen: !typeOpen }))
          }
        >
          {typeOpen ? (
            <ChevronLeftIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      <div className="flex justify-between items-center py-2">
        <p>Color:</p>
        <button
          onClick={() =>
            setDropDowns((prevState) => ({
              ...prevState,
              colorOpen: !colorOpen,
            }))
          }
        >
          {colorOpen ? (
            <ChevronLeftIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      <div className="flex justify-between items-center py-2">
        <p>Size:</p>
        <button
          onClick={() =>
            setDropDowns((prevState) => ({ ...prevState, sizeOpen: !sizeOpen }))
          }
        >
          {sizeOpen ? (
            <ChevronLeftIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
    
  );
}
