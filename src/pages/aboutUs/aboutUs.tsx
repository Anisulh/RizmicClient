import React, { useState } from "react";
import anisulRizmic from "./images/anisulRizmic.jpg";
import julfikarRizmic from "./images/julfikarRizmic.jpg";
import { SocialIcon } from "react-social-icons";

export default function AboutUs() {
  return (
    <div className="bg-sWhite min-h-screen">
      <div className="container mx-auto mt-24">
        <div>
          <h1 className="text-3xl font-bold text-slategrey mb-6 text-left">
            About Us
          </h1>
          <div className="mx-auto">
            <div className="flex">
              <div className="">
                <h1 className="text-xl font-bold text-slategrey mb-3">
                  Our Purpose
                </h1>
                <p className="text-m text-raisinblack leading-relaxed">
                  We believe that style is a form of self-expression, and
                  everyone should have the opportunity to showcase their
                  creativity and authenticity through their wardrobe choices. By
                  combining our love for fashion with technology, we strive to
                  make Rizmic an indispensable tool for people looking to
                  explore and refine their personal style.
                </p>
              </div>
            </div>
            <div className="flex">
              <div>
                <h1 className="text-xl mt-4 font-bold text-slategrey mb-3">
                  How we started
                </h1>
                <p className="text-m text-raisinblack leading-relaxed">
                  Rizmic was born out of the shared passion of two friends who
                  wanted to revolutionize the way people approach fashion.
                  Recognizing the challenges individuals face when trying to
                  discover their unique style and find outfits that genuinely
                  express their personalities, we sought to create a platform
                  that simplifies this process.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="flex text-2xl font-bold text-slategrey py-3 mb-3 justify-center">
            The Masterminds:
          </h1>
          <div className="flex justify-center gap-x-8">
            <div className="flex flex-col items-center">
              <div className="relative rounded-lg h-96 w-80 overflow-hidden">
                <img src={anisulRizmic} alt="Anisul" />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-slategrey text-sWhite text-sm shadow-md">
                  Anisul H.
                </div>
              </div>
              <div className="mt-2 h-auto w-80 text-center">
                Anisul, 22, graduated from Hunter College with his degree in
                Biology. He currently works as a Software Engineer at GoBeyond
                Labs. He has a passion for software development and intends to
                get into the field of ML and AI.
              </div>
              <div className="flex gap-2">
                <SocialIcon url="https://www.linkedin.com/in/anisulh/" />
                <SocialIcon url="https://instagram.com/uber.goose" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative rounded-lg h-96 w-80 overflow-hidden">
                <img src={julfikarRizmic} alt="Julfikar" />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-slategrey text-sWhite text-sm shadow-md">
                  Julfikar C.
                </div>
              </div>
              <div className="mt-2  h-auto w-80 text-center">
                Julfikar, 21, is in his senior year of studying Computer Science
                at Hunter College. He will be joining as a Software Engineering
                Intern for Mastercard in Summer 2023.
              </div>
              <div className="flex gap-2">
                <SocialIcon url="https://www.linkedin.com/in/julfikarc" />
                <SocialIcon url="https://instagram.com/julefikar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
