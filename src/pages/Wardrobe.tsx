import { useState } from "react";
import ClothesSection from "../components/Wardrobe/ClothesSection";
import OutiftSection from "../components/Wardrobe/OutiftSection";

export default function Wardrobe() {
  const [openTab, setOpenTab] = useState(1);

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
        {openTab === 1 ? <ClothesSection /> : <OutiftSection />}
      </div>
    </div>
  );
}
