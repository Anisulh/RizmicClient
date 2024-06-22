import MobileNav from "./components/MobileNav";
import NonMobileNav from "./components/NonMobileNav";

export default function Navbar() {
  return (
    <>
      <NonMobileNav />
      <MobileNav />
    </>
  );
}
