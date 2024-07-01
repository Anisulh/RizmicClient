import { useNavigate } from "react-router-dom";
import { IExistingOutfitData } from "../pages/wardrobe/components/OutfitsModal";

export default function ViewOnlyOutfitCard({
  outfit,
}: {
  outfit: IExistingOutfitData;
}) {
  const navigate = useNavigate();
  return (
    <div
      key={outfit._id}
      className="relative h-full w-full max-w-56 rounded-lg"
      aria-label="Outfit card view only"
    >
      <div className="h-full w-full">
        <button
          onClick={() => navigate(`/clothing/${outfit._id}`)}
          className="z-0 w-full"
        >
          {outfit.image ? (
            <img
              className="h-56 w-full rounded-md object-cover"
              alt="Outfit"
              src={outfit.image}
            />
          ) : (
            <div className="h-56 w-full rounded-md bg-gradient-to-tr from-cambridgeblue to-ultramarineBlue"></div>
          )}
        </button>
        <div className="my-2 flex w-full justify-between">
          <div className="space-y-1">
            <h3 className="font-medium">{outfit.name}</h3>
            <p className="text-sm text-slate-300">
              {outfit.clothes.length + " "} Pieces
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
