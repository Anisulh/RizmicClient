import { Dialog, Popover, Transition } from "@headlessui/react";
import React, {
  ChangeEvent,
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import QuestionMarkCircleIcon from "@heroicons/react/20/solid/QuestionMarkCircleIcon";
import { IUserContext, UserContext } from "../UserContext";
import { useMutation } from "@tanstack/react-query";
import { createClothes } from "../api/clothesAPI";
import {
  IErrorNotificationParams,
  IStatusContext,
  StatusContext,
} from "../StatusContext";
import { useNavigate } from "react-router-dom";

export interface IClothingData {
  type: string;
  specificType: string;
  color: string;
  size: string;
  bodyLocation: string
}

export default function ClothesModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) as IUserContext;
  const { errorNotification, resetStatus } = useContext(
    StatusContext,
  ) as IStatusContext;
  const [clothingData, setClothingData] = useState<IClothingData>({
    type: "",
    specificType: "",
    color: "",
    size: "",
    bodyLocation: ""
  });
  const { type, specificType, color, size, bodyLocation } = clothingData;
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
    mutationFn: ({ data, token }: { data: IClothingData; token: string }) =>
      createClothes(data, token),
    onSuccess(data) {
      if (data.message) {
        setError({ message: data.message });
      } else {
        setOpen(false);
      }
    },
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClothingData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!type || !specificType || !color || !size || !bodyLocation) {
      setError({ error: "Please fill in all fields" });
      return;
    }
    if (user && user.token) {
      console.log("mutating");
      mutate({ data: clothingData, token: user.token });
    }
  };

  function closeModal() {
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
                      <div className="flex items-center">
                        <input
                          name="type"
                          type="text"
                          placeholder="Type:"
                          className="border rounded-lg block w-full bg-ourGrey text-raisinblack mt-6 py-2 px-3 placeholder-raisinblack"
                          onChange={handleChange}
                          required
                        />
                        <Popover className="relative">
                          {({ open }) => (
                            <>
                              <Popover.Button
                                className={`
                ${open ? "" : "text-opacity-90"} rounded-full
                   hover:text-opacity-100 focus:outline-none `}
                              >
                                <QuestionMarkCircleIcon
                                  className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 mt-6 text-ultramarineBlue transition duration-150 ease-in-out group-hover:text-opacity-80`}
                                  aria-hidden="true"
                                />
                              </Popover.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                              >
                                <Popover.Panel className="absolute left-full bg-sWhite z-20 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="p-4">
                                      <div className=" px-2 py-2 ">
                                        <h6 className="text-sm font-medium text-gray-900">
                                          Category:
                                        </h6>

                                        <p className="block text-sm text-gray-500">
                                          Input what category of clothing does
                                          your item fall under. Common
                                          categories include, but not limited
                                          to, Hats, Sweaters, Shirts, Hoodies,
                                          Pants... etc.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      </div>
                      <div className="flex items-center">
                        <input
                          name="specificType"
                          type="text"
                          placeholder="Variant:"
                          className="border rounded-lg block w-full bg-ourGrey text-raisinblack my-6 py-2 px-3 placeholder-raisinblack"
                          onChange={handleChange}
                          required
                        />
                        <Popover className="relative ">
                          {({ open }) => (
                            <>
                              <Popover.Button
                                className={`
                ${open ? "" : "text-opacity-90"}
                   hover:text-opacity-100 focus:outline-none rounded-full`}
                              >
                                <QuestionMarkCircleIcon
                                  className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-ultramarineBlue transition duration-150 ease-in-out group-hover:text-opacity-80`}
                                  aria-hidden="true"
                                />
                              </Popover.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                              >
                                <Popover.Panel className="absolute left-full bg-sWhite z-30 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="p-4">
                                      <div className=" px-2 py-2 ">
                                        <h6 className="text-sm font-medium text-gray-900">
                                          Variant:
                                        </h6>

                                        <p className="block text-sm text-gray-500">
                                          Input the variant this item falls
                                          under based on on the specified
                                          category. For example, if the clothing
                                          falls under the sweater category, the
                                          variant can be mock-neck sweater,
                                          v-neck sweater, crew-neck sweater...
                                          etc.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      </div>
                      <input
                        name="color"
                        type="text"
                        placeholder="Color:"
                        className="border rounded-lg block w-full bg-ourGrey text-raisinblack py-2 px-3 placeholder-raisinblack"
                        onChange={handleChange}
                        required
                      />
                      <input
                        name="size"
                        type="text"
                        placeholder="Size:"
                        className="border rounded-lg block w-full bg-ourGrey text-raisinblack my-6 py-2 px-3 placeholder-raisinblack"
                        onChange={handleChange}
                        required
                      />
                       <div className="flex items-center">
                        <input
                          name="bodyLocation"
                          type="text"
                          placeholder="Body Location:"
                          className="border rounded-lg block w-full bg-ourGrey text-raisinblack py-2 px-3 placeholder-raisinblack"
                          onChange={handleChange}
                          required
                        />
                        <Popover className="relative ">
                          {({ open }) => (
                            <>
                              <Popover.Button
                                className={`
                ${open ? "" : "text-opacity-90"}
                   hover:text-opacity-100 focus:outline-none rounded-full`}
                              >
                                <QuestionMarkCircleIcon
                                  className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-ultramarineBlue transition duration-150 ease-in-out group-hover:text-opacity-80`}
                                  aria-hidden="true"
                                />
                              </Popover.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                              >
                                <Popover.Panel className="absolute left-full bg-sWhite z-30 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="p-4">
                                      <div className=" px-2 py-2 ">
                                        <h6 className="text-sm font-medium text-gray-900">
                                          Body Location:
                                        </h6>

                                        <p className="block text-sm text-gray-500">
                                          Enter the location of the body of which this item is supposed to be worn. Ex. sweater would be upperBody
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
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
