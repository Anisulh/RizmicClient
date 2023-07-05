import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import ClothingCard from "./ClothingCard";
import { IClothingData } from "./interface";
import { IErrorNotificationParams } from "../../contexts/StatusContext";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function ExpandOutfitsModal({
  open,
  setOpen,
  name = "Outfit",
  clothes = [],
  setError,
  refetch,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  name: string | undefined;
  clothes: IClothingData[];
  setError: Dispatch<SetStateAction<IErrorNotificationParams>>;
  refetch?: () => void;
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
                <Dialog.Panel className=" relative w-fit transform  rounded-2xl bg-sWhite p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {name}
                  </Dialog.Title>
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-gray-400 hover:text-red-500  "
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                  </button>
                  <div className="mt-2 grid grid-cols-3 gap-10 overflow-auto">
                    {clothes?.length && clothes.length > 0 ? (
                      clothes.map((item: IClothingData, index) => {
                        return (
                          <ClothingCard
                            key={index}
                            item={item}
                            refetch={refetch}
                            setError={setError}
                          />
                        );
                      })
                    ) : (
                      <p>No clothes to choose from</p>
                    )}
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
