import { useEffect, useState } from "react";
import ClothesSection from "./components/ClothesSection";
import { useQuery } from "@tanstack/react-query";
import { getClothes } from "../../api/clothesAPI";
import { useToast } from "../../contexts/ToastContext";
import { PlusIcon } from "@heroicons/react/20/solid";
import { IExistingClothesData } from "./components/ClothesModal";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/spinner/Spinner";
import { IExistingOutfitData } from "./components/OutfitsModal";
import { getOutfits } from "../../api/outfitsAPI";
import OutfitSection from "./components/OutiftSection";
import cn from "../../components/ui/cn";
import { useLocation } from "react-router";

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
  const location = useLocation();

  useEffect(() => {
    const handleQueryParams = () => {
      const params = new URLSearchParams(location.search);
      const tab = params.get("tab");
      const action = params.get("action");

      if (tab === "outfits") {
        setOpenTab(2);
      } else {
        setOpenTab(1);
      }

      if (action === "add") {
        setModalOpen(true);
      }
    };

    handleQueryParams();
  }, [location.search]);
  const { isLoading: isLoadingClothes, refetch: refetchClothes } = useQuery({
    queryKey: ["clothes"],
    queryFn: async () => {
      const data = await getClothes();
      if (data?.message) {
        addToast({
          title: "Something went wrong.",
          description: "Unable to fetch clothes",
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
          description: "Unable to fetch outfits",
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
    <div className="content-container max-w-7xl w-full my-10 relative mx-auto">
      <h1 className="text-4xl font-bold ml-4">Wardrobe</h1>
      <div className="flex items-center justify-between px-4">
        <ul
          className="flex items-center py-1 md:py-3 bg-slate-700 w-full justify-center rounded-xl px-4 my-4"
          role="tablist"
        >
          <li className=" text-center w-full">
            <button
              className={cn(
                "text-xs md:text-sm font-bold uppercase py-2  block leading-normal w-full rounded-lg transition-all",
                openTab === 1 && "text-cambridgeblue  bg-slate-800",
              )}
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
          <p className="text-gray-400 px-4">|</p>
          <li className="text-center w-full">
            <button
              className={cn(
                "text-xs md:text-sm font-bold uppercase py-2 block leading-normal w-full rounded-lg transition-all",
                openTab === 2 && "text-cambridgeblue  bg-slate-800",
              )}
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
          onClick={() => setModalOpen(true)}
          className="px-4 py-3.5 hover:bg-cambridgeblue fixed bottom-28 right-8 md:right-32 rounded-full bg-ultramarineBlue border-none transition-colors"
        >
          <PlusIcon className="h-7 w-6" />
        </Button>
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
