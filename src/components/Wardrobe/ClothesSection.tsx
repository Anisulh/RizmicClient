import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import Spinner from "../ui/spinner/Spinner";
import { IClothingData, IShowCategory, IWardrobe } from "./interface";
import ClothingCard from "./ClothingCard";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ClothesModal from "./ClothesModal";

function ClothesSection({
  clothes,
  refetch,
  isLoading,
  modalOpen,
  setModalOpen,
}: {
  clothes: IClothingData[];
  refetch: () => void;
  isLoading: boolean;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [wardrobe, setWardrobe] = useState<IWardrobe>({
    tshirt: [],
    jacket: [],
    sweater: [],
    top: [],
    shirt: [],
    dress: [],
    pants: [],
    skirt: [],
    shorts: [],
  });
  useEffect(() => {
    Object.keys(wardrobe).map((wardrobeCategory) => {
      const matchingCategory = clothes.filter(
        (item: IClothingData) => item.category === wardrobeCategory,
      );
      setWardrobe((prevState) => ({
        ...prevState,
        [wardrobeCategory]: [...matchingCategory],
      }));
    });
  }, [clothes]);

  const [show, setShow] = useState<IShowCategory>({
    tshirt: false,
    jacket: false,
    sweater: false,
    top: false,
    shirt: false,
    dress: false,
    pants: false,
    skirt: false,
    shorts: false,
  });

  useEffect(() => {
    if (!modalOpen) {
      refetch();
    }
  }, [modalOpen, refetch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div>
        {Object.keys(wardrobe).map((key) => {
          return (wardrobe[key as keyof IWardrobe] as []).length > 0 ? (
            <div key={key}>
              <button
                className="flex justify-between items-center mb-6 w-full hover:bg-gray-100 py-2 px-2 transition-colors rounded-lg"
                onClick={() =>
                  setShow((prevState) => ({
                    ...prevState,
                    [key]: !show[key as keyof IShowCategory],
                  }))
                }
              >
                <h2 className="font-medium text-xl ml-6">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h2>
                <div>
                  {show[key as keyof IShowCategory] ? (
                    <ChevronLeftIcon className="h-6 w-6" />
                  ) : (
                    <ChevronDownIcon className="h-6 w-6" />
                  )}
                </div>
              </button>
              {show[key as keyof IShowCategory] && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                  {(wardrobe[key as keyof IWardrobe] as []).map(
                    (item, index) => {
                      return (
                        <ClothingCard
                          item={item}
                          refetch={refetch}
                          key={index}
                        />
                      );
                    },
                  )}
                </div>
              )}
            </div>
          ) : null;
        })}
      </div>
      <ClothesModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}

export default ClothesSection;
