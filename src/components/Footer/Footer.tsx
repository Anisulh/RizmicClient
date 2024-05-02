import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-6">
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 mb-4 text-sm">
        <h3 className="text-lg font-semibold">Site Links</h3>
        <div className="grid grid-cols-2 gap-2 max-w-lg mx-auto">
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
      <p className="container mx-auto px-4 text-center my-4 text-sm">
        &copy; {new Date().getFullYear()} RizmicFits. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
