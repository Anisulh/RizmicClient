import React from "react";
import tshirt from "../assets/t-shirt.jpg";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";

export default function ClothingCard() {
  return (
    <div>
      <div className="h-80 w-64 ">
        <img
          className="object-cover clothing-image-position w-full h-64  text-center rounded-md"
          alt="Piece of clothing"
          src={tshirt}
        />

        <div className="flex justify-between w-full mt-1">
          <div>
            <h3>T-shirt</h3>
            <p className="text-slategrey text-sm">Color: white</p>
          </div>
          <EllipsisVerticalIcon className="h-6 w-6 hover:cursor-pointer hover:bg-slategrey rounded-full hover:text-white" />
        </div>
      </div>
    </div>
  );
}
