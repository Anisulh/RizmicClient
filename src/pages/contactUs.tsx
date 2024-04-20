import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactUs() {
  const form = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState<string>("");
  const validateEmail = (email: string) => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    } else {
      alert("You have entered an invalid email address!");
      return false;
    }
  };

  const onFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (form.current == null) return;
    if (validateEmail(email)) {
      try {
        const result = await emailjs.sendForm(
          import.meta.env.VITE_SERVICE_ID,
          import.meta.env.VITE_TEMPLATE_ID,
          form.current,
          import.meta.env.VITE_PUBLIC_KEY,
        );
        alert("Success! I will be in contact with you soon.");
        console.log(result);
      } catch (error) {
        alert("Oh no, something went wrong!");
        console.log(error);
      }
    } else {
      console.log("invalid email");
    }
  };
  return (
    <section className="bg-white mt-24 content-container">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center ">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500  sm:text-xl">
          Got a technical issue? Want to send feedback about a feature?
        </p>
        <form ref={form} onSubmit={onFormSubmit} className="space-y-8">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="user_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-ultrabg-ultramarineBlue focus:border-ultrabg-ultramarineBlue block w-full p-2.5 "
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium "
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="block p-3 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-ultrabg-ultramarineBlue focus:border-ultrabg-ultramarineBlue "
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-ultramarineBlue focus:border-ultrabg-ultramarineBlue "
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="border-2 py-3 px-5 text-sm font-medium text-center rounded-lg bg-ultramarineBlue sm:w-fit hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-ultramarineBlue text-white"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
