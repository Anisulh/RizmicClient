import { Fragment, useState } from "react";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import ClothesModal, { IExistingClothesData } from "./ClothesModal";
import { Menu, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import {
  deleteClothes,
  favoriteClothes,
  unfavoriteClothes,
} from "../../api/clothesAPI";
import {
  DeleteActiveIcon,
  DeleteInactiveIcon,
  EditActiveIcon,
  EditInactiveIcon,
} from "../Icons";
import { useToast } from "../../contexts/ToastContext";
import { StarIcon } from "@heroicons/react/20/solid";

export default function ClothingCard({
  item,
  refetch,
}: {
  item: IExistingClothesData;
  refetch?: () => void;
}) {
  const { addToast } = useToast();
  const { category, color, image, favorited, _id } = item;
  const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false);
  const { mutate } = useMutation({
    mutationFn: async ({ clothingID }: { clothingID: string }) =>
      await deleteClothes(clothingID),
    onSuccess(data) {
      if (data.message) {
        addToast({
          title: "Something went wrong.",
          description: data.message,
          type: "error",
        });
      } else if (data.id && refetch) {
        refetch();
      }
    },
  });
  const { mutate: favoriteMutation } = useMutation({
    mutationFn: async ({
      clothesId,
      favorite,
    }: {
      clothesId: string;
      favorite: boolean;
    }) =>
      favorite
        ? await unfavoriteClothes(clothesId)
        : favoriteClothes(clothesId),
    onSuccess(data) {
      if (data.message) {
        addToast({
          title: "Something went wrong.",
          description: data.message,
          type: "error",
        });
      } else {
        refetch && refetch();
      }
    },
  });
  const handleDelete = () => {
    if (_id) {
      mutate({ clothingID: _id });
    }
  };
  const handleFavoriting = (favorite: boolean) => {
    if (_id) {
      favoriteMutation({ clothesId: _id, favorite });
    }
  };
  return (
    <>
      <div className="relative w-full" aria-label="Clothing card">
        <div className="h-full w-full relative">
          <button
            className="absolute right-2 top-2 z-10"
            onClick={() => {
              handleFavoriting(favorited);
            }}
          >
            {favorited ? (
              <StarIcon className="h-4 w-4 text-yellow-400 hover:text-yellow-100" />
            ) : (
              <StarIcon className="h-4 w-4 text-transparent hover:text-yellow-100 stroke-white" />
            )}
          </button>
          {image ? (
            <img
              className="object-cover w-full h-64 text-center rounded-md"
              alt="Piece of clothing"
              src={image}
            />
          ) : (
            <div className=" w-full h-64  rounded-md bg-gradient-to-tr from-cambridgeblue to-ultramarineBlue "></div>
          )}

          <div className="flex justify-between w-full mt-1">
            <div>
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              <p className="text-slategrey text-sm">
                Color: {color.charAt(0).toUpperCase() + color.slice(1)}
              </p>
            </div>

            <div>
              <Menu as="div" className="relative inline-block text-right">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium text-raisinblack hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <EllipsisVerticalIcon
                      className="  h-5 w-5 dark:text-white hover:text-ourGrey"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0  w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setEditMenuOpen(true)}
                            className={`${
                              active
                                ? "bg-ultramarineBlue text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <EditActiveIcon
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <EditInactiveIcon
                                className="mr-2 h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                            Edit
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleDelete}
                            className={`${
                              active
                                ? "bg-ultramarineBlue text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <DeleteActiveIcon
                                className="mr-2 h-5 w-5 text-ultramarineBlue"
                                aria-hidden="true"
                              />
                            ) : (
                              <DeleteInactiveIcon
                                className="mr-2 h-5 w-5 text-ultramarineBlue"
                                aria-hidden="true"
                              />
                            )}
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <ClothesModal
        open={editMenuOpen}
        setOpen={setEditMenuOpen}
        existingData={item}
        refetch={refetch}
      />
    </>
  );
}
