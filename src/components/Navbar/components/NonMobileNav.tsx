import { Menu, Transition } from "@headlessui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import cn from "../../ui/cn";
import { useAuth } from "../../../contexts/UserContext";
import userAvatar from "../../../assets/userAvatar.webp";
import RizmicIcon from "../../../assets/RFIcon.png";

export default function NonMobileNav() {
  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";
  return (
    <nav
      className={`top-0 w-full bg-white dark:bg-gray-800 hidden md:block ${
        isLoginPage || isRegisterPage
          ? "fixed bg-transparent dark:bg-transparent"
          : "fixed"
      } z-20 `}
    >
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-end border-gray-100 dark:text-gray-900 py-2 pt-4  md:justify-start md:space-x-10">
            <Logo />

            {isAuthenticated ? (
              <>
                <div className="space-x-10">
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
                  <Link
                    to="/friends"
                    className="text-base font-medium text-gray-500 dark:text-gray-200 hover:text-gray-900"
                  >
                    Friends
                  </Link>
                </div>
                <div className=" items-center justify-end flex flex-1 lg:w-0">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full  focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800 border">
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
                              className={cn(
                                active ? "bg-gray-100 dark:text-gray-900" : "",
                                "block px-4 py-2   text-gray-900 dark:text-white hover:text-gray-700",
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
                              className={cn(
                                active ? "bg-gray-100 dark:text-gray-900" : "",
                                "block px-4 py-2   text-gray-900 dark:text-white hover:text-gray-700",
                              )}
                            >
                              Settings
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
                                className={cn(
                                  active
                                    ? "bg-gray-100 dark:text-gray-900"
                                    : "",
                                  "flex  items-center justify-center rounded-md border border-transparent bg-ultramarineBlue px-8  py-2  font-medium text-white shadow-sm hover:bg-blue-700",
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
                <div className="space-x-10">
                  <a href="#features">Features</a>
                  <a href="#pricing">Pricing</a>
                  <a href="#FAQ">FAQ</a>
                </div>
                <div className=" items-center justify-end flex md:flex-1 lg:w-0">
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
              <div className="items-center justify-end flex flex-1 lg:w-0">
                <Link
                  to="/login"
                  className="dark:text-gray-800 hover:text-gray-900 mix-blend-difference"
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
    </nav>
  );
}

export const Logo = () => {
  return (
    <Link
      to="/"
      className=" font-semibold text-2xl hover:bg-transparent flex gap-1 flex-1"
    >
      <img src={RizmicIcon} alt="RizmicFits" className="w-8 h-8 rounded-full" />
      <span>RizmicFits</span>
    </Link>
  );
};
