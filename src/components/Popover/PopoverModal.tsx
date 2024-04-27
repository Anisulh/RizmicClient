import { Popover, Transition } from "@headlessui/react";
import React from "react";

interface PopoverProps {
  isShowing: boolean;
  button: React.ReactNode;
  children: React.ReactNode;
}

export default function PopoverModal({
  isShowing,
  button,
  children,
}: PopoverProps) {
  return (
    <Popover className="relative">
      <Popover.Button className="text-opacity-90 hover:text-opacity-100 focus:outline-none rounded-full p-0 bg-transparent">
        {button}
      </Popover.Button>
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
        show={isShowing}
      >
        <Popover.Panel className="absolute left-full  z-30 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
          {children}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
