import { useState } from "react";
import ClothesSection from "../components/Wardrobe/ClothesSection";
import { useQuery } from "@tanstack/react-query";
import { getClothes } from "../api/clothesAPI";
import { useToast } from "../contexts/ToastContext";
import { PlusIcon } from "@heroicons/react/20/solid";
import { IExistingClothesData } from "../components/Wardrobe/ClothesModal";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/spinner/Spinner";
import { IExistingOutfitData } from "../components/Wardrobe/OutfitsModal";
import { getOutfits } from "../api/outfitsAPI";
import OutfitSection from "../components/Wardrobe/OutiftSection";

type GroupedClothes = {
  [key in IExistingClothesData["category"]]?: IExistingClothesData[];
};
export interface IOutfitsSections {
  favoriteOutfits: IExistingOutfitData[];
  allOutfits: IExistingOutfitData[];
}

export default function Wardrobe() {
  const [openTab, setOpenTab] = useState(1);
  const [structuredClothes, setStructuredClothes] = useState<{
    [key: string]: IExistingClothesData[];
  }>({});
  const [unstructuredClothes, setUnstructuredClothes] = useState<
    IExistingClothesData[]
  >([]);
  const [outfits, setOutfits] = useState<IOutfitsSections>({
    favoriteOutfits: [],
    allOutfits: [],
  });
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useToast();
  const { isLoading: isLoadingClothes, refetch: refetchClothes } = useQuery({
    queryKey: ["clothes"],
    queryFn: async () => {
      const data = await getClothes();
      if (data?.message) {
        addToast({
          title: "Something went wrong.",
          description: data?.message,
          type: "error",
        });
      } else {
        setUnstructuredClothes(data);
        const groupedByCategory = data.reduce(
          (acc: GroupedClothes, cloth: IExistingClothesData) => {
            const categoryArray = acc[cloth.category] || [];
            categoryArray.push(cloth);
            acc[cloth.category] = categoryArray;

            return acc;
          },
          {},
        );
        setStructuredClothes(groupedByCategory);
        return data;
      }
    },
    refetchOnWindowFocus: false,
  });
  const { isLoading: isLoadingOutfits, refetch: refetchOutfits } = useQuery({
    queryKey: ["outfits"],
    queryFn: async () => {
      const data = await getOutfits();
      if (data?.message) {
        addToast({
          title: "Something went wrong.",
          description: data?.message,
          type: "error",
        });
      } else {
        const tempFav: IExistingOutfitData[] = [];
        data.outfits.map((item: IExistingOutfitData) => {
          if (item.favorited) {
            tempFav.push(item);
          }
        });
        setOutfits({
          favoriteOutfits: tempFav,
          allOutfits: data.outfits,
        });
        return data;
      }
    },
    refetchOnWindowFocus: false,
  });

  if (isLoadingClothes || isLoadingOutfits) {
    return <Spinner />;
  }

  return (
    <div className="content-container max-w-7xl w-full mb-10 relative mx-auto">
      <div className="flex items-center justify-between px-4">
        <ul className="flex items-center pt-3 pb-4" role="tablist">
          <li className=" mr-2 text-center">
            <button
              className={
                "text-xs font-bold uppercase pr-5 py-3 block leading-normal " +
                (openTab === 1 && "text-cambridgeblue")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              role="tablist"
            >
              Clothes
            </button>
          </li>
          <p className="text-gray-400">|</p>
          <li className=" mr-2 text-center">
            <button
              className={
                "text-xs font-bold uppercase pl-5 py-3 block leading-normal " +
                (openTab === 2 && "text-cambridgeblue")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              role="tablist"
            >
              Outfits
            </button>
          </li>
        </ul>

        <Button
          variant="textWithIcon"
          icon={<PlusIcon className="h-6 w-6" />}
          onClick={() => setModalOpen(true)}
          className="p-2 hover:bg-cambridgeblue"
        >
          Add Item
        </Button>

        {/* <button
          className="flex items-center bg-ultramarineBlue text-white hover:bg-cambridgeblue hover:text-black rounded-lg px-2 py-1 transition-all"
          onClick={() => setModalOpen(true)}
        >
          Add item
          <PlusIcon className="h-6 w-6" />
        </button> */}
      </div>

      {openTab === 1 ? (
        <>
          <ClothesSection
            clothes={structuredClothes}
            refetch={refetchClothes}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />
        </>
      ) : (
        <OutfitSection
          outfits={outfits}
          clothes={unstructuredClothes}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          refetch={refetchOutfits}
        />
      )}
    </div>
  );
}
