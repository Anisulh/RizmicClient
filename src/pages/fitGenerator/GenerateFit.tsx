import { IExistingClothesData } from "../wardrobe/components/ClothesModal";

export interface IBodyParts {
  head: IExistingClothesData[];
  top: IExistingClothesData[];
  bottom: IExistingClothesData[];
  shoes: IExistingClothesData[];
}

function GenerateFit() {
  // const { addToast } = useToast();
  // const [showModal, setShowModal] = useState(false);
  // const [style, setStyle] = useState<"monochrome" | "complimentary" | null>(
  //   null,
  // );
  // const [wardrobe, setWardrobe] = useState<IBodyParts>({
  //   head: [],
  //   top: [],
  //   bottom: [],
  //   shoes: [],
  // });
  // const [generatedFits, setGeneratedFits] = useState<IExistingClothesData[][]>(
  //   [],
  // );
  // const [modalData, setModalData] = useState<IExistingClothesData[] | null>(
  //   null,
  // );
  //
  // const { head, top, bottom, shoes } = wardrobe;
  // const { isLoading: queryIsLoading, refetch } = useQuery({
  //   queryKey: ["wardrobe"],
  //   queryFn: async () => {
  //     const data = await getClothes();
  //     if (data?.message) {
  //       addToast({
  //         title: "Something went wrong.",
  //         description: data?.message,
  //         type: "error",
  //       });
  //     } else {
  //       const temp: IBodyParts = {
  //         head: [],
  //         top: [],
  //         bottom: [],
  //         shoes: [],
  //       };
  //       setWardrobe(temp);
  //       return data;
  //     }
  //   },
  //   refetchOnWindowFocus: false,
  // });
  // const { mutate, isPending: mutationIsLoading } = useMutation({
  //   mutationFn: async ({ body }: { body: { style: string } }) => {
  //     return await generateBlank(body);
  //   },
  //   onSuccess(data) {
  //     data.fits.map((fit: string[]) => {
  //       const fits: IExistingClothesData[] = [];
  //       fit.map((item) => {
  //         const top = wardrobe.top.find((clothes) => {
  //           return clothes._id === item;
  //         });
  //         const bottom = wardrobe.bottom.find((clothes) => {
  //           return clothes._id === item;
  //         });
  //         top && fits.push(top);
  //         bottom && fits.push(bottom);
  //       });
  //       setGeneratedFits((prevState) => {
  //         return [...prevState, fits];
  //       });
  //     });
  //   },
  // });
  //
  // if (queryIsLoading) {
  //   return <Spinner />;
  // }

  return (
    <div className="content-container mx-auto max-w-7xl space-y-10 px-4">
      <div>
        <h1 className="text-3xl font-bold md:text-4xl">Fit Generation</h1>
      </div>
      <div className="min-h screen">
        <p>Currently under development :)</p>
      </div>
    </div>
  );

  // return (
  //   <div className="mb-10">
  //     <div className="relative mt-24 flex w-full max-w-7xl flex-col px-2 md:mx-auto md:flex-row">
  //       <div className="relative rounded md:w-2/6">
  //         <h1 className="absolute w-full text-center text-lg font-medium">
  //           Our Recommended Generation
  //         </h1>
  //         <div className="mt-20 flex flex-col items-center justify-center gap-3">
  //           <button
  //             onClick={() => {
  //               setShowModal(true);
  //               setModalData(head);
  //             }}
  //             type="button"
  //             className="flex h-20 w-24 items-center justify-center rounded-xl border-2 border-gray-300 transition-all hover:bg-cambridgeblue md:h-24 md:w-28 lg:h-28 lg:w-32 xl:h-32 xl:w-36"
  //           >
  //             <PlusIcon className="size-12 rounded-full p-3" />
  //           </button>
  //           <button
  //             onClick={() => {
  //               setShowModal(true);
  //               setModalData(top);
  //             }}
  //             type="button"
  //             className="flex h-40 w-44 items-center justify-center rounded-xl border-gray-300 bg-white transition-all hover:bg-cambridgeblue md:h-44 md:w-48 lg:h-48 lg:w-52 xl:h-52 xl:w-56"
  //           >
  //             <PlusIcon className="size-12 rounded-full p-3" />
  //           </button>
  //           <button
  //             onClick={() => {
  //               setShowModal(true);
  //               setModalData(bottom);
  //             }}
  //             type="button"
  //             className="flex h-40 w-44 items-center justify-center rounded-xl border-gray-300 bg-white transition-all hover:bg-cambridgeblue md:h-44 md:w-48 lg:h-48 lg:w-52 xl:h-52 xl:w-56"
  //           >
  //             <PlusIcon className="size-12 rounded-full p-3" />
  //           </button>
  //           <button
  //             onClick={() => {
  //               setShowModal(true);
  //               setModalData(shoes);
  //             }}
  //             type="button"
  //             className="flex h-20 w-24 items-center justify-center rounded-xl border-2 border-gray-300 transition-all hover:bg-cambridgeblue md:h-24 md:w-28 lg:h-28 lg:w-32 xl:h-32 xl:w-36"
  //           >
  //             <PlusIcon className="size-12 rounded-full p-3" />
  //           </button>
  //         </div>
  //       </div>
  //       <div className="flex grow flex-col rounded">
  //         <div className="text-sm">
  //           <h1 className="w-full text-lg font-medium">Choose a vibe:</h1>
  //           <div className="mt-8 flex justify-center gap-2 md:gap-4">
  //             <button
  //               type="button"
  //               className="rounded-md border-2 px-4 py-2 transition-all hover:bg-cambridgeblue"
  //             >
  //               Neutral
  //             </button>
  //             <button
  //               type="button"
  //               className={`${
  //                 style === "monochrome" && "bg-cambridgeblue"
  //               }rounded-md border-2 px-4 py-2 transition-all hover:bg-cambridgeblue`}
  //               onClick={() => setStyle("monochrome")}
  //             >
  //               Monochrome
  //             </button>
  //             <button
  //               type="button"
  //               className="rounded-md border-2 px-4 py-2 transition-all hover:bg-cambridgeblue"
  //             >
  //               Earth-tones
  //             </button>
  //             <button
  //               type="button"
  //               className={`${
  //                 style === "complimentary" && "bg-cambridgeblue"
  //               }rounded-md border-2 px-4 py-2 transition-all hover:bg-cambridgeblue`}
  //               onClick={() => setStyle("complimentary")}
  //             >
  //               Complimentary
  //             </button>
  //           </div>
  //         </div>
  //         <div className="text-sm">
  //           <h1 className="mt-10 w-full text-lg font-medium">Fit vibes:</h1>
  //           <div className="mt-8 flex justify-center gap-4 md:gap-4">
  //             <button
  //               type="button"
  //               className="rounded-md border-2 px-4 py-2 transition-all hover:bg-cambridgeblue"
  //             >
  //               Cozy
  //             </button>
  //             <button
  //               type="button"
  //               className="rounded-md border-2 px-4 py-2 transition-all hover:bg-cambridgeblue"
  //             >
  //               Warm
  //             </button>
  //             <button
  //               type="button"
  //               className="rounded-md border-2 px-4 py-2 transition-all hover:bg-cambridgeblue"
  //             >
  //               Cool
  //             </button>
  //             <button
  //               type="button"
  //               className="rounded-md border-2 px-4 py-2 transition-all hover:bg-cambridgeblue"
  //             >
  //               Professional
  //             </button>
  //             <button
  //               type="button"
  //               className="rounded-md border-2 px-4 py-2 transition-all hover:bg-cambridgeblue"
  //             >
  //               Relaxed
  //             </button>
  //           </div>
  //         </div>
  //         <div className="flex items-center justify-center py-8">
  //           <button
  //             type="button"
  //             className="flex items-center justify-center rounded-md bg-ultramarineBlue px-4 py-2 text-white transition-all hover:bg-blue-700"
  //             onClick={() => style && mutate({ body: { style } })}
  //           >
  //             Generate
  //           </button>
  //         </div>
  //         <div className="mb-20 flex items-center justify-center p-4 md:mb-0">
  //           <div className="flex flex-col justify-center rounded-lg border-2 p-4">
  //             <h1 className="text-lg font-medium">How does it work?</h1>
  //
  //             <ol className="mt-4 flex list-decimal flex-col gap-2 px-10">
  //               <li>
  //                 You choose which part of the body you wish to generate a
  //                 outfit for. By default the upper body and lower body are
  //                 selected.
  //               </li>
  //               <li>
  //                 Choose a vibe and fit you are going for and our algorithm will
  //                 generate a fit matching the criteria.
  //               </li>
  //               <div className="pl-8">
  //                 <li className="list-disc">
  //                   Have a piece you’re dying to wear? Click the + on the parts
  //                   of the body that’s selected and choose that piece.
  //                 </li>
  //               </div>
  //
  //               <li>
  //                 Not feeling the generated outfit? Keep clicking to see all the
  //                 other options.
  //               </li>
  //             </ol>
  //           </div>
  //         </div>
  //       </div>
  //     </div>{" "}
  //     {mutationIsLoading && <Spinner />}
  //     <div className="mt-10 flex items-center justify-center gap-10">
  //       {generatedFits.map((fit) => {
  //         return fit.map((item: IExistingClothesData) => {
  //           return (
  //             <ClothingCard key={item._id} item={item} refetch={refetch} />
  //           );
  //         });
  //       })}
  //     </div>
  //     <GenerateFitModal
  //       open={showModal}
  //       setOpen={setShowModal}
  //       data={modalData}
  //       refetch={refetch}
  //     />
  //   </div>
  // );
}
export default GenerateFit;
