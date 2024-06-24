import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import { IClothingData } from "./interface";
import ClothingCard from "../../../components/ClothingCard";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ClothesModal, { IExistingClothesData } from "./ClothesModal";
interface CategoryOpenState {
  [key: string]: boolean;
}
const categories = [
  "t-shirt",
  "jacket",
  "sweater",
  "top",
  "shirt",
  "dress",
  "pants",
  "skirt",
  "shorts",
  "accessories",
];

function ClothesSection({
  clothes,
  refetch,
  modalOpen,
  setModalOpen,
}: {
  clothes: { [key: string]: IExistingClothesData[] };
  refetch: () => void;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [categoryOpen, setCategoryOpen] = useState<CategoryOpenState>({});

  useEffect(() => {
    // Initialize category state to false
    const initialState = categories.reduce(
      (acc: CategoryOpenState, category) => {
        acc[category] = false; // All categories are initially closed
        return acc;
      },
      {},
    );

    setCategoryOpen(initialState);
  }, []);

  const toggleCategory = (category: string) => {
    setCategoryOpen((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  useEffect(() => {
    if (!modalOpen) {
      refetch();
    }
  }, [modalOpen, refetch]);

  return (
    <>
      <div className="px-4">
        {Object.keys(clothes).map((key) => (
          <div key={key}>
            <button
              className="mx-auto mb-6 flex w-full items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-600"
              onClick={() => toggleCategory(key)}
            >
              <h2 className="text-xl font-medium">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </h2>
              <div>
                {categoryOpen[key] ? (
                  <ChevronLeftIcon className="size-6" />
                ) : (
                  <ChevronDownIcon className="size-6" />
                )}
              </div>
            </button>
            {categoryOpen[key] && (
              <div className="grid grid-cols-2 justify-items-center gap-4 lg:grid-cols-4">
                {(clothes[key as keyof IClothingData] as []).map(
                  (item, index) => {
                    return (
                      <ClothingCard item={item} refetch={refetch} key={index} />
                    );
                  },
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <ClothesModal open={modalOpen} setOpen={setModalOpen} refetch={refetch} />
    </>
  );
}

export default ClothesSection;
