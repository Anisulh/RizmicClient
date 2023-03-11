import React, { useContext, useEffect, useState } from "react";
import GenerateFitModal from "./GenerateFitModal";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import {
  IErrorNotificationParams,
  IStatusContext,
  StatusContext,
} from "../../StatusContext";
import { IClothingData } from "../../components/Wardrobe/interface";
import { useQuery } from "@tanstack/react-query";
import { getClothes } from "../../api/clothesAPI";
import Spinner from "../../components/Spinner";
import { IUserContext, UserContext } from "../../UserContext";

export interface IBodyParts {
  head: IClothingData[];
  top: IClothingData[];
  bottom: IClothingData[];
  shoes: IClothingData[];
}

function GenerateFit() {
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(UserContext) as IUserContext;

  const { errorNotification, resetStatus } = useContext(
    StatusContext,
  ) as IStatusContext;

  const [error, setError] = useState<IErrorNotificationParams>({
    message: null,
    error: null,
  });

  const [wardrobe, setWardrobe] = useState<IBodyParts>({
    head: [],
    top: [],
    bottom: [],
    shoes: [],
  });

  const [modalData, setModalData] = useState<IClothingData[] | null>(null);
  useEffect(() => {
    errorNotification(error);
    return () => {
      resetStatus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const { head, top, bottom, shoes } = wardrobe;
  const { isLoading, refetch } = useQuery({
    queryKey: ["wardrobe"],
    queryFn: async () => {
      const response = await getClothes(user?.token);
      const data = await response?.json();
      if (data?.message) {
        setError({ message: data?.message });
      } else {
        console.log(data);
        data.map((item: any) => {
          const bodyLocationsArray = item.bodyLocation;
          bodyLocationsArray.map((locations: string) => {
            if (locations === "upperBody") {
              setWardrobe((prevState) => ({
                ...prevState,
                top: [...top, item],
              }));
            } else if (locations === "lowerBody") {
              setWardrobe((prevState) => ({
                ...prevState,
                bottom: [...bottom, item],
              }));
            } else if (locations === "head") {
              setWardrobe((prevState) => ({
                ...prevState,
                head: [...head, item],
              }));
            } else if (locations === "feet") {
              setWardrobe((prevState) => ({
                ...prevState,
                shoes: [...shoes, item],
              }));
            } else {
              return;
            }
          });
        });
        return data;
      }
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex h-screen w-screen bg-ourGrey justify-center mb-10">
      <div className="flex max-w-7xl mt-24 relative w-full mx-auto">
        <div className="relative bg-sWhite rounded w-72">
          <h1 className="w-full absolute text-center">
            Our Recommended Generation
          </h1>
          <div className="flex gap-3 flex-col h-full justify-center items-center">
            <button
              onClick={() => {
                setShowModal(true);
                setModalData(head);
              }}
              type="button"
              className="flex border border-pink-800 bg-ourGrey justify-center items-center h-20 w-24 rounded-xl"
            >
              <PlusIcon className="h-12 w-12 rounded-full p-3" />
            </button>
            <button
              onClick={() => {
                setShowModal(true);
                setModalData(top);
              }}
              type="button"
              className="flex border border-pink-800 bg-sWhite justify-center items-center h-40 w-44 rounded-xl"
            >
              <PlusIcon className="h-12 w-12 rounded-full p-3" />
            </button>
            <button
              onClick={() => {
                setShowModal(true);
                setModalData(bottom);
              }}
              type="button"
              className="flex border border-pink-800 bg-sWhite justify-center items-center h-40 w-44 rounded-xl"
            >
              <PlusIcon className="h-12 w-12 rounded-full p-3" />
            </button>
            <button
              onClick={() => {
                setShowModal(true);
                setModalData(shoes);
              }}
              type="button"
              className="flex border border-pink-800 bg-ourGrey justify-center items-center h-20 w-24 rounded-xl"
            >
              <PlusIcon className="h-12 w-12 rounded-full p-3" />
            </button>
          </div>
        </div>
        <div className="flex flex-col border-2 border-green-900 bg-sWhite grow rounded">
          <div className="text-lg">
            <h1 className="w-full text-xl">Choose a vibe:</h1>
            <div className="flex justify-center gap-4">
              <button type="button" className="border rounded-md bg-ourGrey">
                Neutral
              </button>
              <button type="button" className="border rounded-md bg-ourGrey">
                Monochrome
              </button>
              <button type="button" className="border rounded-md bg-ourGrey">
                Earth-tones
              </button>
              <button type="button" className="border rounded-md bg-ourGrey">
                Complimentary
              </button>
            </div>
          </div>
          <div className="text-lg">
            <h1 className="w-full text-xl">Fit vibes:</h1>
            <div className="flex justify-center gap-4">
              <button type="button" className="border rounded-md bg-ourGrey">
                Cozy
              </button>
              <button type="button" className="border rounded-md bg-ourGrey">
                Warm
              </button>
              <button type="button" className="border rounded-md bg-ourGrey">
                Cool
              </button>
              <button type="button" className="border rounded-md bg-ourGrey">
                Professional
              </button>
              <button type="button" className="border rounded-md bg-ourGrey">
                Relaxed
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center py-8">
            <button
              type="button"
              className="border rounded-md bg-ourGrey h-8 w-24 text-lg"
            >
              Generate
            </button>
          </div>
          <div className="flex flex-col justify-center items-center flex-1 border-2 border-black gap-3">
            <div className="flex flex-col justify-center border bg-ourGrey border-gray-700 h-72 w-96 rounded-lg">
              <h1>How does it work?</h1>
              <p>
                First, you choose which part of the body you wish to generate a
                outfit for. By default the upper body and lower body are
                selected.
              </p>
              <p>
                Next, choose a vibe and fit you are going for and our algorithm
                will generate a fit matching the criteria.
              </p>
              <p>
                Have a piece you’re dying to wear? Click the + on the parts of
                the body that’s selected and choose that piece.
              </p>
              <p>
                Not feeling the generated outfit? Keep clicking to see all the
                other options.
              </p>
            </div>
          </div>
        </div>
      </div>
      <GenerateFitModal
        open={showModal}
        setOpen={setShowModal}
        data={modalData}
        setError={setError}
        refetch={refetch}
        user={user}
      />
    </div>
  );
}
export default GenerateFit;
