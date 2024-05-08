import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { changePasswordAPI } from "../../../api/userAPI";
import { useToast } from "../../../contexts/ToastContext";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/ui/inputs/Input";
import PasswordStrengthCheck from "../../../components/PasswordStrengthCheck";
import DialogModal from "../../../components/ui/modal/DialogModal";
import Button from "../../../components/ui/Button";

const changePasswordDataSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8),
});

type ChangePasswordDataType = z.infer<typeof changePasswordDataSchema>;

export default function ChangePassword({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { addToast } = useToast();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: changePasswordAPI,
    onSuccess: (data) => {
      if (data.message) {
        addToast({
          title: "Error",
          description: data.message,
          type: "error",
        });
      } else {
        addToast({
          title: "Success",
          description: "Password changed successfully",
          type: "success",
        });
      }
      reset();
    },
  });
  const { control, handleSubmit, reset, watch } =
    useForm<ChangePasswordDataType>({
      resolver: zodResolver(changePasswordDataSchema),
    });
  const newPassword = watch("newPassword");

  const onSubmit: SubmitHandler<ChangePasswordDataType> = (data) => {
    try {
      mutateAsync(data);
    } catch (error) {
      addToast({
        title: "Error",
        description:
          "Ensure the New Password and Confirm Password are the same",
        type: "error",
      });
    }
  };

  return (
    <DialogModal title="Change Password" open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input<ChangePasswordDataType>
          label="Current Password"
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          control={control}
        />
        <Input<ChangePasswordDataType>
          label="New Password"
          type="password"
          name="newPassword"
          placeholder="New Password"
          control={control}
        />
        {newPassword && <PasswordStrengthCheck password={newPassword} />}
        <Input<ChangePasswordDataType>
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          control={control}
        />

        <Button
          type="submit"
          disabled={isPending}
          isLoading={isPending}
          className="w-full"
        >
          Change Password
        </Button>
      </form>
    </DialogModal>
  );
}
