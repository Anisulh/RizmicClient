import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { forgotPasswordAPI } from "../../api/userAPI";
import { useToast } from "../../contexts/ToastContext";
import Input from "../../components/ui/inputs/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordSchemaType,
  forgotPasswordSchema,
} from "./forgotPasswordSchema";
import Button from "../../components/ui/Button";

function ForgotPassword() {
  const { addToast } = useToast();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: forgotPasswordAPI,
    onSuccess(data) {
      if (data.message) {
        addToast({
          title: "Something went wrong.",
          description: data.message,
          type: "error",
        });
      } else {
        navigate("/login");
      }
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordSchemaType> = async (data) => {
    try {
      await mutateAsync(data);
      addToast({
        title: "Email sent.",
        description: `If your email was registered, you will receive an email to reset password.`,
        type: "success",
      });
    } catch (error) {
      addToast({
        title: "Something went wrong.",
        description: "Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-lg items-center">
      <div className="w-full">
        <h1 className="text-4xl font-bold">Forgot Password</h1>
        <p>Enter your email to reset your password</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
          <Input<ForgotPasswordSchemaType>
            label="Email"
            type="email"
            name="email"
            placeholder="Email"
            control={control}
          />
          <div className="mt-6 text-center">
            <Button type="submit" isLoading={isPending}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
