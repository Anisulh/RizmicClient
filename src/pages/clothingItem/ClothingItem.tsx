import { format } from "date-fns";
import { useParams } from "react-router-dom";
import Spinner from "../../components/ui/spinner/Spinner";
import useFetchClothingItem from "../../hooks/useFetchClothingItem";

const ClothingItem = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const { data: item, isPending } = useFetchClothingItem(itemId);

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
                <div className="h-64 w-full rounded-md bg-gradient-to-tr from-cambridgeblue to-ultramarineBlue md:h-full"></div>
              )}
            </div>
            <div className="w-full md:w-1/2 md:pl-6">
              <h2 className="mb-4 text-2xl font-bold">{item.name}</h2>
              <p className="mb-2 text-gray-300">
                <span className="font-semibold">Category:</span> {item.category}
              </p>
              <p className="mb-2 text-gray-300">
                <span className="font-semibold">Size:</span> {item.size}
              </p>
              <p className="mb-2 text-gray-300">
                <span className="font-semibold">Color:</span> {item.color}
              </p>
              {item.material && (
                <p className="mb-2 text-gray-300">
                  <span className="font-semibold">Material:</span>{" "}
                  {item.material}
                </p>
              )}
              {item.brand && (
                <p className="mb-2 text-gray-300">
                  <span className="font-semibold">Brand:</span> {item.brand}
                </p>
              )}
              <p className="mb-2 text-gray-300">
                <span className="font-semibold">Condition:</span>{" "}
                {item.condition}
              </p>
              {item.purchaseDate && (
                <p className="mb-2 text-gray-300">
                  <span className="font-semibold">Purchase Date:</span>{" "}
                  {format(new Date(item.purchaseDate), "MMMM dd, yyyy")}
                </p>
              )}
              {item.price && (
                <p className="mb-2 text-gray-300">
                  <span className="font-semibold">Price:</span> $
                  {item.price.toFixed(2)}
                </p>
              )}
              {item.description && (
                <p className="mb-2 text-gray-300">
                  <span className="font-semibold">Description:</span>{" "}
                  {item.description}
                </p>
              )}
              {item.careInstructions && (
                <p className="mb-2 text-gray-300">
                  <span className="font-semibold">Care Instructions:</span>{" "}
                  {item.careInstructions}
                </p>
              )}
              {item.tags && item.tags.length > 0 && (
                <p className="mb-2 text-gray-300">
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
