import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/UserContext";
import userAvatar from "../assets/userAvatar.webp";
import RizmicIcon from "../assets/RFIcon.png";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const homeNavigation = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#FAQ" },
];

const loginRegisterNav = [
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";

  return (
    <Disclosure
      as="nav"
      className={`top-0 w-full bg-white dark:bg-gray-800 ${
        isLoginPage || isRegisterPage
          ? "fixed bg-transparent dark:bg-transparent"
          : "fixed"
      } z-20 `}
    >
      {({ open }) => (
        <>
          <div className="relative">
            <div className="mx-auto max-w-7xl px-2 lg:px-4">
              <div className="flex items-center justify-between border-gray-100 my-4 lg:my-6 md:justify-start md:space-x-10">
                <Link
                  to="/"
                  className="font-semibold text-2xl hover:bg-transparent flex gap-1 lg:flex-1"
                >
                  <img
                    src={RizmicIcon}
                    alt="RizmicFits"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden md:block">RizmicFits</span>
                </Link>
                <Disclosure.Button className=" md:hidden relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>

                {isAuthenticated ? (
                  <>
                    <div className="hidden space-x-10 md:flex">
                      <Link
                        to="/wardrobe"
                        className="text-base font-medium text-gray-500 dark:text-gray-200 hover:text-gray-900 "
                      >
                        Wardrobe
                      </Link>
                      <Link
                        to="/generate-fit"
                        className="text-base font-medium text-gray-500 dark:text-gray-200 hover:text-gray-900"
                      >
                        Fit Generator
                      </Link>
                    </div>
                    <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800 border">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full bg-white"
                              src={user?.profilePicture ?? userAvatar}
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-slate-600 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/profile"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm  text-gray-900 dark:text-white hover:text-gray-700",
                                  )}
                                >
                                  Your Profile
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div className="w-full flex justify-center py-2">
                                  <button
                                    onClick={() => {
                                      logout();
                                      navigate("/login");
                                    }}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "flex  items-center justify-center rounded-md border border-transparent bg-ultramarineBlue px-8  py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700",
                                    )}
                                  >
                                    Log out
                                  </button>
                                </div>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </>
                ) : isHomePage ? (
                  <>
                    <div className="hidden space-x-10 md:flex">
                      <a href="#features">Features</a>
                      <a href="#pricing">Pricing</a>
                      <a href="#FAQ">FAQ</a>
                    </div>
                    <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                      <Link to="/login">Login</Link>
                      <Link
                        to="/register"
                        className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-ultramarineBlue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
                      >
                        Register
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                    <Link
                      to="/login"
                      className="text-gray-800 dark:text-gray-800 hover:text-gray-900 dark:hover:text-gray-900 mix-blend-difference"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-ultramarineBlue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          {!user && (
            <Disclosure.Panel className="md:hidden bg-white rounded-lg">
              <div className="space-y-1 px-2 pb-3 pt-2 shadow-md">
                {isHomePage &&
                  homeNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="text-gray-900 hover:bg-ultramarineBlue hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                {loginRegisterNav.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="text-gray-900 hover:bg-ultramarineBlue hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
}
