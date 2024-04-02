import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sWhite to-cambridgeblue py-6">
      <div className="flex flex-col justify-start gap-y-1 px-4 sm:px-8 md:px-16 lg:px-32 text-sm text-raisinblack">
        <div className="text-xl font-semibold">Site Links</div>
        <Link
          className="max-w-[fit-content] min-w-[fit-content]"
          to="/about-us"
        >
          About Us
        </Link>
        <Link
          className="max-w-[fit-content] min-w-[fit-content]"
          to="/contact-us"
        >
          Contact Us
        </Link>
      </div>
      <div className="container mx-auto px-4 text-center text-raisinblack">
        &copy; {new Date().getFullYear()} RizmicFits. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
