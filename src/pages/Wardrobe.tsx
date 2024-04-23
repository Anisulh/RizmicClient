import { useState } from "react";
import ClothesSection from "../components/Wardrobe/ClothesSection";
import OutiftSection from "../components/Wardrobe/OutiftSection";
import { useQuery } from "@tanstack/react-query";
import { getClothes } from "../api/clothesAPI";
import { IClothingData } from "../components/Wardrobe/interface";
import { useToast } from "../contexts/ToastContext";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function Wardrobe() {
  const [openTab, setOpenTab] = useState(1);
  const [clothes, setClothes] = useState<IClothingData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useToast();
  const { isLoading, refetch } = useQuery({
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
        setClothes(data);
        return data;
      }
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="content-container max-w-7xl w-full mb-10 relative mx-auto">
      <div className="flex items-center justify-between">
        <ul className="flex items-center pt-3 pb-4" role="tablist">
          <li className=" mr-2 text-center">
            <button
              className={
                "text-xs font-bold uppercase px-5 py-3 block leading-normal " +
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
                "text-xs font-bold uppercase px-5 py-3 block leading-normal " +
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

        <button
          className="flex items-center bg-ultramarineBlue text-white hover:bg-cambridgeblue hover:text-black rounded-lg px-2 py-1 transition-all"
          onClick={() => setModalOpen(true)}
        >
          Add item
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>

      {openTab === 1 ? (
        <>
          <ClothesSection
            clothes={clothes}
            isLoading={isLoading}
            refetch={refetch}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />
        </>
      ) : (
        <OutiftSection
          clothes={clothes}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
    </div>
  );
}
