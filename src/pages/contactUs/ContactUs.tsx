import { useRef } from "react";
import { sendForm } from "@emailjs/browser";
import Input from "../../components/ui/inputs/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactUsSchema, ContactUsSchemaType } from "./contactUsSchema";
import { useToast } from "../../contexts/ToastContext";

export default function ContactUs() {
  const form = useRef<HTMLFormElement>(null);
  const { addToast } = useToast();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactUsSchemaType>({ resolver: zodResolver(ContactUsSchema) });

  const onSubmit: SubmitHandler<ContactUsSchemaType> = async () => {
    if (form.current == null) return;
    try {
      await sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_PUBLIC_KEY,
      );
      addToast({
        title: "Success!",
        description: "I will be in contact with you soon.",
        type: "success",
      });
      reset();
    } catch (error) {
      addToast({
        title: "Something went wrong.",
        description: "Please try again.",
        type: "error",
      });
    }
  };
  return (
    <section className="content-container">
      <div className="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
        <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight">
          Contact Us
        </h2>
        <p className="mb-8 text-center font-light sm:text-xl lg:mb-16">
          Got a technical issue? Want to send feedback about a feature?
        </p>
        <form
          ref={form}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <Input<ContactUsSchemaType>
            label="Your email"
            type="email"
            name="email"
            placeholder="Your email"
            control={control}
          />

          <Input<ContactUsSchemaType>
            label="Subject"
            type="text"
            name="subject"
            placeholder="Subject"
            control={control}
          />

          <div className="sm:col-span-2">
            <label htmlFor="message" className="mb-2 block text-sm font-medium">
              Your message
            </label>
            <textarea
              id="message"
              {...register("message")}
              rows={6}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm shadow-sm focus:border-ultramarineBlue focus:ring-ultramarineBlue"
              placeholder="Leave a comment..."
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>
          <div className="w-full text-center">
            <button
              type="submit"
              className="rounded-lg border-2 bg-ultramarineBlue px-5 py-3 text-center text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-ultramarineBlue sm:w-fit"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
