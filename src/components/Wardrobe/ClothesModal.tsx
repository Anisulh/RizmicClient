import { Dialog, Listbox, Popover, Transition } from "@headlessui/react";
import {
  ChangeEvent,
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IUserContext, UserContext } from "../../contexts/UserContext";
import { useMutation } from "@tanstack/react-query";
import { createClothes, updateClothes } from "../../api/clothesAPI";
import {
  IErrorNotificationParams,
  IStatusContext,
  StatusContext,
} from "../../contexts/StatusContext";
import ColorPicker from "./ColorPicker";
import InfoPopover from "./InfoPopover";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { IClothingData, ICreateClothingData } from "./interface";
import {
  closeModal,
  handleChange,
  handleSubmit,
  removeImageFromUpload,
  setColor,
} from "./formLogic";
import BodyLocationOptions, {
  BodyLocationChips,
} from "./BodyLocationSelection";
import ChevronUpDownIcon from "@heroicons/react/20/solid/ChevronDownIcon";
import { colord } from "colord";

type IColorType = "rgb" | "text";
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

export default function ClothesModal({
  open,
  setOpen,
  existingData = undefined,
  refetch,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  existingData?: IClothingData | undefined;
  refetch?: () => void;
}) {
  const { user } = useContext(UserContext) as IUserContext;
  const { errorNotification, resetStatus } = useContext(
    StatusContext,
  ) as IStatusContext;

  const [clothingData, setClothingData] = useState<ICreateClothingData>(
    existingData
      ? {
          category: existingData.category,
          variant: existingData.variant,
          color: existingData.color,
          layerable: existingData.layerable,
          bodyLocation: existingData.bodyLocation,
          image: null,
        }
      : {
          category: "",
          variant: "",
          color: "",
          layerable: false,
          bodyLocation: [],
          image: null,
        },
  );
  const { category, variant, color, bodyLocation, layerable, image } =
    clothingData;
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (image && image instanceof Blob) {
      setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);
  const [colorType, setColorType] = useState<IColorType>(
    existingData && existingData.color.startsWith("rgb") ? "rgb" : "text",
  );
  const [error, setError] = useState<IErrorNotificationParams>({
    message: null,
    error: null,
  });
  const previewRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    errorNotification(error);
    return () => {
      resetStatus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: FormData) =>
      existingData && existingData._id
        ? await updateClothes(existingData._id, data)
        : await createClothes(data),
    onSuccess(data) {
      if (data.message) {
        setError({ message: data.message });
      } else {
        setOpen(false);
      }
    },
  });

  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  useEffect(() => {
    if (isSubmiting && color.startsWith("rgb")) {
      handleSubmit(
        clothingData,
        user,
        setError,
        setOpen,
        mutate,
        refetch,
        existingData && existingData,
      );
      setIsSubmiting(false);
    }
  }, [color, isSubmiting]);

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
                    Add Clothing Item
                  </Dialog.Title>
                  <p className="text-sm text-slategrey">
                    Fill in all fields before submiting
                  </p>
                  <div className="mt-2">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setIsSubmiting(true);
                        if (colorType === "text" && previewRef.current) {
                          const computedColor = window.getComputedStyle(
                            previewRef?.current,
                          ).backgroundColor;
                          setClothingData((prevState) => ({
                            ...prevState,
                            color: computedColor,
                          }));
                        }
                      }}
                    >
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
                            className="shadow-sm border border-gray-300 focus:border-ultramarineBlue focus:outline-none focus:ring-1 focus:ring-ultra  rounded-lg block w-full  text-raisinblack  py-2 px-3 placeholder-gray-600 text-sm"
                            placeholder="Please choose a category:"
                            onChange={(e) => handleChange(e, setClothingData)}
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
                            type="text"
                            placeholder="Enter a variant"
                            className="shadow-sm border border-gray-300 focus:border-ultramarineBlue focus:outline-none focus:ring-1 focus:ring-ultra  rounded-lg text-sm block w-full  text-raisinblack py-2 px-3 placeholder-gray-600"
                            onChange={(e) => handleChange(e, setClothingData)}
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
                            value={color}
                            className="shadow-sm border border-gray-300 focus:border-ultramarineBlue focus:outline-none focus:ring-1 focus:ring-ultra  rounded-lg block w-full  text-raisinblack pl-20 pr-4 py-2 text-sm placeholder-gray-600"
                            placeholder={
                              colorType === "rgb"
                                ? "Please enter rgb code"
                                : "Enter color name "
                            }
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              setColor(e.target.value, setClothingData)
                            }
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center">
                            <label htmlFor="colorType" className="sr-only">
                              Color Type:
                            </label>
                            <select
                              id="colorType"
                              className="h-full text-raisinblack rounded-md border-transparent bg-transparent py-0 pl-2 pr-10 sm:text-sm"
                              value={colorType}
                              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setColorType(
                                  e.target.value === "rgb" ? "rgb" : "text",
                                )
                              }
                            >
                              <option value="text">Text</option>
                              <option value="rgb">RGB</option>
                            </select>
                          </div>
                        </div>

                        <Popover className=" relative ">
                          {({ open }) => (
                            <>
                              <Popover.Button
                                ref={previewRef}
                                className={`
                ${open ? "" : "text-opacity-90"}
                   hover:text-opacity-100 focus:outline-none h-9 mt-1 w-9 shadow-sm border border-gray-300 focus:border-ultramarineBlue focus:ring-1 focus:ring-ultra  rounded-md hover:border-ultramarineBlue`}
                                style={{ backgroundColor: color }}
                                onClick={() => setColorType("rgb")}
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
                                <Popover.Panel className="absolute  bg-white z-30 mt-3 rounded-md max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                  <div className="bg-white p-5 rounded-md shadow-lg">
                                    <ColorPicker
                                      color={color}
                                      onChange={(data: string): void => {
                                        const rgbString =
                                          colord(data).toRgbString();
                                        setColor(rgbString, setClothingData);
                                      }}
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
                                  <BodyLocationChips
                                    bodyLocation={bodyLocation}
                                    setClothingData={setClothingData}
                                  />
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
                                      <BodyLocationOptions />
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
                          type="checkbox"
                          className="rounded-sm shadow-sm border border-gray-400 hover:bg-ultramarineBlue focus:border-ultramarineBlue focus:outline-none focus:ring-1 focus:ring-ultra "
                          onChange={(e) => handleChange(e, setClothingData)}
                          checked={layerable}
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
                              onChange={(e) => handleChange(e, setClothingData)}
                              accept="image/png, image/jpeg, image/jpg"
                              type="file"
                              id="image"
                            />
                          </div>
                        </div>
                        {imageUrl && image && (
                          <div>
                            <p className="mb-2">Image Preview:</p>
                            <div className="relative w-32">
                              <img
                                src={imageUrl}
                                alt="Chosen clothing"
                                width="100px"
                              />{" "}
                              <button
                                type="button"
                                className="absolute -top-3 right-2 text-raisinblack hover:text-red-600"
                                onClick={() =>
                                  removeImageFromUpload(
                                    setClothingData,
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
