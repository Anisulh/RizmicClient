import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import ClothingCard from "../../../components/ClothingCard";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ClothesModal from "./ClothesModal";
import { GroupedClothes } from "../Wardrobe";
interface CategoryOpenState {
  [key: string]: boolean;
}
type ClothesCategory = keyof GroupedClothes;
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
  clothes: GroupedClothes | undefined;
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

  return (
    <>
      <div className="px-4">
        {clothes ? (
          Object.keys(clothes).map((key) => (
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
                <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {(clothes[key as ClothesCategory] as []).map(
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
          ))
        ) : (
          <p className="mt-10 w-full text-center text-lg">
            Oh no.... this isn&apos;t looking too good....
          </p>
        )}
      </div>
      <ClothesModal open={modalOpen} setOpen={setModalOpen} refetch={refetch} />
    </>
  );
}

export default ClothesSection;
