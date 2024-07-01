import { Fragment, useState } from "react";
import OutfitsModal, { IExistingOutfitData } from "./OutfitsModal";
import { Menu, Transition } from "@headlessui/react";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import {
  deleteOutfits,
  favoriteOutfits,
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
import { useNavigate } from "react-router-dom";
import { shareOutfitsWithFriends } from "../../../api/friendsAPI";
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
  clothingItems: IExistingClothesData[] | undefined;
}) {
  const { addToast } = useToast();
  const navigate = useNavigate();
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
    }) => await shareOutfitsWithFriends(outfitId, userId),
    onSuccess(data) {
      addToast({
        title: "Success",
        description: data.message || "Outfit shared successfully.",
        type: "success",
      });
    },
    onError(error) {
      addToast({
        title: "Unable to share outfit",
        type: "error",
        description: error.message || "Something went wrong.",
      });
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
      <div className="relative w-full shadow-sm" aria-label="Outfit card">
        <div className="relative h-full w-full">
          <button
            className="absolute right-2 top-2 z-10"
            onClick={() => {
              handleFavoriting(favorited);
            }}
          >
            {favorited ? (
              <StarIcon className="size-4 text-yellow-400 hover:text-yellow-100" />
            ) : (
              <StarIcon className="size-4 stroke-white text-transparent hover:text-yellow-100" />
            )}
          </button>
          <button className="w-full" onClick={() => navigate(`/outfit/${_id}`)}>
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
                  className="h-64 w-full rounded-md object-cover text-center"
                  alt="Piece of clothing"
                  src={image}
                />
              </div>
            ) : (
              <div
                className="grid h-64 w-full grid-cols-2 grid-rows-2 gap-2 rounded-md transition-all hover:bg-cambridgeblue hover:opacity-80"
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
                      className="h-1/5 w-1/5 object-cover"
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
          </button>

          <div className="mt-1 flex w-full justify-between">
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-slategrey">
                {clothes.length + " "} Pieces
              </p>
            </div>

            <div>
              <Menu as="div" className="relative inline-block text-right">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium text-raisinblack hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <EllipsisVerticalIcon
                      className="size-6 hover:text-ourGrey dark:text-white"
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
                  <Menu.Items className="absolute right-0 z-20 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-600 dark:text-gray-200">
                    <div className="px-1 py-1">
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
                              className="mr-2 size-5 transition-colors"
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
                              active && "bg-ultramarineBlue"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
                          >
                            <ShareIcon
                              active={active}
                              className="mr-2 size-5 text-ultramarineBlue transition-colors"
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
                              className="mr-2 size-5 text-ultramarineBlue transition-colors"
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
          <div className="flex w-full items-center justify-between">
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
