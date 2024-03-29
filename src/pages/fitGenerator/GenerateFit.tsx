import { useContext, useEffect, useState } from "react";
import GenerateFitModal from "./GenerateFitModal";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import {
  IErrorNotificationParams,
  IStatusContext,
  StatusContext,
} from "../../contexts/StatusContext";
import { IClothingData } from "../../components/Wardrobe/interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getClothes } from "../../api/clothesAPI";
import Spinner from "../../components/Spinner";
import { generateBlank } from "../../api/generationAPI";
import ClothingCard from "../../components/Wardrobe/ClothingCard";

export interface IBodyParts {
  head: IClothingData[];
  top: IClothingData[];
  bottom: IClothingData[];
  shoes: IClothingData[];
}

function GenerateFit() {
  const [showModal, setShowModal] = useState(false);
  const [style, setStyle] = useState<"monochrome" | "complimentary" | null>(
    null,
  );
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
  const [generatedFits, setGeneratedFits] = useState<IClothingData[][]>([]);
  const [modalData, setModalData] = useState<IClothingData[] | null>(null);
  useEffect(() => {
    errorNotification(error);
    return () => {
      resetStatus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const { head, top, bottom, shoes } = wardrobe;
  const { isLoading: queryIsLoading, refetch } = useQuery({
    queryKey: ["wardrobe"],
    queryFn: async () => {
      const data = await getClothes();
      if (data?.message) {
        setError({ message: data?.message });
      } else {
        const temp: IBodyParts = {
          head: [],
          top: [],
          bottom: [],
          shoes: [],
        };
        data.map((item: IClothingData) => {
          const bodyLocationsArray = item.bodyLocation;
          bodyLocationsArray.map((locations: string) => {
            if (locations === "upperBody") {
              temp.top.push(item);
            } else if (locations === "lowerBody") {
              temp.bottom.push(item);
            } else if (locations === "head") {
              temp.head.push(item);
            } else if (locations === "feet") {
              temp.shoes.push(item);
            } else {
              return;
            }
          });
        });
        setWardrobe(temp);
        return data;
      }
    },
    refetchOnWindowFocus: false,
  });
  const { mutate, isLoading: mutationIsLoading } = useMutation({
    mutationFn: async ({ body }: { body: { style: string } }) => {
      return await generateBlank(body);
    },
    onSuccess(data) {
      data.fits.map((fit: string[]) => {
        const fits: IClothingData[] = [];
        fit.map((item) => {
          const top = wardrobe.top.find((clothes) => {
            return clothes._id === item;
          });
          const bottom = wardrobe.bottom.find((clothes) => {
            return clothes._id === item;
          });
          top && fits.push(top);
          bottom && fits.push(bottom);
        });
        setGeneratedFits((prevState) => {
          return [...prevState, fits];
        });
      });
    },
  });

  if (queryIsLoading) {
    return <Spinner />;
  }

  return (
    <div className="mb-10">
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
                className={`${
                  style === "monochrome" && "bg-cambridgeblue"
                }border rounded-md bg-ourGrey transition-all hover:bg-cambridgeblue py-2 px-4`}
                onClick={() => setStyle("monochrome")}
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
                className={`${
                  style === "complimentary" && "bg-cambridgeblue"
                }border rounded-md bg-ourGrey transition-all hover:bg-cambridgeblue py-2 px-4`}
                onClick={() => setStyle("complimentary")}
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
              onClick={() => style && mutate({ body: { style } })}
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
      </div>{" "}
      {mutationIsLoading && <Spinner />}
      <div className="flex gap-10 items-center justify-center mt-10">
        {generatedFits.map((fit) => {
          return fit.map((item: IClothingData) => {
            return (
              <ClothingCard
                key={item._id}
                item={item}
                setError={setError}
                refetch={refetch}
              />
            );
          });
        })}
      </div>
      <GenerateFitModal
        open={showModal}
        setOpen={setShowModal}
        data={modalData}
        setError={setError}
        refetch={refetch}
      />
    </div>
  );
}
export default GenerateFit;
