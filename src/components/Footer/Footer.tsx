import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-6">
      <div className="mb-4 px-4 text-sm sm:px-8 md:px-16 lg:px-32">
        <h3 className="text-lg font-semibold">Site Links</h3>
        <div className="mx-auto grid max-w-lg grid-cols-2 gap-2">
          <Link to="/about-us" className="text-sm">
            About Us
          </Link>
          <Link to="/contact-us" className="text-sm">
            Contact Us
          </Link>
          <Link to="/privacy-policy" className="text-sm">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="text-sm">
            Terms of Service
          </Link>
        </div>
      </div>
      <p className="container mx-auto my-4 px-4 text-center text-sm">
        &copy; {new Date().getFullYear()} RizmicFits. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
