import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/UserContext";
import RizmicIcon from "../../../assets/RFIcon.png";
import { ProfileMenu } from "./MobileNav";

export default function NonMobileNav() {
  const { isAuthenticated } = useAuth();

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
                  <ProfileMenu />
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
