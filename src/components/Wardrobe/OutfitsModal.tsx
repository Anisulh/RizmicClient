import { Dialog, Listbox, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createOutfits, updateOutfits } from "../../api/outfitsAPI";
import {
  CheckIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import ClothingCard from "./ClothingCard";
import { useToast } from "../../contexts/ToastContext";
import { IExistingClothesData } from "./ClothesModal";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { filterData } from "../../utils/filterData";
import DialogModal from "../ui/modal/DialogModal";
import Input from "../ui/inputs/Input";
import Select from "../ui/inputs/Select";
import Button from "../ui/Button";
import { DevTool } from "@hookform/devtools";
import TagsInput from "../ui/inputs/TagsInput";
import cn from "../ui/cn";
import valuesToSelectOptions from "../../utils/valuesToSelectOptions";

const occasionValues = [
  "casual",
  "formal",
  "sport",
  "business",
  "party",
  "home",
  "travel",
  "festival",
] as const; // Mark it as a constant tuple to infer literal types

const seasonValues = ["spring", "summer", "autumn", "winter"] as const;

const OutfitsSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  clothes: z.array(z.string()).nonempty(),
  occasion: z
    .enum(occasionValues, {
      errorMap: () => ({ message: "Invalid clothing occasion" }),
    })
    .optional(),
  season: z
    .enum(seasonValues, {
      errorMap: () => ({ message: "Invalid clothing season" }),
    })
    .optional(),
  image: z.any().optional(),
  tags: z.array(z.string()).optional(),
  favorited: z.boolean().default(false),
});

export type IOutfitData = z.infer<typeof OutfitsSchema>;
export type PartialOutfitDataSchema = Partial<IOutfitData>;

const occasionOptions = valuesToSelectOptions(occasionValues);
const seasonOptions = valuesToSelectOptions(seasonValues);

export interface IExistingOutfitData extends Omit<IOutfitData, "clothes"> {
  _id: string;
  clothes: IExistingClothesData[];
  createdAt: string;
  updatedAt: string;
  __v: number;
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
  existingData?: IExistingOutfitData | undefined;
  clothingItems?: IExistingClothesData[];
  refetch: () => void;
}) {
  const { addToast } = useToast();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.onerror = () => {
        setImagePreview(null);
        addToast({
          title: "File Error",
          description: "Error reading the file",
          type: "error",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const getClothesIds = (clothes: IExistingClothesData[]): string[] =>
    clothes.map((c) => c._id);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IOutfitData>({
    resolver: zodResolver(OutfitsSchema),
    defaultValues: {
      name: existingData?.name ?? "",
      description: existingData?.description ?? "",
      clothes: existingData ? getClothesIds(existingData.clothes) : [],
      occasion: existingData?.occasion ?? undefined,
      season: existingData?.season ?? undefined,
      image: existingData?.image ?? undefined,
      tags: existingData?.tags ?? [],
      favorited: existingData?.favorited ?? false,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: FormData) =>
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
        reset();
        setOpen(false);
        refetch();
        addToast({
          title: "Success",
          description: "Your changes have been saved",
          type: "success",
        });
      }
    },
  });

  const onSubmit: SubmitHandler<IOutfitData> = async (data) => {
    if (!data.clothes || data.clothes.length < 1) {
      addToast({
        title: "No Clothes Added.",
        description: "Please add at least one piece of clothing",
        type: "error",
      });
      return;
    }
    const formData = new FormData();
    const keys = Object.keys(data) as Array<keyof IOutfitData>;

    const changedData = existingData ? filterData(existingData, data) : data;

    if (Object.keys(changedData).length === 0 && existingData) {
      setOpen(false);
      return;
    }

    keys.forEach((key) => {
      const value = changedData[key];
      if (value instanceof Array) {
        value.forEach((val) => {
          formData.append(key, val);
        });
      } else if (value instanceof FileList) {
        value.length > 0 && formData.append(key, value[0]);
      } else if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    try {
      await mutateAsync(formData);
    } catch (error) {
      addToast({
        title: "Something went wrong.",
        description: "An error occurred",
        type: "error",
      });
    }
  };

  return (
    <DialogModal title="Create an outfit" open={open} setOpen={setOpen}>
      <p className="text-sm">Fill in all required fields before submitting</p>
      <div className="mt-2 transition-all">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input<IOutfitData>
            type="text"
            label="Name"
            name="name"
            control={control}
            placeholder="Enter name"
          />

          <div className="mb-2">
            <label
              className="text-sm md:text-base font-medium text-gray-700 dark:text-white flex gap-1"
              htmlFor="clothes"
            >
              Clothes <span className="text-red-500">*</span>
            </label>
            <Controller
              name="clothes"
              control={control}
              render={({ field }) => (
                <Listbox {...field} multiple>
                  {({ open }) => (
                    <>
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm dark:text-gray-500">
                        {field.value.length > 0
                          ? `${field.value.length} pieces added`
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
                            className="relative z-30"
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
                                  <Dialog.Panel className="min-w-fit max-w-md w-full transform bg-white dark:bg-slate-700 rounded-2xl p-6 text-left align-middle shadow-xl transition-all overflow-auto">
                                    <Dialog.Title
                                      as="h3"
                                      className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                                    >
                                      Choose the pieces to add
                                    </Dialog.Title>

                                    <Listbox.Options>
                                      <div className="mt-2 grid md:grid-cols-3 gap-x-10 gap-y-2">
                                        {clothingItems.length > 0 &&
                                          clothingItems.map((item) => (
                                            <Listbox.Option
                                              key={item._id}
                                              className={({ active }) =>
                                                `relative select-none py-2 pr-8 pl-4 rounded-lg ${
                                                  active
                                                    ? "bg-green-100 text-green-900"
                                                    : "text-gray-900 "
                                                }`
                                              }
                                              value={item._id}
                                            >
                                              {({ selected }) => (
                                                <>
                                                  <ClothingCard
                                                    item={item}
                                                    refetch={refetch}
                                                  />
                                                  {selected && (
                                                    <span className="absolute top-1 right-1 flex items-center text-blue-600">
                                                      <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                      />
                                                    </span>
                                                  )}
                                                </>
                                              )}
                                            </Listbox.Option>
                                          ))}
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
              )}
            />
          </div>

          <button
            type="button"
            className="flex items-center gap-1 text-sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            Advanced
            <ChevronRightIcon
              className={cn("w-5 h-5", showAdvanced ? "rotate-90" : "rotate-0")}
            />
          </button>
          <Transition
            show={showAdvanced}
            enter="transition duration-150 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-125 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <div className="grid grid-cols-2 gap-4">
              <Input<IOutfitData>
                type="text"
                label="Description"
                name="description"
                control={control}
                placeholder="Enter description"
                required={false}
              />
              <Select<IOutfitData>
                label="Season"
                name="season"
                control={control}
                options={seasonOptions}
                required={false}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select<IOutfitData>
                label="Occasion"
                name="occasion"
                control={control}
                options={occasionOptions}
                required={false}
              />
              <Controller
                name="tags"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TagsInput tags={value || []} setTags={onChange} />
                )}
              />
            </div>
            <div>
              <div className="my-2 w-full">
                <label
                  className="text-sm md:text-base font-medium text-gray-700 dark:text-white flex gap-1"
                  htmlFor="image"
                >
                  Upload Image
                </label>

                <input
                  type="file"
                  {...register("image")}
                  onChange={handleFileChange}
                  className="rounded-lg block w-full text-raisinblack border-gray-300 shadow-sm focus:ring-raisinblack focus:border-raisinblack text-sm md:text-base dark:border-gray-600 dark:focus:ring-gray-500 dark:focus:border-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
                  accept="image/*"
                />
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.image.message as string}
                  </p>
                )}
              </div>
              {imagePreview && (
                <div>
                  <p className="mb-2">Image Preview:</p>
                  <div className="relative w-20">
                    <img
                      src={imagePreview}
                      alt="Chosen clothing"
                      width="40px"
                    />{" "}
                    <button
                      type="button"
                      className="absolute -top-3 right-2 text-raisinblack hover:text-red-600"
                      onClick={() => {
                        setValue("image", undefined);
                        setImagePreview(null);
                      }}
                    >
                      <XMarkIcon className="h-5 w-5 " />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input<IOutfitData>
                type="checkbox"
                label="Favorite"
                name="favorited"
                control={control}
                className="flex items-center w-5 gap-2"
                required={false}
              />
            </div>
          </Transition>
          <div className="w-full text-center">
            <Button type="submit" isLoading={isPending}>
              {existingData ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </div>
      {/* <DevTool control={control} /> */}
    </DialogModal>
  );
}

export default OutfitsModal;
