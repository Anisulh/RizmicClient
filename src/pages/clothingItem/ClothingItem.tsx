import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClothesById } from "../../api/clothesAPI";
import Spinner from "../../components/ui/spinner/Spinner";
import { IExistingClothesData } from "../wardrobe/components/ClothesModal";

const ClothingItem = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [item, setItem] = useState<IExistingClothesData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        if (!itemId) {
          throw new Error("No item ID provided");
        }
        const data = await getClothesById(itemId);
        setItem(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

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
                <div className=" w-full h-64 md:h-full rounded-md bg-gradient-to-tr from-cambridgeblue to-ultramarineBlue "></div>
              )}
            </div>
            <div className="w-full md:w-1/2 md:pl-6">
              <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Category:</span> {item.category}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Size:</span> {item.size}
              </p>
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Color:</span> {item.color}
              </p>
              {item.material && (
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Material:</span>{" "}
                  {item.material}
                </p>
              )}
              {item.brand && (
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Brand:</span> {item.brand}
                </p>
              )}
              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Condition:</span>{" "}
                {item.condition}
              </p>
              {item.purchaseDate && (
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Purchase Date:</span>{" "}
                  {format(new Date(item.purchaseDate), "MMMM dd, yyyy")}
                </p>
              )}
              {item.price && (
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Price:</span> $
                  {item.price.toFixed(2)}
                </p>
              )}
              {item.description && (
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Description:</span>{" "}
                  {item.description}
                </p>
              )}
              {item.careInstructions && (
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Care Instructions:</span>{" "}
                  {item.careInstructions}
                </p>
              )}
              {item.tags && item.tags.length > 0 && (
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold">Tags:</span>{" "}
                  {item.tags.join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClothingItem;
