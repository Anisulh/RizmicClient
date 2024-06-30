import { Dispatch, SetStateAction, useState } from "react";
import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import OutfitsModal, { IExistingOutfitData } from "./OutfitsModal";
import OutfitCard from "./OutfitCard";
import { IExistingClothesData } from "./ClothesModal";
import { splitCamelCase } from "../../../utils/splitCamelCase";
import { IOutfitsSections } from "../Wardrobe";

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
  outfits: IOutfitsSections | undefined;
  clothes: IExistingClothesData[] | undefined;
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
        {outfits ? (
          Object.keys(outfits).map((key) => {
            return (outfits[key as keyof IOutfitsSections] as []).length > 0 ? (
              <div key={key}>
                <button
                  className="mb-6 flex w-full items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-600"
                  onClick={() =>
                    setShow((prevState) => ({
                      ...prevState,
                      [key]: !show[key as keyof IOutfitsShow],
                    }))
                  }
                >
                  <h2 className="text-xl font-medium">{splitCamelCase(key)}</h2>
                  <div>
                    {show[key as keyof IOutfitsShow] ? (
                      <ChevronLeftIcon className="size-6" />
                    ) : (
                      <ChevronDownIcon className="size-6" />
                    )}
                  </div>
                </button>
                {show[key as keyof IOutfitsShow] && (
                  <div className="grid grid-cols-2 justify-items-center gap-4 lg:grid-cols-4">
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
          })
        ) : (
          <p className="mt-10 w-full text-center text-lg">
            Oh no.... this isn&apos;t looking too good....
          </p>
        )}
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
