import { Popover, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createClothes, updateClothes } from "../../../api/clothesAPI";
import ColorPicker from "./ColorPicker";
import { colord } from "colord";
import { useToast } from "../../../contexts/ToastContext";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/ui/inputs/Input";
import Button from "../../../components/ui/Button";
import DialogModal from "../../../components/ui/modal/DialogModal";
import Select from "../../../components/ui/inputs/Select";
import cn from "../../../components/ui/cn";
import { ChevronRightIcon, XMarkIcon } from "@heroicons/react/20/solid";
import TagsInput from "../../../components/ui/inputs/TagsInput";
import { filterData } from "../../../utils/filterData";
import valuesToSelectOptions from "../../../utils/valuesToSelectOptions";

const categoryValues = [
  "t-shirt",
  "jacket",
  "sweater",
  "top",
  "shirt",
  "dress",
  "pants",
  "skirt",
  "shorts",
  "accessories",
] as const;

const sizeValues = ["xs", "s", "m", "l", "xl", "xxl", "xxxl"] as const;
const conditionValues = ["new", "like new", "good", "fair", "poor"] as const;
const ClothesModalSchema = z.object({
  name: z.string().min(1).max(100),
  category: z.enum(categoryValues, {
    errorMap: () => ({ message: "Invalid clothing category" }),
  }),
  size: z.enum(sizeValues, {
    errorMap: () => ({ message: "Invalid clothing size" }),
  }),
  color: z.string().min(1).max(50),
  material: z.string().optional(),
  brand: z.string().optional(),
  condition: z.enum(conditionValues, {
    errorMap: () => ({ message: "Invalid clothing condition" }),
  }),
  purchaseDate: z.date().optional(),
  price: z.number().optional(),
  description: z.string().max(1000).optional(),
  careInstructions: z.string().max(1000).optional(),
  image: z.any().optional(),
  tags: z.array(z.string()).optional(),
  favorited: z.boolean().default(false),
});

export type IClothesModalSchema = z.infer<typeof ClothesModalSchema>;
export type PartialClothesModalSchema = Partial<IClothesModalSchema>;

export interface IExistingClothesData extends IClothesModalSchema {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const categoryOptions = valuesToSelectOptions(categoryValues);
const sizeOptions = valuesToSelectOptions(sizeValues);
const conditionOptions = valuesToSelectOptions(conditionValues);

export default function ClothesModal({
  open,
  setOpen,
  existingData = undefined,
  refetch,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  existingData?: IExistingClothesData | undefined;
  refetch?: () => void;
}) {
  const { addToast } = useToast();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [previewColor, setPreviewColor] = useState(
    existingData?.color ?? "rgb(255, 255, 255)",
  );
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

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IClothesModalSchema>({
    resolver: zodResolver(ClothesModalSchema),
    defaultValues: {
      name: existingData?.name ?? "",
      category: existingData?.category ?? "t-shirt",
      size: existingData?.size ?? "m",
      color: existingData?.color ?? "rgb(255, 255, 255)",
      material: existingData?.material ?? "",
      brand: existingData?.brand ?? "",
      condition: existingData?.condition ?? "new",
      purchaseDate: existingData?.purchaseDate ?? undefined,
      price: existingData?.price ?? undefined,
      description: existingData?.description ?? "",
      careInstructions: existingData?.careInstructions ?? "",
      image: existingData?.image ?? undefined,
      tags: existingData?.tags ?? [],
      favorited: existingData?.favorited ?? false,
    },
  });

  const color = watch("color");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      return existingData
        ? updateClothes(existingData._id, formData)
        : createClothes(formData);
    },
    onSuccess: (data) => {
      if (data.message) {
        addToast({
          title: "Unable to Submit Form",
          description: data.message,
          type: "error",
        });
      } else {
        setOpen(false);
        reset();
        setShowAdvanced(false);
        refetch && refetch();
        addToast({
          title: "Success",
          description: "Your changes have been saved",
          type: "success",
        });
      }
    },
    onError: () => {
      addToast({
        title: "Error",
        description: "There was an error saving your changes",
        type: "error",
      });
    },
  });

  const onSubmit: SubmitHandler<IClothesModalSchema> = async (data) => {
    const formData = new FormData();
    const keys = Object.keys(data) as Array<keyof IClothesModalSchema>;

    // Use existing data to find changes if updating, else use all data
    const finalData = existingData ? filterData(existingData, data) : data;

    if (Object.keys(finalData).length === 0 && existingData) {
      setOpen(false);
      return;
    }

    keys.forEach((key) => {
      const value = finalData[key];
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
    <DialogModal title="Add Clothing" open={open} setOpen={setOpen}>
      <p className="text-sm">Fill in all required fields before submitting</p>
      <div className="mt-2 transition-all">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input<IClothesModalSchema>
            type="text"
            label="Name"
            name="name"
            control={control}
            placeholder="Enter name"
          />
          <div className="grid grid-cols-2 gap-4">
            <Select<IClothesModalSchema>
              label="Category"
              name="category"
              control={control}
              options={categoryOptions}
            />
            <Select<IClothesModalSchema>
              label="Size"
              name="size"
              control={control}
              options={sizeOptions}
            />
          </div>
          <div className="flex items-end gap-2">
            <Input<IClothesModalSchema>
              type="text"
              label="Color"
              name="color"
              control={control}
              placeholder="Enter color"
              formatInput={(value) => {
                setPreviewColor(value);
              }}
            />
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={` ${open ? "" : "text-opacity-90"} focus:ring-ultra my-3 size-8 rounded-md border border-gray-300 shadow-sm hover:border-ultramarineBlue hover:text-opacity-100 focus:border-ultramarineBlue focus:outline-none focus:ring-1`}
                    style={{ backgroundColor: previewColor || "white" }}
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
                    <Popover.Panel className="absolute z-30 mt-3 max-w-sm -translate-x-1/2 transform rounded-md bg-white px-4 sm:px-0 lg:max-w-3xl">
                      <div className="rounded-md bg-white p-5 shadow-lg">
                        <ColorPicker
                          color={color}
                          onChange={(data: string): void => {
                            const rgbString = colord(data).toRgbString();
                            setValue("color", rgbString);
                            setPreviewColor(rgbString);
                          }}
                        />
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>

          <button
            type="button"
            className="flex items-center gap-1 text-sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            Advanced
            <ChevronRightIcon
              className={cn("size-5", showAdvanced ? "rotate-90" : "rotate-0")}
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
              <Input<IClothesModalSchema>
                type="text"
                label="Brand"
                name="brand"
                control={control}
                placeholder="Enter brand"
                required={false}
              />
              <Input<IClothesModalSchema>
                type="text"
                label="Material"
                name="material"
                control={control}
                placeholder="Enter material"
                required={false}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input<IClothesModalSchema>
                type="number"
                label="Price"
                name="price"
                control={control}
                placeholder="Enter price"
                required={false}
              />
              <Input<IClothesModalSchema>
                type="date"
                label="Purchase Date"
                name="purchaseDate"
                control={control}
                required={false}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input<IClothesModalSchema>
                type="text"
                label="Description"
                name="description"
                control={control}
                placeholder="Enter description"
                required={false}
              />
              <Input<IClothesModalSchema>
                type="text"
                label="Care Instructions"
                name="careInstructions"
                control={control}
                placeholder="Enter care instructions"
                required={false}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select<IClothesModalSchema>
                label="Condition"
                name="condition"
                control={control}
                options={conditionOptions}
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
                  className="flex gap-1 text-sm font-medium text-gray-700 md:text-base dark:text-white"
                  htmlFor="image"
                >
                  Upload Image
                </label>

                <input
                  type="file"
                  {...register("image")}
                  onChange={handleFileChange}
                  className="block w-full rounded-lg border-gray-300 text-sm text-raisinblack placeholder-gray-400 shadow-sm focus:border-raisinblack focus:ring-raisinblack md:text-base dark:border-gray-600 dark:placeholder-gray-500 dark:focus:border-gray-500 dark:focus:ring-gray-500"
                  accept="image/*"
                />
                {errors.image && (
                  <p className="mt-1 text-xs text-red-500">
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
                      <XMarkIcon className="size-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input<IClothesModalSchema>
                type="checkbox"
                label="Favorite"
                name="favorited"
                control={control}
                className="flex w-5 items-center gap-2"
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
