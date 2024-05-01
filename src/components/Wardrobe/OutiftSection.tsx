import { Dispatch, SetStateAction, useState } from "react";
import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import OutfitsModal, { IExistingOutfitData } from "./OutfitsModal";
import OutfitCard from "./OutfitCard";
import { IExistingClothesData } from "./ClothesModal";
import { splitCamelCase } from "../../utils/splitCamelCase";
import { IOutfitsSections } from "../../pages/Wardrobe";

interface IOutfitsShow {
  favorite: boolean;
  all: boolean;
}

function OutfitSection({
  outfits,
  clothes,
  modalOpen,
  setModalOpen,
  refetch,
}: {
  outfits: IOutfitsSections;
  clothes: IExistingClothesData[];
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
}) {
  const [show, setShow] = useState<IOutfitsShow>({
    favorite: false,
    all: false,
  });

  return (
    <>
      <div className="px-4">
        {Object.keys(outfits).map((key) => {
          return (outfits[key as keyof IOutfitsSections] as []).length > 0 ? (
            <div key={key}>
              <button
                className="flex justify-between items-center mb-6 w-full hover:bg-gray-600 py-2 transition-colors rounded-lg"
                onClick={() =>
                  setShow((prevState) => ({
                    ...prevState,
                    [key]: !show[key as keyof IOutfitsShow],
                  }))
                }
              >
                <h2 className="font-medium text-xl">{splitCamelCase(key)}</h2>
                <div>
                  {show[key as keyof IOutfitsShow] ? (
                    <ChevronLeftIcon className="h-6 w-6" />
                  ) : (
                    <ChevronDownIcon className="h-6 w-6" />
                  )}
                </div>
              </button>
              {show[key as keyof IOutfitsShow] && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
                  {(outfits[key as keyof IOutfitsSections] as []).map(
                    (item: IExistingOutfitData) => {
                      return (
                        <OutfitCard
                          clothingItems={clothes}
                          item={item}
                          refetch={refetch}
                          key={item._id}
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

      <OutfitsModal
        clothingItems={clothes}
        open={modalOpen}
        setOpen={setModalOpen}
        refetch={refetch}
      />
    </>
  );
}

export default OutfitSection;
