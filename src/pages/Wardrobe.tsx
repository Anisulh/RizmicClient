import { useContext, useEffect, useState } from "react";
import ClothesSection from "../components/Wardrobe/ClothesSection";
import OutiftSection from "../components/Wardrobe/OutiftSection";
import { IUserContext, UserContext } from "../contexts/UserContext";
import { IErrorNotificationParams, IStatusContext, StatusContext } from "../contexts/StatusContext";
import { useQuery } from "@tanstack/react-query";
import { getClothes } from "../api/clothesAPI";
import { IClothingData } from "../components/Wardrobe/interface";

export default function Wardrobe() {
  const { user } = useContext(UserContext) as IUserContext;
  const { errorNotification, resetStatus } = useContext(
    StatusContext,
  ) as IStatusContext;
  const [error, setError] = useState<IErrorNotificationParams>({
    message: null,
    error: null,
  });
  const [openTab, setOpenTab] = useState(1);
  const [clothes, setClothes] = useState<IClothingData[]>([]);
  const { isLoading, refetch } = useQuery({
    queryKey: ["clothes"],
    queryFn: async () => {
      const response = await getClothes(user?.token);
      const data = await response?.json();
      if (data?.message) {
        setError({ message: data?.message });
      } else {
        setClothes(data)
        return data
      }
    },
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    errorNotification(error);
    return () => {
      resetStatus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
  return (
    <div className="flex justify-center content-container mb-10">
      <div className=" max-w-7xl w-full mt-24 relative">
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
        {openTab === 1 ? <ClothesSection clothes={clothes} user={user} isLoading = {isLoading} refetch={refetch} setError={setError} /> : <OutiftSection user={user} setError={setError} clothes={clothes} />}
      </div>
    </div>
  );
}
