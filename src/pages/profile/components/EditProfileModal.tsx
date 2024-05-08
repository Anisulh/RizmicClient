import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { useToast } from "../../../contexts/ToastContext";
import { useMutation } from "@tanstack/react-query";
import { IUser } from "../../../interface/userInterface";
import { updateProfileAPI } from "../../../api/userAPI";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DialogModal from "../../../components/ui/modal/DialogModal";
import Input from "../../../components/ui/inputs/Input";
import formatPhoneNumber from "../../../utils/formatPhoneNumber";
import Button from "../../../components/ui/Button";

const editingProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().optional(),
});

type EditingProfileDataType = z.infer<typeof editingProfileSchema>;

interface EditProfileModalProps {
  user: IUser | null;
  refetchUserData: () => void;
  editingProfile: boolean;
  setEditingProfile: Dispatch<SetStateAction<boolean>>;
}
export default function EditProfileModal({
  user,
  refetchUserData,
  editingProfile,
  setEditingProfile,
}: EditProfileModalProps) {
  const { addToast } = useToast();

  const { control, handleSubmit, reset } = useForm<EditingProfileDataType>({
    resolver: zodResolver(editingProfileSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      phoneNumber: user?.phoneNumber,
    },
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProfileAPI,
    onSuccess(data) {
      if (data.message) {
        addToast({
          title: "Something went wrong.",
          description: data.message,
          type: "error",
        });
      } else {
        refetchUserData();
      }
      reset();
    },
  });

  const onSubmit: SubmitHandler<EditingProfileDataType> = (data) => {
    try {
      mutateAsync(data);
    } catch (error) {
      addToast({
        title: "Something went wrong.",
        description: "Unable to update profile",
        type: "error",
      });
    }

    setEditingProfile(false);
  };
  return (
    <DialogModal
      open={editingProfile}
      setOpen={setEditingProfile}
      title="Edit Profile Information"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input<EditingProfileDataType>
          label="First Name"
          type="text"
          name="firstName"
          placeholder="First Name"
          control={control}
        />
        <Input<EditingProfileDataType>
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Last Name"
          control={control}
        />

        <Input<EditingProfileDataType>
          label="Phone Number"
          type="tel"
          name="phoneNumber"
          required={false}
          placeholder="Phone Number"
          control={control}
          formatInput={formatPhoneNumber}
        />
        <div className="flex items-center justify-center mt-10">
          <Button type="submit" isLoading={isPending}>
            Save Changes
          </Button>
        </div>
      </form>
    </DialogModal>
  );
}
