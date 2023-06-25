import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

interface MessageProps {
  message: string;
}

const ProductDisplay = () => (
  <section className="flex justify-center items-center min-h-screen bg-sWhite">
    <div className="container mx-auto">
      <div className="mx-auto">
        <h2 className="text-xl sm:text-center font-bold tracking-tight text-raisinblack sm:text-2xl">
          Simple no-tricks pricing
        </h2>
        <p className="mt-1 text-lg leading-8 text-slategrey">
          We believe in being completely transparent with our users so we
          provided straight forward pricing plan with no hidden fees.
        </p>
        <p className="pb-3 mt-1 text-lg leading-8 text-slategrey">
          Rest assured that your purchase is secure and protected through
          Stripe&apos;s robust encryption methods, ensuring that your payment
          information is safely transmitted and kept confidential.
        </p>
      </div>
      <table className="border border-ourGrey divide-y divide-ourGrey w-full">
        <thead>
          <tr>
            <th className="p-3">Tier</th>
            <th className="p-3">Price</th>
            <th className="p-3">Features</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-50">
            <td className="p-3">Basic Tier</td>
            <td className="p-3">Free</td>
            <td className="p-3">
              <ul className="list-disc list-inside">
                <li>Access To Wardrobe Manager</li>
                <li>3 Outfit Generations A Month</li>
                <li>Ads</li>
              </ul>
            </td>
            <td></td>
          </tr>
          <tr className="bg-green-100">
            <td className="p-3">Monthly Premium</td>
            <td className="p-3">
              $7.99
              <p className="text-xs text-raisinblack">Billed monthly</p>
            </td>
            <td className="p-3">
              <ul className="list-disc list-inside">
                <li>Access To Wardrobe Manager</li>
                <li>Unlimited Outfit Generations</li>
                <li>Advanced Style Insights</li>
                <li>Priority Support</li>
                <li>No Ads</li>
              </ul>
            </td>
            <td className="p-3">
              <form action="/create-checkout-session" method="POST">
                <button
                  type="submit"
                  className="bg-ultramarineBlue hover:bg-blue-600 text-sWhite font-semibold py-2 px-4 rounded"
                >
                  <a href="https://buy.stripe.com/28oaGsdb3ajHapGdQQ">
                    Checkout
                  </a>
                </button>
              </form>
            </td>
          </tr>
          <tr className="bg-teal-200">
            <td className="p-3">Yearly Premium</td>
            <td className="p-3">
              <div className="flex gap-1">
                $72.00
                <p>($6/Month)</p>
              </div>
              <p className="text-sm text-raisinblack">Save $24 a year!</p>
              <p className="text-xs text-raisinblack">Billed once annually</p>
            </td>
            <td className="p-3">
              {/* <ul className="list-disc list-inside">
                <li>Access To Wardrobe Manager</li>
                <li>Unlimited Outfit Generations</li>
                <li>Advanced Style Insights</li>
                <li>Priority Support</li>
                <li>No Ads</li>
              </ul> */}
            </td>
            <td className="p-3">
              <form action="/create-checkout-session" method="POST">
                <button
                  type="submit"
                  className="bg-ultramarineBlue hover:bg-blue-600 text-sWhite font-semibold py-2 px-4 rounded"
                >
                  <a href="https://buy.stripe.com/00gg0M2wp77v7duaEF">
                    Checkout
                  </a>
                </button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
);

const Message: React.FC<MessageProps> = ({ message }) => (
  <section className="flex justify-center items-center min-h-screen">
    <p>{message}</p>
  </section>
);

export default function Pricing() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready.",
      );
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
}
