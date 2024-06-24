import React from "react";
import { IExistingClothesData } from "../wardrobe/components/ClothesModal";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/ui/spinner/Spinner";
import useFetchOutfitItem from "../../hooks/useFetchOutfitItem";

const OutfitItem = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const { data: item, isPending } = useFetchOutfitItem(itemId);
  if (isPending) {
    return <Spinner />;
  }
  return (
    <div className="content-container relative mx-auto my-10 w-full max-w-7xl">
      {!item ? (
        <div className="item-center flex min-h-screen justify-center">
          <p className="text-xl">
            Looks like we couldn&apos;t find the item you&apos;re looking for $
            {":("}
          </p>
        </div>
      ) : (
        <div className="rounded-lg p-6">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-auto w-full rounded-lg"
                />
              ) : (
                <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-5 rounded-md transition-all hover:bg-cambridgeblue hover:opacity-80">
                  {item.clothes.map(({ image, category }, index) => {
                    return image ? (
                      <img
                        key={index}
                        className="h-1/5 w-1/5 object-cover"
                        src={image}
                        alt={category}
                      />
                    ) : (
                      <div
                        key={index}
                        className="h-48 rounded-lg bg-gradient-to-tr from-cambridgeblue to-ultramarineBlue"
                      ></div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 md:pl-6">
              <h2 className="mb-4 text-2xl font-bold">{item.name}</h2>{" "}
              <p className="mb-2 text-gray-300">
                <span className="font-semibold">Number of items:</span>{" "}
                {item.clothes.length}
              </p>
              {item.description && (
                <p className="mb-2 text-gray-300">
                  <span className="font-semibold">Description:</span>{" "}
                  {item.description}
                </p>
              )}
              <p className="mb-2 text-gray-300">
                <span className="font-semibold">Occasion:</span>{" "}
                {item.occasion || "N/A"}
              </p>
              <p className="mb-2 text-gray-300">
                <span className="font-semibold">Season:</span>{" "}
                {item.season || "N/A"}
              </p>
              {item.tags && item.tags.length > 0 && (
                <p className="mb-2 text-gray-300">
                  <span className="font-semibold">Tags:</span>{" "}
                  {item.tags.join(", ")}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="mb-4 text-xl font-bold">Clothes in this Outfit</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {item.clothes.map((cloth, index) => (
                <ClothingItemCard key={index} item={cloth} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutfitItem;

interface ClothingItemCardProps {
  item: IExistingClothesData;
}

const ClothingItemCard: React.FC<ClothingItemCardProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/clothing/${item._id}`);
  };

  return (
    <button className="cursor-pointer rounded-lg p-4" onClick={handleClick}>
      <div className="flex flex-col items-center">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="mb-4 h-auto w-full rounded-lg"
          />
        ) : (
          <div className="h-64 w-full rounded-md bg-gradient-to-tr from-cambridgeblue to-ultramarineBlue"></div>
        )}
        <div className="w-full text-left">
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p className="text-gray-300">Category: {item.category}</p>
          <p className="text-gray-300">Size: {item.size}</p>
        </div>
      </div>
    </button>
  );
};
