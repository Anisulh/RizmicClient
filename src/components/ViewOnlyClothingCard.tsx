import { useNavigate } from "react-router-dom";
import { IExistingClothesData } from "../pages/wardrobe/components/ClothesModal";

export default function ViewOnlyClothingCard({
  clothe,
}: {
  clothe: IExistingClothesData;
}) {
  const navigate = useNavigate();

  return (
    <div
      key={clothe._id}
      className="relative h-full w-full max-w-56 rounded-lg"
      aria-label="Clothing card"
    >
      <div className="h-full w-full">
        <button
          onClick={() => navigate(`/clothing/${clothe._id}`)}
          className="z-0 w-full"
        >
          {clothe.image ? (
            <img
              className="h-56 w-full rounded-md object-cover"
              alt="Piece of clothing"
              src={clothe.image}
            />
          ) : (
            <div className="h-56 w-full rounded-md bg-gradient-to-tr from-cambridgeblue to-ultramarineBlue"></div>
          )}
        </button>
        <div className="my-2 flex w-full justify-between">
          <div className="space-y-1">
            <h3>{clothe.name}</h3>
            <div className="flex items-center gap-2">
              <p className="text-sm text-slate-300">Color:</p>
              <div
                className="size-4 rounded-md border"
                style={{
                  background: clothe.color,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
