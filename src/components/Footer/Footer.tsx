import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-6">
      <div className="flex flex-col justify-start gap-y-1 px-4 sm:px-8 md:px-16 lg:px-32 text-sm">
        <div className="text-xl font-semibold">Site Links</div>
        <Link to="/about-us">About Us</Link>
        <Link to="/contact-us">Contact Us</Link>
      </div>
      <div className="container mx-auto px-4 text-center my-4">
        &copy; {new Date().getFullYear()} RizmicFits. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
