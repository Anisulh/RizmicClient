import React, { Fragment, useContext } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import { Link } from "react-router-dom";
import { IUserContext, UserContext } from "../contexts/UserContext";
import userAvatar from "../assets/userAvatar.png";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { user } = useContext(UserContext) as IUserContext;
  return (
    <div className="absolute top-0 w-full bg-transparent z-40">
      <Popover className="relative bg-transparent">
        <div className="mx-auto max-w-7xl md:p-0 p-2 bg-transparent ">
          <div className="flex items-center justify-between border-gray-100 my-6 md:justify-start md:space-x-10 bg-transparent">
            <div className="flex justify-start lg:w-0 lg:flex-1 bg-transparent">
              <Link to="/" className="font-semibold text-2xl bg-transparent">
                Rizmic
              </Link>
            </div>
            <div className="-my-2 -mr-2 md:hidden bg-transparent">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-600  hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 bg-transparent">
                <span className="sr-only">Open menu</span>
                <Bars3Icon
                  className="h-6 w-6 bg-transparent"
                  aria-hidden="true"
                />
              </Popover.Button>
            </div>
            {user ? (
              <>
                <nav className="hidden space-x-10 md:flex bg-transparent">
                  <Link
                    to="/"
                    className="text-base font-medium text-gray-500 hover:text-gray-900 bg-transparent"
                  >
                    Home
                  </Link>

                  <Link
                    to="/wardrobe"
                    className="text-base font-medium text-gray-500 hover:text-gray-900 bg-transparent mix-blend-difference"
                  >
                    Wardrobe
                  </Link>
                  <Link
                    to="/generatefit"
                    className="text-base font-medium text-gray-500 hover:text-gray-900 bg-transparent mix-blend-difference"
                  >
                    Fit Generator
                  </Link>
                </nav>
                <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0 bg-transparent">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800 border">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full "
                          src={user.profilePicture ?? userAvatar}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700",
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/settings"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700",
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700",
                              )}
                            >
                              Log out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </>
            ) : (
              <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0 bg-transparent">
                <Link
                  to="/login"
                  className="whitespace-nowrap text-base font-medium text-raisinblackhover:text-gray-900 bg-transparent mix-blend-difference "
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-ultramarineBlue px-4 py-2 text-base font-medium text-white shadow-sm "
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute top-0 right-0 origin-top-right transform px-2 py-5 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="absolute right-4">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
                <div className="mt-6"></div>
              </div>
              <div className="space-y-6 py-6 px-5">
                <div className="grid grid-cols-1 gap-y-4 gap-x-8 text-left">
                  <Link
                    to="/"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Home
                  </Link>

                  <Link
                    to="/wardrobe"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Wardrobe
                  </Link>
                  <Link
                    to="/generatefit"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Fit Generator
                  </Link>
                </div>
                <div>
                  <Link
                    to="/register"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Register
                  </Link>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing user?
                    <Link
                      to="/login"
                      className="pl-1 text-indigo-600 hover:text-indigo-500"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
