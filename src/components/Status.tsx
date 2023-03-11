import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import React, { useContext, useEffect } from "react";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";

import { IStatusContext, StatusContext } from "../contexts/StatusContext";

function Status() {
  const { status, resetStatus } = useContext(StatusContext) as IStatusContext;
  const { isError, message, showStatus } = status;
  useEffect(() => {
    setTimeout(() => {
      resetStatus();
    }, 7000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showStatus]);

  if (showStatus) {
    return (
      <div className="absolute top-5 right-5 border  rounded px-4 py-2 flex justify-between items-center shadow-md bg-white z-40">
        <div className="flex items-center justify-center pr-2">
          {isError && (
            <ExclamationCircleIcon className="h-6 w-6 text-red-500 mr-2" />
          )}
          {message}
        </div>
        <button onClick={resetStatus}>
          <XMarkIcon className="h-5 w-5 hover:text-red-500" />
        </button>
      </div>
    );
  }
  return <div className="bg-transparent absolute top-0 right-0"></div>;
}

export default Status;
