import { useEffect, useState } from "react";
import ClothesSection from "./components/ClothesSection";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { IExistingClothesData } from "./components/ClothesModal";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/spinner/Spinner";
import { IExistingOutfitData } from "./components/OutfitsModal";
import cn from "../../components/ui/cn";
import { useLocation } from "react-router";
import { useClothes } from "../../hooks/useClothes";
import { useOutfits } from "../../hooks/useOutfits";
import OutfitSection from "./components/OutiftSection";
import useClothesOutfitsSearch from "../../hooks/useClothesOutfitsSearch";

export type GroupedClothes = {
  [key in IExistingClothesData["category"]]?: IExistingClothesData[];
};
export interface IOutfitsSections {
  favoriteOutfits: IExistingOutfitData[];
  allOutfits: IExistingOutfitData[];
}

export default function Wardrobe() {
  const [openTab, setOpenTab] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [showSearch, setShowSearch] = useState<boolean>(false);
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
    refetch: refetchClothes,
  } = useClothes();
  const {
    data: outfits,
    isLoading: isLoadingOutfits,
    refetch: refetchOutfits,
  } = useOutfits();

  const searchResults = useClothesOutfitsSearch(
    clothes,
    outfits,
    searchQuery,
    openTab,
  );

  if (isLoadingClothes || isLoadingOutfits) {
    return <Spinner />;
  }

  return (
    <div className="content-container relative mx-auto my-10 w-full max-w-7xl">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-3xl font-bold md:text-4xl">Wardrobe</h1>
        <Button
          variant="icon"
          icon={
            showSearch ? (
              <XMarkIcon className="size-6 text-red-500" />
            ) : (
              <MagnifyingGlassIcon className="size-6" />
            )
          }
          onClick={() => setShowSearch((prevState) => !prevState)}
        />
      </div>
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
          className="fixed bottom-28 right-8 z-10 rounded-full border-none bg-ultramarineBlue px-4 py-3.5 shadow-md transition-colors hover:bg-cambridgeblue md:right-32"
        >
          <PlusIcon className="size-7" />
        </Button>
      </div>

      {showSearch && (
        <div className="mb-4 flex items-center px-4 md:px-3">
          <input
            type="text"
            placeholder="Search using names or tags"
            className="h-10 w-full flex-1 rounded-lg rounded-r-none border border-slate-300 bg-white px-4 font-medium text-raisinblack focus:border-cambridgeblue focus:outline-none focus:ring-1 focus:ring-cambridgeblue dark:border-slate-700 dark:bg-slate-700 dark:text-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="flex h-10 items-center rounded-lg rounded-l-none border border-slate-300 bg-white px-4 font-medium text-raisinblack focus:border-cambridgeblue focus:outline-none focus:ring-2 focus:ring-cambridgeblue dark:border-slate-700 dark:bg-slate-700 dark:text-gray-200">
            {searchQuery ? (
              <XMarkIcon
                className="size-5 text-red-500"
                onClick={() => {
                  setSearchQuery("");
                }}
              />
            ) : (
              <MagnifyingGlassIcon className="size-5" />
            )}
          </span>
        </div>
      )}

      {searchQuery ? (
        <div className="px-4">
          <h3 className="text-xl font-bold md:text-2xl">Search Results:</h3>
          {openTab === 1 ? (
            <ClothesSection
              clothes={searchResults as GroupedClothes | undefined}
              refetch={refetchClothes}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            />
          ) : (
            <OutfitSection
              outfits={searchResults as IOutfitsSections | undefined}
              clothes={clothes?.unstructuredClothes}
              refetch={refetchOutfits}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            />
          )}
        </div>
      ) : openTab === 1 ? (
        <ClothesSection
          clothes={clothes?.structuredClothes}
          refetch={refetchClothes}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      ) : (
        <OutfitSection
          outfits={outfits}
          clothes={clothes?.unstructuredClothes}
          refetch={refetchOutfits}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
    </div>
  );
}
