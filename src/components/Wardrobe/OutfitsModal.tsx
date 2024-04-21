import { Dialog, Listbox, Transition } from "@headlessui/react";
import {
  ChangeEvent,
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { IOutfitData } from "./OutfitCard";
import { IClothingData } from "./interface";
import { useMutation } from "@tanstack/react-query";
import { createOutfits, updateOutfits } from "../../api/outfitsAPI";
import { closeModal, handleChange, removeImageFromUpload } from "./formLogic";
import InfoPopover from "./InfoPopover";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import ClothingCard from "./ClothingCard";
import { useToast } from "../../contexts/ToastContext";
export interface ICreateOutfitData {
  coverImg: Blob | null;
  name: string | undefined;
  clothes: IClothingData[];
  favorited: boolean;
}
export interface IUpdateOutfitData {
  coverImg?: Blob | string;
  name?: string | undefined;
  clothes?: IClothingData[];
  favorited?: boolean;
}

function OutfitsModal({
  open,
  setOpen,
  existingData = undefined,
  clothingItems = [],
  refetch,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  existingData?: IOutfitData | undefined;
  clothingItems?: IClothingData[];
  refetch: () => void;
}) {
  const { addToast } = useToast();
  const [outfitClothes, setOutfitClothes] = useState<IClothingData[]>([]);
  const [outfitData, setOutfitData] = useState<ICreateOutfitData>(
    existingData
      ? {
          name: existingData.name,
          coverImg: null,
          clothes: existingData.clothes,
          favorited: existingData.favorited,
        }
      : {
          name: "",
          coverImg: null,
          clothes: [],
          favorited: false,
        },
  );
  const { name, coverImg, favorited } = outfitData;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (coverImg && coverImg instanceof Blob) {
      setImageUrl(URL.createObjectURL(coverImg));
    }
  }, [coverImg]);
  const isLoading = true;
  const { mutate } = useMutation({
    mutationFn: async ({ data }: { data: FormData }) =>
      existingData && existingData._id
        ? await updateOutfits(existingData._id, data)
        : await createOutfits(data),
    onSuccess(data) {
      if (data.message) {
        addToast({
          title: "Something went wrong.",
          description: data.message,
          type: "error",
        });
      } else {
        setOpen(false);
        refetch();
      }
    },
  });

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (existingData) {
      const tempExistingData: IUpdateOutfitData = {
        coverImg: existingData.coverImg || undefined,
        name: existingData.name,
        favorited: existingData.favorited,
        clothes: existingData.clothes,
      };
      const changedData: Record<string, unknown> = {};
      const filterData = (
        object1: IUpdateOutfitData,
        object2: ICreateOutfitData,
      ) => {
        for (const key in object1) {
          if (
            Object.prototype.hasOwnProperty.call(object1, key) &&
            Object.prototype.hasOwnProperty.call(object2, key)
          ) {
            const element1 = object1[key as keyof IUpdateOutfitData];
            const element2 = object2[key as keyof ICreateOutfitData];
            if (element1 !== element2) {
              changedData[key] = element2;
            }
          }
        }
      };
      filterData(tempExistingData, outfitData);
      if (Object.keys(changedData).length === 0) {
        setOpen(false);
        return;
      } else {
        const formData = new FormData();

        Object.keys(changedData).map((key) => {
          if (key === "clothes") {
            for (let index = 0; index < outfitClothes.length; index++) {
              const element = outfitClothes[index];
              formData.append("clothes[]", element._id as string);
            }
          } else if (changedData[key] !== "null") {
            formData.append(String(key), changedData[key] as string | Blob);
          }
        });
        mutate({ data: formData });
      }
    } else {
      if (!outfitClothes || outfitClothes.length < 1) {
        addToast({
          title: "Something went wrong.",
          description: "Please add at least one piece of clothing",
          type: "error",
        });
        return;
      }
      const formData = new FormData();

      Object.keys(outfitData).map((key) => {
        if (key === "clothes") {
          for (let index = 0; index < outfitClothes.length; index++) {
            const element = outfitClothes[index];
            formData.append("clothes[]", element._id as string);
          }
        } else if (key === "coverImg") {
          formData.append(String(key), coverImg ?? "");
        } else if (key !== "image") {
          formData.append(
            String(key),
            String(outfitData[key as keyof ICreateOutfitData]),
          );
        }
      });
      mutate({ data: formData });
    }
  };

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => closeModal(setOpen)}
        >
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
                <Dialog.Panel className="w-full max-w-md transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create an Outfit
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={onSubmit}>
                      <div className="flex items-center mt-6">
                        <div className="w-full">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Outfit Name:
                          </label>
                          <input
                            id="name"
                            className="shadow-sm border border-gray-300 focus:border-ultramarineBlue focus:outline-none focus:ring-1 focus:ring-ultra  rounded-lg block w-full  text-raisinblack  py-2 px-3 placeholder-gray-600 text-sm"
                            placeholder="Please choose a category:"
                            onChange={(e) => handleChange(e, setOutfitData)}
                            value={name}
                          ></input>
                        </div>

                        <InfoPopover
                          title={"Outfit Name"}
                          text={"Optional. Choose a name for your outfit"}
                        />
                      </div>
                      <div className="flex items-center mt-6 ">
                        <div className="w-full">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Clothes
                          </label>
                          <Listbox
                            value={outfitClothes}
                            onChange={setOutfitClothes}
                            multiple
                          >
                            {({ open }) => (
                              <>
                                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                  {outfitClothes.length > 0
                                    ? outfitClothes.length + " pieces added"
                                    : "Please choose the pieces to add"}
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Listbox.Button>
                                {open && (
                                  <Transition appear show={open} as={Fragment}>
                                    <Dialog
                                      as="div"
                                      className="relative z-10"
                                      onClose={() => {
                                        !open;
                                      }}
                                    >
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
                                            <Dialog.Panel className="w-fit transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all overflow-auto">
                                              <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                              >
                                                Choose the pieces to add
                                              </Dialog.Title>

                                              <Listbox.Options>
                                                {" "}
                                                <div className="mt-2 grid grid-cols-3 gap-x-10 gap-y-2">
                                                  {clothingItems.length > 0 &&
                                                    clothingItems?.map(
                                                      (item) => (
                                                        <Listbox.Option
                                                          key={item._id}
                                                          className={({
                                                            active,
                                                          }) =>
                                                            `relative select-none py-2 pr-8 pl-4 rounded-lg ${
                                                              active
                                                                ? "bg-green-100 text-green-900"
                                                                : "text-gray-900"
                                                            }`
                                                          }
                                                          value={item}
                                                        >
                                                          {({ selected }) => (
                                                            <>
                                                              <ClothingCard
                                                                item={item}
                                                                refetch={
                                                                  refetch
                                                                }
                                                              />
                                                              {selected ? (
                                                                <span className="absolute top-1 right-1 flex items-center text-blue-600">
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
                                                </div>
                                              </Listbox.Options>
                                              <div className="flex justify-end mt-4">
                                                <button
                                                  type="button"
                                                  className="rounded-md border border-transparent bg-ultramarineBlue px-4 py-2 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                                                  onClick={() => !open}
                                                >
                                                  Done
                                                </button>
                                              </div>
                                            </Dialog.Panel>
                                          </Transition.Child>
                                        </div>
                                      </div>
                                    </Dialog>
                                  </Transition>
                                )}
                              </>
                            )}
                          </Listbox>
                        </div>

                        <InfoPopover
                          title={"Outfit Name"}
                          text={"Optional. Choose a name for your outfit"}
                        />
                      </div>
                      <div className="flex items-center mt-6 gap-4">
                        <label
                          htmlFor="favorited"
                          className=" block text-sm font-medium text-gray-700 "
                        >
                          Favorite:
                        </label>
                        <input
                          id="favorited"
                          type="checkbox"
                          className="rounded-sm shadow-sm border border-gray-400 hover:bg-ultramarineBlue focus:border-ultramarineBlue focus:outline-none focus:ring-1 focus:ring-ultra "
                          onChange={(e) => handleChange(e, setOutfitData)}
                          checked={favorited}
                        />
                      </div>
                      <div>
                        <div className="flex justify-center">
                          <div className="my-3 w-full">
                            <label
                              htmlFor="image"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Image:
                            </label>
                            <input
                              ref={imageUploadRef}
                              className="block w-full px-3 py-1.5 bg-white border border-solid border-gray-300 rounded-md focus:text-gray-700 focus:bg-white focus:border-ultramarineBlue focus:outline-none text-sm text-gray-700 file:rounded-md file:border file:border-gray-200 file:bg-cambridgeblue file:shadow-sm"
                              onChange={(e) => handleChange(e, setOutfitData)}
                              accept="image/png, image/jpeg, image/jpg"
                              type="file"
                              id="coverImg"
                            />
                          </div>
                        </div>
                        {imageUrl && coverImg && (
                          <div>
                            <p className="mb-2">Cover Image Preview:</p>
                            <div className="relative w-32">
                              <img
                                src={imageUrl}
                                alt="Outfit cover"
                                width="100px"
                              />
                              <button
                                type="button"
                                className="absolute -top-3 right-2 text-raisinblack hover:text-red-600"
                                onClick={() =>
                                  removeImageFromUpload(
                                    setOutfitData,
                                    imageUploadRef,
                                  )
                                }
                              >
                                <XMarkIcon className="h-5 w-5 " />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex justify-end gap-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-ourGrey px-4 py-2 text-sm font-medium text-raisinblack hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                          onClick={() => closeModal(setOpen)}
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

export default OutfitsModal;
