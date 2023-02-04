import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import ChevronLeftIcon from "@heroicons/react/24/outline/ChevronLeftIcon";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

export default function FilterCard() {
  const [dropDowns, setDropDowns] = useState({
    typeOpen: false,
    colorOpen: false,
    sizeOpen: false,
  });
  const [filterOptions, setFilterOptions] = useState({
    apparelType: "",
    color: "",
  })
  const [open, setOpen] = useState(false);
  const { typeOpen, colorOpen, sizeOpen } = dropDowns;
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    return
  }
  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <button
        className={
          open
            ? "hidden"
            : "border border-gray-300 py-1 px-2 rounded-md shadow-md hover:bg-ultramarineBlue hover:text-white absolute top-2 -left-16"
        }
        onClick={() => setOpen(true)}
      >
        <FunnelIcon className="h-6 w-6 bg-w" />
      </button>

      {open && (
        <div className="border shadow-lg w-64 rounded-md px-4 py-2 pb-10 absolute top-90 -left-20 z-10  bg-sWhite">
          <>
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-lg py-2">Filter</h2>
              <button
                className="text-gray-700 hover:bg-ultramarineBlue hover:text-white rounded-md py-1 px-1 "
                onClick={() => setOpen(false)}
              >
                <XMarkIcon className="h-5 w-5 " />
              </button>
            </div>

            <div className="flex justify-between items-center py-2">
              <p>Apparel Type:</p>
              <button
                onClick={() =>
                  setDropDowns((prevState) => ({
                    ...prevState,
                    typeOpen: !typeOpen,
                  }))
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
                  setDropDowns((prevState) => ({
                    ...prevState,
                    sizeOpen: !sizeOpen,
                  }))
                }
              >
                {sizeOpen ? (
                  <ChevronLeftIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </>
        </div>
      )}
    </>
  );
}
