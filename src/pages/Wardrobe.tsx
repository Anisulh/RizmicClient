import React, { useContext, useEffect, useState } from "react";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import ChevronLeftIcon from "@heroicons/react/24/outline/ChevronLeftIcon";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import ClothingCard from "../components/ClothingCard";
import FilterCard from "../components/FilterCard";
import ClothesModal, { IClothingData } from "../components/ClothesModal";
import { IUserContext, UserContext } from "../UserContext";
import {
  IErrorNotificationParams,
  IStatusContext,
  StatusContext,
} from "../StatusContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getClothes } from "../api/clothesAPI";
import Spinner from "../components/Spinner";

export default function Wardrobe() {
  const { user } = useContext(UserContext) as IUserContext;
  const { errorNotification, resetStatus } = useContext(
    StatusContext,
  ) as IStatusContext;
  const [error, setError] = useState<IErrorNotificationParams>({
    message: null,
    error: null,
  });
  const [wardrobe, setWardrobe] = useState<IClothingData[] | null>(null);
  useEffect(() => {
    errorNotification(error);
    return () => {
      resetStatus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["wardrobe"],
    queryFn: async () => {
      const response = await getClothes(user?.token);
      if (response.message) {
        setError({ message: response.message });
      }
    },
  });
  const [show, setShow] = useState(false);
  const [clothesModalOpen, setClothesModalOpen] = useState(false);
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center h-screen">
      <div className=" max-w-7xl w-full mt-24 relative">
        <FilterCard />

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-2xl ml-6">Shirts</h2>
            <button onClick={() => setShow(!show)}>
              {show ? (
                <ChevronLeftIcon className="h-6 w-6" />
              ) : (
                <ChevronDownIcon className="h-6 w-6" />
              )}
            </button>
          </div>
          {show && (
            <div className="grid grid-cols-3 gap-4 justify-items-center">
              <ClothingCard />
              <ClothingCard />
              <ClothingCard />
              <ClothingCard />
              <ClothingCard />
              <ClothingCard />
              <ClothingCard />

              <ClothingCard />
            </div>
          )}
        </div>

        <button
          className=" absolute  bottom-14 right-0"
          onClick={() => setClothesModalOpen(true)}
        >
          <PlusIcon className="h-12 w-12 bg-cambridgeblue rounded-full p-3" />
        </button>
      </div>
      <ClothesModal open={clothesModalOpen} setOpen={setClothesModalOpen} />
    </div>
  );
}
