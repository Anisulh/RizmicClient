import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { Dispatch, SetStateAction } from "react";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import { IStatusState } from "../pages/register/Register";

interface IStatusProps {
  message: string;
  setStatus: Dispatch<SetStateAction<IStatusState>>;
  isError: boolean;
}

function Status({ message, setStatus, isError }: IStatusProps) {
  return (
    <div className="absolute top-5 right-5 border  rounded px-4 py-2 flex justify-between items-center shadow-md bg-white">
      <div className="flex items-center justify-center pr-2">
        {isError && (
          <ExclamationCircleIcon className="h-6 w-6 text-red-500 mr-2" />
        )}
        {message}
      </div>
      <button
        onClick={() => {
          setStatus((prevState) => ({ ...prevState, showStatus: false }));
        }}
      >
        <XMarkIcon className="h-5 w-5 hover:text-red-500" />
      </button>
    </div>
  );
}

export default Status;
