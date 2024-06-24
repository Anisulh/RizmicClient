import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useMutation } from "@tanstack/react-query";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { updateProfileImageAPI } from "../../../api/userAPI";
import { useToast } from "../../../contexts/ToastContext";
import DialogModal from "../../../components/ui/modal/DialogModal";

export default function ProfileImageModal({
  open,
  setOpen,
  refetchUserData,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refetchUserData: () => void;
}) {
  const { addToast } = useToast();
  const [image, setImage] = useState<Blob | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (image && image instanceof Blob) {
      setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);
  const removeImageFromUpload = () => {
    setImage(null);
    if (imageUploadRef.current) {
      imageUploadRef.current.value = "";
    }
  };
  const { mutate, isPending } = useMutation({
    mutationFn: updateProfileImageAPI,
    onSuccess(data) {
      if (data.message) {
        addToast({
          title: "Something went wrong.",
          description: data.message,
          type: "error",
        });
      } else {
        refetchUserData();
        setOpen(false);
      }
    },
  });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      mutate(formData);
    }
  };

  return (
    <>
      <DialogModal open={open} setOpen={setOpen} title="Profile Image Upload">
        <div className="mt-2">
          <form onSubmit={handleSubmit}>
            <input
              ref={imageUploadRef}
              className="block w-full rounded-md border border-solid border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 file:rounded-md file:border file:border-gray-200 file:bg-cambridgeblue file:shadow-sm focus:border-ultramarineBlue focus:bg-white focus:text-gray-700 focus:outline-none"
              onChange={(e) => setImage(e.target.files && e.target.files[0])}
              accept="image/png, image/jpeg, image/jpg"
              type="file"
              id="image"
            />
            {imageUrl && image && (
              <div>
                <p className="mb-2">Image Preview:</p>
                <div className="flex items-center justify-center">
                  <div className="relative w-32">
                    <img src={imageUrl} alt="Chosen clothing" width="100px" />{" "}
                    <button
                      type="button"
                      className="absolute -top-3 right-2 text-raisinblack hover:text-red-600"
                      onClick={removeImageFromUpload}
                    >
                      <XMarkIcon className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-4 flex items-center justify-center">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-ultramarineBlue px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="flex items-center justify-center bg-transparent">
                    <div
                      className="spinner-border inline-block size-5 animate-spin rounded-full border-4 bg-transparent text-gray-300"
                      role="status"
                    >
                      <span className="sr-only">Loading</span>
                    </div>
                    Processing...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </DialogModal>
    </>
  );
}
