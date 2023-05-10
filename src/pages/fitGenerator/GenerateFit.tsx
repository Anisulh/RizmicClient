import { useContext, useEffect, useState } from "react";
import GenerateFitModal from "./GenerateFitModal";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import {
  IErrorNotificationParams,
  IStatusContext,
  StatusContext,
} from "../../contexts/StatusContext";
import { IClothingData } from "../../components/Wardrobe/interface";
import { useQuery } from "@tanstack/react-query";
import { getClothes } from "../../api/clothesAPI";
import Spinner from "../../components/Spinner";
import { IUserContext, UserContext } from "../../contexts/UserContext";

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
        data.map((item: IClothingData) => {
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
    <div className="flex content-container justify-center mb-10">
      <div className="flex max-w-7xl mt-24 relative w-full md:mx-auto flex-col md:flex-row px-2">
        <div className="relative bg-sWhite rounded md:w-2/6 ">
          <h1 className=" w-full absolute text-center font-medium text-lg">
            Our Recommended Generation
          </h1>
          <div className="flex gap-3 flex-col justify-center items-center mt-20">
            <button
              onClick={() => {
                setShowModal(true);
                setModalData(head);
              }}
              type="button"
              className="flex border border-gray-300 bg-ourGrey transition-all hover:bg-cambridgeblue justify-center items-center h-20 w-24 md:h-24 md:w-28 lg:h-28 lg:w-32 xl:h-32 xl:w-36 rounded-xl"
            >
              <PlusIcon className="h-12 w-12 rounded-full p-3" />
            </button>
            <button
              onClick={() => {
                setShowModal(true);
                setModalData(top);
              }}
              type="button"
              className="flex border border-gray-300 bg-sWhite transition-all hover:bg-cambridgeblue justify-center items-center h-40 w-44 md:h-44 md:w-48 lg:h-48 lg:w-52 xl:h-52 xl:w-56 rounded-xl"
            >
              <PlusIcon className="h-12 w-12 rounded-full p-3" />
            </button>
            <button
              onClick={() => {
                setShowModal(true);
                setModalData(bottom);
              }}
              type="button"
              className="flex border border-gray-300 bg-sWhite transition-all hover:bg-cambridgeblue justify-center items-center h-40 w-44 md:h-44 md:w-48 lg:h-48 lg:w-52 xl:h-52 xl:w-56  rounded-xl"
            >
              <PlusIcon className="h-12 w-12 rounded-full p-3" />
            </button>
            <button
              onClick={() => {
                setShowModal(true);
                setModalData(shoes);
              }}
              type="button"
              className="flex border border-gray-300 bg-ourGrey transition-all hover:bg-cambridgeblue justify-center items-center h-20 w-24 md:h-24 md:w-28 lg:h-28 lg:w-32 xl:h-32 xl:w-36 rounded-xl"
            >
              <PlusIcon className="h-12 w-12 rounded-full p-3" />
            </button>
          </div>
        </div>
        <div className="flex flex-col bg-sWhite grow rounded">
          <div className="text-sm">
            <h1 className="w-full text-lg font-medium">Choose a vibe:</h1>
            <div className="flex justify-center gap-2  md:gap-4 mt-8">
              <button
                type="button"
                className="border rounded-md bg-ourGrey transition-all hover:bg-cambridgeblue py-2 px-4"
              >
                Neutral
              </button>
              <button
                type="button"
                className="border rounded-md bg-ourGrey transition-all hover:bg-cambridgeblue py-2 px-4"
              >
                Monochrome
              </button>
              <button
                type="button"
                className="border rounded-md bg-ourGrey transition-all hover:bg-cambridgeblue py-2 px-4"
              >
                Earth-tones
              </button>
              <button
                type="button"
                className="border rounded-md bg-ourGrey transition-all hover:bg-cambridgeblue py-2 px-4"
              >
                Complimentary
              </button>
            </div>
          </div>
          <div className="text-sm">
            <h1 className="w-full  text-lg font-medium mt-10">Fit vibes:</h1>
            <div className="flex justify-center gap-4  md:gap-4 mt-8">
              <button
                type="button"
                className="border rounded-md bg-ourGrey transition-all hover:bg-cambridgeblue  py-2 px-4"
              >
                Cozy
              </button>
              <button
                type="button"
                className="border rounded-md bg-ourGrey transition-all hover:bg-cambridgeblue py-2 px-4"
              >
                Warm
              </button>
              <button
                type="button"
                className="border rounded-md bg-ourGrey transition-all hover:bg-cambridgeblue py-2 px-4"
              >
                Cool
              </button>
              <button
                type="button"
                className="border rounded-md bg-ourGrey transition-all hover:bg-cambridgeblue py-2 px-4"
              >
                Professional
              </button>
              <button
                type="button"
                className="border rounded-md bg-ourGrey transition-all hover:bg-cambridgeblue py-2 px-4"
              >
                Relaxed
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center py-8">
            <button
              type="button"
              className="flex justify-center items-center border rounded-md bg-ultramarineBlue transition-all hover:bg-blue-700 text-white py-2 px-4"
            >
              Generate
            </button>
          </div>
          <div className="flex items-center justify-center mb-20 md:mb-0 p-4">
            <div className="flex flex-col justify-center border bg-ourGrey border-gray-700 p-4 rounded-lg">
              <h1 className="text-lg font-medium ">How does it work?</h1>

              <ol className="mt-4 flex flex-col gap-2 px-10 list-decimal">
                <li>
                  You choose which part of the body you wish to generate a
                  outfit for. By default the upper body and lower body are
                  selected.
                </li>
                <li>
                  Choose a vibe and fit you are going for and our algorithm will
                  generate a fit matching the criteria.
                </li>
                <div className="pl-8">
                  <li className="list-disc">
                    Have a piece you’re dying to wear? Click the + on the parts
                    of the body that’s selected and choose that piece.
                  </li>
                </div>

                <li>
                  Not feeling the generated outfit? Keep clicking to see all the
                  other options.
                </li>
              </ol>
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
