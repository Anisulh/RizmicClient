import { useContext, useEffect, useState } from "react";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import ChevronLeftIcon from "@heroicons/react/24/outline/ChevronLeftIcon";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import ClothingCard from "../components/Wardrobe/ClothingCard";
import ClothesModal from "../components/Wardrobe/ClothesModal";
import { IUserContext, UserContext } from "../contexts/UserContext";
import {
  IErrorNotificationParams,
  IStatusContext,
  StatusContext,
} from "../contexts/StatusContext";
import { useQuery } from "@tanstack/react-query";
import { getClothes } from "../api/clothesAPI";
import Spinner from "../components/Spinner";
import { IClothingData } from "../components/Wardrobe/interface";

interface IWardrobe {
  tshirt: IClothingData[];
  jacket: IClothingData[];
  sweater: IClothingData[];
  top: IClothingData[];
  shirt: IClothingData[];
  dress: IClothingData[];
  pants: IClothingData[];
  skirt: IClothingData[];
  shorts: IClothingData[];
}

interface IShowCategory {
  tshirt: boolean;
  jacket: boolean;
  sweater: boolean;
  top: boolean;
  shirt: boolean;
  dress: boolean;
  pants: boolean;
  skirt: boolean;
  shorts: boolean;
}

export default function Wardrobe() {
  const { user } = useContext(UserContext) as IUserContext;
  const { errorNotification, resetStatus } = useContext(
    StatusContext,
  ) as IStatusContext;
  const [error, setError] = useState<IErrorNotificationParams>({
    message: null,
    error: null,
  });
  const [wardrobe, setWardrobe] = useState<IWardrobe>({
    tshirt: [],
    jacket: [],
    sweater: [],
    top: [],
    shirt: [],
    dress: [],
    pants: [],
    skirt: [],
    shorts: [],
  });

  useEffect(() => {
    errorNotification(error);
    return () => {
      resetStatus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
  const { isLoading, refetch } = useQuery({
    queryKey: ["wardrobe"],
    queryFn: async () => {
      const response = await getClothes(user?.token);
      const data = await response?.json();
      if (data?.message) {
        setError({ message: data?.message });
      } else {
        Object.keys(wardrobe).map((wardrobeCategory) => {
          const clothesMatchingCategory = data.filter(
            (item: IClothingData) => item.category === wardrobeCategory,
          );
          setWardrobe((prevState) => ({
            ...prevState,
            [wardrobeCategory]: [...clothesMatchingCategory],
          }));
        });
        return data;
      }
    },
    refetchOnWindowFocus: false,
  });
  const [show, setShow] = useState<IShowCategory>({
    tshirt: false,
    jacket: false,
    sweater: false,
    top: false,
    shirt: false,
    dress: false,
    pants: false,
    skirt: false,
    shorts: false,
  });
  const [clothesModalOpen, setClothesModalOpen] = useState(false);
  useEffect(() => {
    if (!clothesModalOpen) {
      refetch();
    }
  }, [clothesModalOpen, refetch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center content-container mb-10">
      <div className=" max-w-7xl w-full mt-24 relative">
        <div>
          {Object.keys(wardrobe).map((key) => {
            return (wardrobe[key as keyof IWardrobe] as []).length > 0 ? (
              <div key={key}>
                <button
                  className="flex justify-between items-center mb-6 w-full hover:bg-gray-100 py-2 px-2 transition-colors rounded-lg"
                  onClick={() =>
                    setShow((prevState) => ({
                      ...prevState,
                      [key]: !show[key as keyof IShowCategory],
                    }))
                  }
                >
                  <h2 className="font-medium text-xl ml-6">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </h2>
                  <div>
                    {show[key as keyof IShowCategory] ? (
                      <ChevronLeftIcon className="h-6 w-6" />
                    ) : (
                      <ChevronDownIcon className="h-6 w-6" />
                    )}
                  </div>
                </button>
                {show[key as keyof IShowCategory] && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                    {(wardrobe[key as keyof IWardrobe] as []).map(
                      (item, index) => {
                        return (
                          <ClothingCard
                            item={item}
                            refetch={refetch}
                            setError={setError}
                            token={user?.token}
                            key={index}
                          />
                        );
                      },
                    )}
                  </div>
                )}
              </div>
            ) : null;
          })}
        </div>
        <div className="absolute right-20 xl:right-10 bottom-24">
          <button className="fixed" onClick={() => setClothesModalOpen(true)}>
            <PlusIcon className="h-12 w-12 bg-cambridgeblue rounded-full p-3" />
          </button>
        </div>
      </div>
      <ClothesModal open={clothesModalOpen} setOpen={setClothesModalOpen} />
    </div>
  );
}
