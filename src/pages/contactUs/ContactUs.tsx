import { useRef } from "react";
import { sendForm } from "@emailjs/browser";
import Input from "../../components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactUsSchema, ContactUsSchemaType } from "./contactUsSchema";
import { useToast } from "../../contexts/ToastContext";

export default function ContactUs() {
  const form = useRef<HTMLFormElement>(null);
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactUsSchemaType>({ resolver: zodResolver(ContactUsSchema) });

  const onSubmit: SubmitHandler<ContactUsSchemaType> = async (data) => {
    console.log(data);
    if (form.current == null) return;
    try {
      const result = await sendForm(
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
      console.log(result);
    } catch (error) {
      addToast({
        title: "Something went wrong.",
        description: "Please try again.",
        type: "error",
      });
      console.log(error);
    }
  };
  return (
    <section className="content-container">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center ">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center sm:text-xl">
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
            register={register}
            error={errors.email}
            errorText={errors.email?.message}
          />

          <Input<ContactUsSchemaType>
            label="Subject"
            type="text"
            name="subject"
            placeholder="Subject"
            register={register}
            error={errors.subject}
            errorText={errors.subject?.message}
          />

          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              Your message
            </label>
            <textarea
              id="message"
              {...register("message")}
              rows={6}
              className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-ultramarineBlue focus:border-ultramarineBlue "
              placeholder="Leave a comment..."
            />
          </div>
          <div className="w-full text-center">
            <button
              type="submit"
              className="border-2 py-3 px-5 text-sm font-medium text-center rounded-lg bg-ultramarineBlue sm:w-fit hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-ultramarineBlue text-white"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
