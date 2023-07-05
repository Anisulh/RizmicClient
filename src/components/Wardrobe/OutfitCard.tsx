import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { IErrorNotificationParams } from "../../contexts/StatusContext";
import { IClothingData } from "./interface";
import OutfitsModal from "./OutfitsModal";
import { Menu, Transition } from "@headlessui/react";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import {
  deleteOutfits,
  favoriteOutfits,
  unfavoriteOutfits,
} from "../../api/outfitsAPI";
import { useMutation } from "@tanstack/react-query";
import {
  DeleteActiveIcon,
  DeleteInactiveIcon,
  EditActiveIcon,
  EditInactiveIcon,
} from "../Icons";
import { StarIcon } from "@heroicons/react/20/solid";
import ExpandOutfitsModal from "./ExpandOutfitsModal";
export interface IOutfitData {
  _id: string;
  coverImg?: string;
  name?: string;
  clothes: IClothingData[];
  favorited: boolean;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

function OutfitCard({
  item,
  setError,
  refetch,
  clothingItems,
}: {
  item: IOutfitData;
  setError: Dispatch<SetStateAction<IErrorNotificationParams>>;
  refetch: () => void;
  clothingItems: IClothingData[];
}) {
  const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false);
  const [expandModal, setExpandModal] = useState<boolean>(false);
  const { coverImg, clothes, favorited, name, _id } = item;
  const { mutate: deleteMutation } = useMutation({
    mutationFn: async ({ outfitID }: { outfitID: string }) =>
      await deleteOutfits(outfitID),
    onSuccess(data) {
      if (data.message) {
        setError({ message: data.message });
      } else if (data.id) {
        refetch();
      }
    },
  });
  const { mutate: favoriteMutation } = useMutation({
    mutationFn: async ({
      outfitID,
      favorite,
    }: {
      outfitID: string;
      favorite: boolean;
    }) =>
      favorite ? await unfavoriteOutfits(outfitID) : favoriteOutfits(outfitID),
    onSuccess(data) {
      if (data.message) {
        setError({ message: data.message });
      } else if (data.outfit) {
        refetch();
      }
    },
  });
  const handleDelete = () => {
    if (_id) {
      deleteMutation({ outfitID: _id });
    }
  };
  const handleFavoriting = (favorite: boolean) => {
    if (_id) {
      favoriteMutation({ outfitID: _id, favorite });
    }
  };
  return (
    <>
      <div className="relative" aria-label="Oufit card">
        <div className="h-80 w-64 relative">
          <button
            className="absolute right-2 top-2 z-10"
            onClick={() => {
              handleFavoriting(favorited);
            }}
          >
            {favorited ? (
              <StarIcon className="h-4 w-4 text-yellow-400 hover:text-yellow-100" />
            ) : (
              <StarIcon className="h-4 w-4 text-transparent hover:text-yellow-100" />
            )}
          </button>

          {coverImg ? (
            <div
              onClick={() => setExpandModal(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpandModal(true);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <img
                className="object-cover w-full h-64 text-center rounded-md"
                alt="Piece of clothing"
                src={coverImg}
              />
            </div>
          ) : (
            <div
              className=" w-full h-64  rounded-md grid grid-cols-2 grid-rows-2 gap-5 hover:bg-cambridgeblue hover:opacity-80 transition-all"
              onClick={() => setExpandModal(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpandModal(true);
                }
              }}
              role="button"
              tabIndex={0}
            >
              {clothes.map(({ image, variant }, index) => {
                return image ? (
                  <img
                    key={index}
                    className="w-1/5 h-1/5 object-cover"
                    src={image}
                    alt={variant}
                  />
                ) : (
                  <div
                    key={index}
                    className="rounded-lg bg-gradient-to-tr from-cambridgeblue to-ultramarineBlue"
                  ></div>
                );
              })}
            </div>
          )}

          <div className="flex justify-between w-full mt-1">
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-slategrey text-sm">
                {clothes.length + " "} Pieces
              </p>
            </div>

            <div>
              <Menu as="div" className="relative inline-block text-right">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium text-raisinblack hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <EllipsisVerticalIcon
                      className="h-6 w-6  hover:text-ourGrey"
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
      <ExpandOutfitsModal
        open={expandModal}
        setError={setError}
        setOpen={setExpandModal}
        name={item.name}
        clothes={item.clothes}
        refetch={refetch}
      />
      <OutfitsModal
        open={editMenuOpen}
        setError={setError}
        setOpen={setEditMenuOpen}
        existingData={item}
        refetch={refetch}
        clothingItems={clothingItems}
      />
    </>
  );
}

export default OutfitCard;
