import { Fragment, useState } from "react";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import ClothesModal, {
  IExistingClothesData,
} from "../pages/wardrobe/components/ClothesModal";
import { Menu, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import {
  deleteClothes,
  favoriteClothes,
  shareClothes,
  unfavoriteClothes,
} from "../api/clothesAPI";
import { EditIcon, ShareIcon, TrashIcon } from "./Icons";
import { useToast } from "../contexts/ToastContext";
import DialogModal from "./ui/modal/DialogModal";
import Button from "./ui/Button";
import { StarIcon } from "@heroicons/react/24/solid";
import ShareModal from "./ui/modal/ShareModal";
import { useNavigate } from "react-router-dom";

export default function ClothingCard({
  item,
  refetch,
}: {
  item: IExistingClothesData;
  refetch?: () => void;
}) {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const { color, image, favorited, _id } = item;
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
        : await favoriteClothes(clothesId),
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

  const { mutate: shareMutation } = useMutation({
    mutationFn: async ({
      clothesId,
      userId,
    }: {
      clothesId: string;
      userId: string[];
    }) => await shareClothes(clothesId, userId),
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
      mutate({ clothingID: _id });
    }
  };
  const handleFavoriting = (favorite: boolean) => {
    if (_id) {
      favoriteMutation({ clothesId: _id, favorite });
    }
  };
  const handleShare = (userIds?: string[]) => {
    if (_id && userIds) {
      shareMutation({ clothesId: _id, userId: userIds });
    }
    return;
  };
  return (
    <>
      <div
        className="relative h-64 w-full rounded-lg bg-slate-700 p-2"
        aria-label="Clothing card"
      >
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
          <button
            onClick={() => navigate(`/clothing/${_id}`)}
            className="w-full"
          >
            {image ? (
              <img
                className="h-48 w-full rounded-md object-contain text-center"
                alt="Piece of clothing"
                src={image}
              />
            ) : (
              <div className="h-48 w-full rounded-md bg-gradient-to-tr from-cambridgeblue to-ultramarineBlue"></div>
            )}
          </button>
          <div className="mt-2 flex w-full justify-between">
            <div>
              <h3>{item.name}</h3>
              <div className="flex items-center gap-2">
                <p className="text-sm text-slate-300">Color:</p>
                <div
                  className="size-4 rounded-md border"
                  style={{ background: color }}
                ></div>
              </div>
            </div>

            <div>
              <Menu as="div" className="relative inline-block text-right">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium text-raisinblack hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <EllipsisVerticalIcon
                      className="size-6 transition-colors hover:text-ourGrey dark:text-white"
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
        title="Delete Clothing"
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <p>
            Are you sure you want to delete this clothing? This cannot be
            undone.
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
      <ShareModal
        open={shareModalOpen}
        setOpen={setShareModalOpen}
        url={`${window.location.origin}/clothing/${_id}`}
        handleShare={handleShare}
      />
      <ClothesModal
        open={editMenuOpen}
        setOpen={setEditMenuOpen}
        existingData={item}
        refetch={refetch}
      />
    </>
  );
}
