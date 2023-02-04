import { Popover, Transition } from "@headlessui/react";
import QuestionMarkCircleIcon from "@heroicons/react/20/solid/QuestionMarkCircleIcon";
import React, { Fragment } from "react";

export default function InfoPopover({title, text}: {title:string, text:string}) {

  return (
    <Popover className="relative ">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                ${open ? "" : "text-opacity-90"}
                   hover:text-opacity-100 focus:outline-none rounded-full`}
          >
            <QuestionMarkCircleIcon
              className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-ultramarineBlue transition duration-150 ease-in-out hover:text-opacity-100`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-full  z-30 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden bg-sWhite rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                  <div className=" px-2 py-2 ">
                    <h6 className="text-sm font-medium text-gray-900">
                      {title}:
                    </h6>

                    <p className="block text-sm text-gray-500">
                      {text}
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
