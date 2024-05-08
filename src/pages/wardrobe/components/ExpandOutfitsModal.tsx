import { Dispatch, SetStateAction } from "react";
import ClothingCard from "../../../components/ClothingCard";
import { IExistingClothesData } from "./ClothesModal";
import DialogModal from "../../../components/ui/modal/DialogModal";

export default function ExpandOutfitsModal({
  open,
  setOpen,
  name = "Outfit",
  clothes = [],
  refetch,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  name: string | undefined;
  clothes: IExistingClothesData[];
  refetch?: () => void;
}) {
  return (
    <>
      <DialogModal open={open} setOpen={setOpen} title={name}>
        <div className="mt-2 grid md:grid-cols-3 gap-10 overflow-auto">
          {clothes?.length && clothes.length > 0 ? (
            clothes.map((item, index) => {
              return <ClothingCard key={index} item={item} refetch={refetch} />;
            })
          ) : (
            <p>No clothes to choose from</p>
          )}
        </div>
      </DialogModal>
    </>
  );
}
