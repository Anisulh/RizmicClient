import { Dispatch, Fragment, SetStateAction, useState } from "react";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import ClothesModal from "./ClothesModal";
import { Menu, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { deleteClothes } from "../../api/clothesAPI";
import { IErrorNotificationParams } from "../../contexts/StatusContext";
import { IClothingData } from "./interface";
import {
  DeleteActiveIcon,
  DeleteInactiveIcon,
  EditActiveIcon,
  EditInactiveIcon,
} from "../Icons";

export default function ClothingCard({
  item,
  setError,
  refetch,
}: {
  item: IClothingData;
  setError: Dispatch<SetStateAction<IErrorNotificationParams>>;
  refetch?: () => void;
}) {
  const { variant, color, image, _id } = item;
  const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false);
  const { mutate } = useMutation({
    mutationFn: async ({
      clothingID
    }: {
      clothingID: string;
    }) => await deleteClothes(clothingID),
    onSuccess(data) {
      if (data.message) {
        setError({ message: data.message });
      } else if (data.id && refetch) {
        refetch();
      }
    },
  });
  const handleDelete = () => {
    if ( _id) {
      mutate({ clothingID: _id });
    }
  };

  return (
    <>
      <div className="relative">
        <div className="h-80 w-64 relative">
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
              <h3>{variant.charAt(0).toUpperCase() + variant.slice(1)}</h3>
              <p className="text-slategrey text-sm">
                Color: {color.charAt(0).toUpperCase() + color.slice(1)}
              </p>
            </div>

            <div>
              <Menu as="div" className="relative inline-block text-right">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium text-raisinblack hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <EllipsisVerticalIcon
                      className="  h-5 w-5  hover:text-ourGrey"
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
