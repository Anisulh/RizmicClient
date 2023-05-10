import anisulRizmic from "./images/anisulRizmic.jpg";
import julfikarRizmic from "./images/julfikarRizmic.jpg";

export default function AboutUs() {
  return (
    <div className="bg-sWhite min-h-screen">
      <div className="container mx-auto my-40">
        <div>
          <h1 className="text-4xl font-bold my-16 text-center">
            About Us
          </h1>
          <div className="mx-auto flex flex-col gap-10">
            <div className="flex">
              <div className="">
                <h1 className="text-3xl font-bold  mb-3">
                  Our Purpose
                </h1>
                <p className="text text-raisinblack leading-relaxed">
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
                <h1 className="text-3xl mt-4 font-bold  mb-3">
                  How we started
                </h1>
                <p className="text text-raisinblack leading-relaxed">
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
        <div className="flex flex-col mt-10">
          <h1 className="flex text-3xl font-bold  py-3 mb-3 justify-center">
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
                <a
                  className="bg-blue-400 hover:bg-pink-400 hover:text-white transition-all rounded-full text-sWhite p-4"
                  href="https://instagram.com/uber.goose"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <svg
                    className="text-sWhite"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  className="bg-cambridgeblue hover:bg-blue-500 transition-all rounded-full text-sWhite p-4"
                  href="https://linkedin.com/in/anisulh"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
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
                <a
                  className="bg-blue-400 hover:bg-pink-400 hover:text-white transition-all rounded-full text-sWhite p-4"
                  href="https://instagram.com/julefikar"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <svg
                    className="text-sWhite"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  className="bg-cambridgeblue hover:bg-blue-500 transition-all rounded-full text-sWhite p-4"
                  href="https://linkedin.com/in/julfikarc"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
