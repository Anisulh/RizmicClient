import { Dispatch, SetStateAction } from "react";
import DialogModal from "../../../components/ui/modal/DialogModal";
import Button from "../../../components/ui/Button";
import { useToast } from "../../../contexts/ToastContext";
import { useMutation } from "@tanstack/react-query";
import { deleteAccountAPI } from "../../../api/userAPI";
import { useNavigate } from "react-router-dom";

export default function DeleteAccountModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteAccountAPI,
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
          description: "Account deleted successfully",
          type: "success",
        });
        navigate("/");
      }
    },
  });

  return (
    <DialogModal open={open} setOpen={setOpen} title="Delete Account">
      <p>Are you sure you want to delete your account?</p>
      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant="destructive"
          onClick={() => mutate()}
          isLoading={isPending}
        >
          Delete Account
        </Button>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </DialogModal>
  );
}
