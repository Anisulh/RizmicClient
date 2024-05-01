import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-6">
      <div className="flex flex-col justify-start gap-y-1 px-4 sm:px-8 md:px-16 lg:px-32 text-sm">
        <h3 className="text-lg font-semibold">Site Links</h3>
        <Link to="/about-us" className="text-sm">About Us</Link>
        <Link to="/contact-us" className="text-sm">Contact Us</Link>
      </div>
      <p className="container mx-auto px-4 text-center my-4 text-sm">
        &copy; {new Date().getFullYear()} RizmicFits. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
