import { Dialog, Transition } from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import ClothingCard from "../../components/Wardrobe/ClothingCard";
import { IClothingData } from "../../components/Wardrobe/interface";
import { IUser } from "../../interface/userInterface";
import { IErrorNotificationParams } from "../../StatusContext";

export default function GenerateFitModal({
  open,
  setOpen,
  data,
  user,
  setError,
  refetch,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: IClothingData[] | null;
  user: IUser | null;
  setError: Dispatch<SetStateAction<IErrorNotificationParams>>;
  refetch: () => void;
}) {
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
                  <div className="mt-2">
                    {data &&
                      data.map((item: IClothingData, index) => {
                        return (
                          <ClothingCard
                            item={item}
                            refetch={refetch}
                            setError={setError}
                            token={user?.token}
                            key={index}
                          />
                        );
                      })}
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
