import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FriendsIcon,
  SettingIcon,
  TestTubeIcon,
  WardrobeIcon,
} from "../../Icons";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import { Fragment } from "react";
import cn from "../../ui/cn";
import Button from "../../ui/Button";
import { useAuth } from "../../../contexts/UserContext";
import PWAInstallPrompt from "./PWAInstallPrompt";
import userAvatar from "../../../assets/userAvatar.webp";
import RizmicIcon from "../../../assets/RFIcon.png";
import { useQueryClient } from "@tanstack/react-query";

const tabs = [
  {
    name: "Wardrobe",
    href: "/wardrobe",
    icon: WardrobeIcon,
  },
  {
    name: "Generate",
    href: "/generate-fit",
    icon: TestTubeIcon,
  },
  {
    name: "Friends",
    href: "/friends",
    icon: FriendsIcon,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: SettingIcon,
  },
];

const homeNavigation = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#FAQ" },
];

const loginRegisterNav = [
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
];

export const HamburgerMenu = ({
  open,
  isHomePage,
}: {
  open: boolean;
  isHomePage: boolean;
}) => {
  return (
    <Menu as="div" className="relative px-4">
      <Menu.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
        <span className="absolute -inset-0.5" />
        <span className="sr-only">Open main menu</span>
        {open ? (
          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
        ) : (
          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-4 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-600">
          {isHomePage ? (
            <div className="space-y-1 px-2 pb-3 pt-2 shadow-md">
              {homeNavigation.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      className={cn(
                        active ? "bg-gray-100 dark:text-gray-900" : "",
                        "block px-4 py-2 text-gray-900 hover:text-gray-700 dark:text-white",
                      )}
                    >
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
              {loginRegisterNav.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <Link
                      to={item.href}
                      className={cn(
                        active ? "bg-gray-100 dark:text-gray-900" : "",
                        "block px-4 py-2 text-gray-900 hover:text-gray-700 dark:text-white",
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          ) : (
            <div className="space-y-1 px-2 pb-3 pt-2 shadow-md">
              {loginRegisterNav.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <Link
                      to={item.href}
                      className={cn(
                        active ? "bg-gray-100 dark:text-gray-900" : "",
                        "block px-4 py-2 text-gray-900 hover:text-gray-700 dark:text-white",
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          )}
          <Menu.Item>
            <PWAInstallPrompt />
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export const ProfileMenu = () => {
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  return (
    <Menu as="div" className="relative px-4">
      <Menu.Button className="flex rounded-full focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800">
        <span className="sr-only">Open user menu</span>
        <img
          className="h-8 w-8 rounded-full bg-white"
          src={user?.profilePicture ?? userAvatar}
          alt=""
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-4 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-600">
          <div className="space-y-1 px-2 pb-3 pt-2 shadow-md">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={cn(
                    active ? "bg-gray-100 dark:text-gray-900" : "",
                    "block px-4 py-2 text-gray-900 hover:text-gray-700 dark:text-white",
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
                    "block px-4 py-2 text-gray-900 hover:text-gray-700 dark:text-white",
                  )}
                >
                  Settings
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              <Button
                className="w-full"
                onClick={async () => {
                  queryClient.removeQueries();
                  await logout();
                  navigate("/login");
                }}
              >
                Log out
              </Button>
            </Menu.Item>
            <Menu.Item>
              <PWAInstallPrompt />
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export const Logo = () => {
  return (
    <Link
      to="/"
      className="flex gap-1 text-2xl font-semibold hover:bg-transparent"
    >
      <img src={RizmicIcon} alt="RizmicFits" className="h-8 w-8 rounded-full" />
    </Link>
  );
};

export default function MobileNav() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <Disclosure
      as="nav"
      className={`fixed top-0 z-20 w-full bg-white md:hidden dark:bg-gray-800`}
    >
      {({ open }) => (
        <>
          <div className="relative">
            <div className="mx-auto max-w-7xl">
              <div className="flex items-center justify-end border-gray-100 py-2 pt-4 md:justify-start md:space-x-10 dark:text-gray-900">
                <Logo />
                <div className="flex-1"></div>
                {isAuthenticated ? (
                  <ProfileMenu />
                ) : (
                  <HamburgerMenu open={open} isHomePage={isHomePage} />
                )}
                {isAuthenticated && (
                  <div className="fixed bottom-0 flex w-full items-center justify-evenly bg-white px-4 py-1 shadow dark:bg-slate-700">
                    {tabs.map((tab, index) => {
                      return (
                        <NavLink
                          key={index}
                          to={tab.href}
                          className={({ isActive }) =>
                            cn(
                              isActive && "bg-slate-600",
                              "flex flex-col items-center justify-center hover:bg-slate-600",
                            )
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <tab.icon
                                active={isActive}
                                className="h-7 w-7 transition-all"
                              />
                              <p
                                className={`text-xs font-bold ${
                                  isActive
                                    ? "text-cambridgeblue"
                                    : "text-gray-500 dark:text-gray-200"
                                }`}
                              >
                                {tab.name}
                              </p>
                            </>
                          )}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
