import React from "react";
import homeImage from "./images/RizmicHome.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-sWhite">
      <main className="container mx-auto px-4">
        <section className="text-center mt-16">
          <h1 className="text-4xl font-bold text-slategrey mb-2">
            Generate Outfits with Rizmic
          </h1>
          <p className="text-xl text-raisinblack">
            Discover your unique style and find outfits tailored just for you.
          </p>
        </section>
        <section className="">
          <div className="bg-sWhite shadow-md flex justify-between items-center p-8 rounded-lg">
            <div className="text-lg max-w-md">
              <h2 className="text-2xl font-semibold text-raisinblack mb-1">
                Confused on where to begin?
              </h2>
              <p className="mt-2 text-slategrey mb-4">
                Rizmic makes it easy for you to discover your unique style and
                create the perfect outfit. Get started today!
              </p>
              <div className="mt-3 text-slategrey">
                <h2 className="text-raisinblack text-xl">
                  How can you embark on this style adventure?
                </h2>
                <p className="mt-2">
                  1. Fill your virtual wardrobe with all your clothing items -
                  the more you add, the better our algorithm performs!
                </p>
                <p>2. Choose the style you&apos;re aiming for.</p>
              </div>
              <div className="flex flex-col justify-center items-center text-slategrey mt-3 mb-3">
                <p>That&apos;s all there is to it!</p>
                <p>Click the button below and watch the magic unfold!</p>
              </div>
              <div className="flex justify-center">
                <Link to="/generatefit">
                  <div className="inline-flex">
                    <button className="bg-gradient-to-r from-amber-100 to-cambridgeblue text-raisinblack py-2 px-6 rounded-md">
                      Generate
                    </button>
                  </div>
                </Link>
              </div>
            </div>
            <div className="h-full w-auto p-4">
              <img
                className="rounded-lg h-full w-full object-cover"
                src={homeImage}
                alt="homeImage"
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gradient-to-r from-sWhite to-cambridgeblue py-6 mt-12">
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
    </div>
  );
}
