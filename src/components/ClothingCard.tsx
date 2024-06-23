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
  unfavoriteClothes,
} from "../api/clothesAPI";
import { EditIcon, ShareIcon, TrashIcon } from "./Icons";
import { useToast } from "../contexts/ToastContext";
import DialogModal from "./ui/modal/DialogModal";
import Button from "./ui/Button";
import { StarIcon } from "@heroicons/react/24/solid";

export default function ClothingCard({
  item,
  refetch,
}: {
  item: IExistingClothesData;
  refetch?: () => void;
}) {
  const { addToast } = useToast();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
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
      <div
        className="relative w-full bg-slate-700 h-64 p-2 rounded-lg"
        aria-label="Clothing card"
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
            <img
              className="w-full object-contain h-48 text-center rounded-md"
              alt="Piece of clothing"
              src={image}
            />
          ) : (
            <div className=" w-full h-48 rounded-md bg-gradient-to-tr from-cambridgeblue to-ultramarineBlue "></div>
          )}

          <div className="flex justify-between w-full mt-2">
            <div>
              <h3>{item.name}</h3>
              <div className="flex items-center gap-2">
                <p className="text-slate-300 text-sm">Color:</p>
                <div
                  className="h-4 w-4 border rounded-md"
                  style={{ background: color }}
                ></div>
              </div>
            </div>

            <div>
              <Menu as="div" className="relative inline-block text-right">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium text-raisinblack hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <EllipsisVerticalIcon
                      className="  h-6 w-6 transition-colors dark:text-white hover:text-ourGrey"
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
                            onClick={async () => {
                              const shareData = {
                                title: "Check out this clothing!",
                                text: "Share this clothing with your friends!",
                                url: `/clothing/${_id}`,
                              };
                              try {
                                await navigator.share(shareData);
                                console.log("Shared successfully");
                              } catch (err) {
                                console.error(err);
                                addToast({
                                  title: "Error sharing",
                                  description:
                                    "An error occurred while trying to share this clothing. The link has been copied to your clipboard.",
                                  type: "info",
                                });
                                navigator.clipboard.writeText(shareData.url);
                              }
                            }}
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
        title="Delete Clothing"
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <p>
            Are you sure you want to delete this clothing? This cannot be
            undone.
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
      <ClothesModal
        open={editMenuOpen}
        setOpen={setEditMenuOpen}
        existingData={item}
        refetch={refetch}
      />
    </>
  );
}
