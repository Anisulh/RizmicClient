import { useEffect, useState } from "react";
import { useToast } from "../../contexts/ToastContext";
import { useQuery } from "@tanstack/react-query";
import { getOutfits } from "../../api/outfitsAPI";
import Spinner from "../Spinner";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import OutfitsModal from "./OutfitsModal";
import OutfitCard, { IOutfitData } from "./OutfitCard";
import { IClothingData } from "./interface";

interface IOutfitsSections {
  favoriteOutfits: IOutfitData[];
  allOutfits: IOutfitData[];
}
interface IOutfitsShow {
  favorite: boolean;
  all: boolean;
}

function OutiftSection({
  clothes,
}: {
  clothes: IClothingData[];
}) {
  const {addToast} = useToast();
  const [outfits, setOutfits] = useState<IOutfitsSections>({
    favoriteOutfits: [],
    allOutfits: [],
  });
  const [show, setShow] = useState<IOutfitsShow>({
    favorite: false,
    all: false,
  });
  const [clothesModalOpen, setClothesModalOpen] = useState(false);

  const { isLoading, refetch } = useQuery({
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
        const tempFav: IOutfitData[] = [];
        data.outfits.map((item: IOutfitData) => {
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
  useEffect(() => {
    if (!clothesModalOpen) {
      refetch();
    }
  }, [clothesModalOpen, refetch]);

  function splitCamelCase(str: string) {
    // Add space before all capital letters and make everything lowercase
    str = str.replace(/([A-Z])/g, " $1").toLowerCase();

    // Capitalize the first letter of each word
    str = str.replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });

    return str;
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      {Object.keys(outfits).map((key) => {
        return (outfits[key as keyof IOutfitsSections] as []).length > 0 ? (
          <div key={key}>
            <button
              className="flex justify-between items-center mb-6 w-full hover:bg-gray-100 py-2 px-2 transition-colors rounded-lg"
              onClick={() =>
                setShow((prevState) => ({
                  ...prevState,
                  [key]: !show[key as keyof IOutfitsShow],
                }))
              }
            >
              <h2 className="font-medium text-xl ml-6">
                {splitCamelCase(key)}
              </h2>
              <div>
                {show[key as keyof IOutfitsShow] ? (
                  <ChevronLeftIcon className="h-6 w-6" />
                ) : (
                  <ChevronDownIcon className="h-6 w-6" />
                )}
              </div>
            </button>
            {show[key as keyof IOutfitsShow] && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                {(outfits[key as keyof IOutfitsSections] as []).map(
                  (item: IOutfitData) => {
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
      <div className="absolute right-20 xl:right-10 bottom-24">
        <button className="fixed" onClick={() => setClothesModalOpen(true)}>
          <PlusIcon className="h-12 w-12 bg-cambridgeblue rounded-full p-3 hover:bg-ultramarineBlue hover:text-white transition-all" />
        </button>
      </div>
      <OutfitsModal
        clothingItems={clothes}
        open={clothesModalOpen}
        setOpen={setClothesModalOpen}
        refetch={refetch}
      />
    </>
  );
}

export default OutiftSection;
