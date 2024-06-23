import { Fragment, useState } from "react";
import OutfitsModal, { IExistingOutfitData } from "./OutfitsModal";
import { Menu, Transition } from "@headlessui/react";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import {
  deleteOutfits,
  favoriteOutfits,
  shareOutfits,
  unfavoriteOutfits,
} from "../../../api/outfitsAPI";
import { useMutation } from "@tanstack/react-query";
import { EditIcon, ShareIcon, TrashIcon } from "../../../components/Icons";
import { StarIcon } from "@heroicons/react/20/solid";
import ExpandOutfitsModal from "./ExpandOutfitsModal";
import { useToast } from "../../../contexts/ToastContext";
import { IExistingClothesData } from "./ClothesModal";
import DialogModal from "../../../components/ui/modal/DialogModal";
import Button from "../../../components/ui/Button";
import ShareModal from "../../../components/ui/modal/ShareModal";
export interface IOutfitData {
  _id: string;
  image?: string;
  name?: string;
  clothes: IExistingClothesData[];
  favorited: boolean;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

function OutfitCard({
  item,
  refetch,
  clothingItems,
}: {
  item: IExistingOutfitData;
  refetch: () => void;
  clothingItems: IExistingClothesData[];
}) {
  const { addToast } = useToast();
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false);
  const [expandModal, setExpandModal] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const { image, clothes, favorited, name, _id } = item;
  const { mutate: deleteMutation } = useMutation({
    mutationFn: async ({ outfitID }: { outfitID: string }) =>
      await deleteOutfits(outfitID),
    onSuccess(data) {
      if (data.message) {
        addToast({
          title: "Something went wrong.",
          description: data.message,
          type: "error",
        });
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
        addToast({
          title: "Something went wrong.",
          description: data.message,
          type: "error",
        });
      } else if (data.outfit) {
        refetch();
      }
    },
  });
  const { mutate: shareMutation } = useMutation({
    mutationFn: async ({
      outfitId,
      userId,
    }: {
      outfitId: string;
      userId: string[];
    }) => await shareOutfits(outfitId, userId),
    onSuccess(data) {
      if (data.message) {
        addToast({
          title: "Something went wrong.",
          description: data.message,
          type: "error",
        });
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
  const handleShare = async (userId: string[]) => {
    if (_id) {
      try {
        shareMutation({ outfitId: _id, userId });
      } catch (error) {
        addToast({
          title: "Unable to share outfit",
          type: "error",
        });
      }
    }
  };
  return (
    <>
      <div
        className="relative w-full bg-slate-700 p-2 rounded-lg"
        aria-label="Outfit card"
      >
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
                src={image}
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
              {clothes.map(({ image, category }, index) => {
                return image ? (
                  <img
                    key={index}
                    className="w-1/5 h-1/5 object-cover"
                    src={image}
                    alt={category}
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
                      className="h-6 w-6  dark:text-white hover:text-ourGrey"
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
                  <Menu.Items className="absolute right-0  w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-600 dark:text-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setEditMenuOpen(true)}
                            className={`${
                              active && "bg-ultramarineBlue"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
                          >
                            <EditIcon
                              active={active}
                              className="mr-2 h-5 w-5 transition-colors"
                            />
                            Edit
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setShareModalOpen(true)}
                            className={`${
                              active && "bg-ultramarineBlue "
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
                          >
                            <ShareIcon
                              active={active}
                              className="mr-2 h-5 w-5 transition-colors text-ultramarineBlue"
                            />
                            Share
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setDeleteModalOpen(true)}
                            className={`${
                              active && "bg-ultramarineBlue"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
                          >
                            <TrashIcon
                              active={active}
                              className="mr-2 h-5 w-5 transition-colors text-ultramarineBlue"
                            />
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
      <DialogModal
        title="Delete Outfit"
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <p>
            Are you sure you want to delete this outfit? Anyone you&apos;ve
            shared this with will not be able to view it once deleted. This
            cannot be undone.
          </p>
          <div className="flex justify-between items-center w-full">
            <Button
              variant="destructive"
              onClick={() => {
                handleDelete();
                setDeleteModalOpen(false);
              }}
            >
              Yes
            </Button>
            <Button onClick={() => setDeleteModalOpen(false)}>No</Button>
          </div>
        </div>
      </DialogModal>
      <ExpandOutfitsModal
        open={expandModal}
        setOpen={setExpandModal}
        name={item.name}
        clothes={item.clothes}
        refetch={refetch}
      />
      <ShareModal
        open={shareModalOpen}
        setOpen={setShareModalOpen}
        url={`${window.location.origin}/outfit/${_id}`}
        handleShare={handleShare}
      />
      <OutfitsModal
        open={editMenuOpen}
        setOpen={setEditMenuOpen}
        existingData={item}
        refetch={refetch}
        clothingItems={clothingItems}
      />
    </>
  );
}

export default OutfitCard;
