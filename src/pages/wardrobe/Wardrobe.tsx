import { useEffect, useState } from "react";
import ClothesSection from "./components/ClothesSection";
import { useToast } from "../../contexts/ToastContext";
import { PlusIcon } from "@heroicons/react/20/solid";
import { IExistingClothesData } from "./components/ClothesModal";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/spinner/Spinner";
import { IExistingOutfitData } from "./components/OutfitsModal";
import OutfitSection from "./components/OutiftSection";
import cn from "../../components/ui/cn";
import { useLocation } from "react-router";
import { useClothes } from "../../hooks/useClothes";
import { useOutfits } from "../../hooks/useOutfits";

export type GroupedClothes = {
  [key in IExistingClothesData["category"]]?: IExistingClothesData[];
};
export interface IOutfitsSections {
  favoriteOutfits: IExistingOutfitData[];
  allOutfits: IExistingOutfitData[];
}

export default function Wardrobe() {
  const [openTab, setOpenTab] = useState(1);
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
  const {
    data: clothes,
    isLoading: isLoadingClothes,
    isError: isClothesError,
    error: clothesError,
    refetch: refetchClothes,
  } = useClothes();

  if (isClothesError) {
    addToast({
      title: "Error",
      description: clothesError.message,
      type: "error",
    });
  }

  const {
    data: outfits,
    isError: isOutfitError,
    error: outfitError,
    isLoading: isLoadingOutfits,
    refetch: refetchOutfits,
  } = useOutfits();

  if (isOutfitError) {
    addToast({
      title: "Error",
      description: outfitError.message,
      type: "error",
    });
  }

  if (isLoadingClothes || isLoadingOutfits) {
    return <Spinner />;
  }

  return (
    <div className="content-container relative mx-auto my-10 w-full max-w-7xl">
      <h1 className="ml-4 text-3xl font-bold md:text-4xl">Wardrobe</h1>
      <div className="flex items-center justify-between px-4">
        <ul
          className="my-4 flex w-full items-center justify-center rounded-xl bg-slate-700 px-4 py-1 md:py-3"
          role="tablist"
        >
          <li className="w-full text-center">
            <button
              className={cn(
                "block w-full rounded-lg py-2 text-xs font-bold uppercase leading-normal transition-all md:text-sm",
                openTab === 1 && "bg-slate-800 text-cambridgeblue",
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
          <p className="px-4 text-gray-400">|</p>
          <li className="w-full text-center">
            <button
              className={cn(
                "block w-full rounded-lg py-2 text-xs font-bold uppercase leading-normal transition-all md:text-sm",
                openTab === 2 && "bg-slate-800 text-cambridgeblue",
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
          className="fixed bottom-28 right-8 rounded-full border-none bg-ultramarineBlue px-4 py-3.5 shadow-md transition-colors hover:bg-cambridgeblue md:right-32"
        >
          <PlusIcon className="h-7 w-6" />
        </Button>
      </div>

      {openTab === 1 ? (
        <>
          <ClothesSection
            clothes={clothes?.structuredClothes}
            refetch={refetchClothes}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />
        </>
      ) : (
        <OutfitSection
          outfits={outfits}
          clothes={clothes?.unstructuredClothes}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          refetch={refetchOutfits}
        />
      )}
    </div>
  );
}
