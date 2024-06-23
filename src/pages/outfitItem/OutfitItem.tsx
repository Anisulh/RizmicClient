import React, { useEffect, useState } from "react";
import { IExistingOutfitData } from "../wardrobe/components/OutfitsModal";
import { IExistingClothesData } from "../wardrobe/components/ClothesModal";
import { useNavigate, useParams } from "react-router-dom";
import { getOutfitsById } from "../../api/outfitsAPI";
import Spinner from "../../components/ui/spinner/Spinner";
import { useToast } from "../../contexts/ToastContext";

const OutfitItem = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const { addToast } = useToast();
  const [item, setItem] = useState<IExistingOutfitData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        if (!itemId) {
          throw new Error("No item ID provided");
        }
        const data = await getOutfitsById(itemId);
        setItem(data);
      } catch (error) {
        addToast({ title: "Unable to fetch item", type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemId, addToast]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="content-container max-w-7xl w-full my-10 relative mx-auto">
      {!item ? (
        <div className="min-h-screen flex item-center justify-center">
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
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <div className=" w-full h-full rounded-md grid grid-cols-2 grid-rows-2 gap-5 hover:bg-cambridgeblue hover:opacity-80 transition-all">
                  {item.clothes.map(({ image, category }, index) => {
                    return image ? (
                      <img
                        key={index}
                        className="w-1/5 h-1/5 object-cover"
                        src={image}
                        alt={category}
                      />
                    ) : (
                      <div
                        key={index}
                        className="rounded-lg h-48 bg-gradient-to-tr from-cambridgeblue to-ultramarineBlue"
                      ></div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 md:pl-6">
              <h2 className="text-2xl font-bold mb-4">{item.name}</h2>{" "}
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Number of items:</span>{" "}
                {item.clothes.length}
              </p>
              {item.description && (
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Description:</span>{" "}
                  {item.description}
                </p>
              )}
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Occasion:</span>{" "}
                {item.occasion || "N/A"}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Season:</span>{" "}
                {item.season || "N/A"}
              </p>
              {item.tags && item.tags.length > 0 && (
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Tags:</span>{" "}
                  {item.tags.join(", ")}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Clothes in this Outfit</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    <button className="rounded-lg p-4 cursor-pointer" onClick={handleClick}>
      <div className="flex flex-col items-center">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-auto rounded-lg mb-4"
          />
        ) : (
          <div className=" w-full h-64 rounded-md bg-gradient-to-tr from-cambridgeblue to-ultramarineBlue "></div>
        )}
        <div className=" w-full text-left">
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p className="text-gray-300">Category: {item.category}</p>
          <p className="text-gray-300">Size: {item.size}</p>
        </div>
      </div>
    </button>
  );
};
