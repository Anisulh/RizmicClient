import { Link } from "react-router-dom"
import './footer.css'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sWhite to-cambridgeblue py-6 mt-12 footer--pin">
    {/* <ul className="social-links">
      <li>
        <a href="#fds">
          <img src="facebook-icon.png" alt="Facebook" />
        </a>
      </li>
      <li>
        <a href="#fds">
          <img src="twitter-icon.png" alt="Twitter" />
        </a>
      </li>
      <li>
        <a href="#fds">
          <img src="instagram-icon.png" alt="Instagram" />
        </a>
      </li>
    </ul> */}
    <div className="flex flex-col justify-start gap-y-1 px-32 text-sm text-raisinblack">
      <div className="text-xl font-semibold">Site Links</div>
      <Link
        className="max-w-[fit-content] min-w-[fit-content]"
        to="/aboutus"
      >
        About Us
      </Link>
      <Link
        className="max-w-[fit-content] min-w-[fit-content]"
        to="/contactus"
      >
        Contact Us
      </Link>
    </div>
    <div className="container mx-auto px-4 text-center text-raisinblack">
      &copy; {new Date().getFullYear()} Rizmic. All rights reserved.
    </div>
  </footer>
  )
}

export default Footer