import { Dialog, Transition } from "@headlessui/react";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useMutation } from "@tanstack/react-query";
import React, {
  Dispatch,
  FormEvent,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { updateProfileImageAPI } from "../../api/userAPI";
import { IErrorNotificationParams } from "../../contexts/StatusContext";
import { IUser } from "../../interface/userInterface";

export default function ProfileImageModal({
  open,
  setOpen,
  setError,
  user,
  refetchUserData
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<IErrorNotificationParams>>;
  user: IUser | null;
  refetchUserData: () => void
}) {
  const [image, setImage] = useState<Blob | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (image && image instanceof Blob) {
      setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);
  function closeModal() {
    setOpen(false);
  }

 
  const removeImageFromUpload = () => {
    setImage(null);
    if (imageUploadRef.current) {
      imageUploadRef.current.value = "";
    }
  };
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ data, token }: { data: FormData; token: string }) =>
      updateProfileImageAPI(data, token),
    onSuccess(data) {
      if (data.message) {
        setError({ message: data.message });
      } else {
        refetchUserData()
        setOpen(false);
      }
    },
  });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (user && image) {
      const formData = new FormData();
      formData.append('image', image)
      mutate({ data: formData, token: user.token });
    }
  };

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Profile Image Upload
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                      <input
                        ref={imageUploadRef}
                        className="block w-full px-3 py-1.5 bg-white border border-solid border-gray-300 rounded-md focus:text-gray-700 focus:bg-white focus:border-ultramarineBlue focus:outline-none text-sm text-gray-700 file:rounded-md file:border file:border-gray-200 file:bg-cambridgeblue file:shadow-sm"
                        onChange={(e) =>
                          setImage(e.target.files && e.target.files[0])
                        }
                        accept="image/png, image/jpeg, image/jpg"
                        type="file"
                        id="image"
                      />
                      {imageUrl && image && (
                        <div>
                          <p className="mb-2">Image Preview:</p>
                          <div className="flex items-center justify-center">
                            <div className="relative w-32 ">
                            <img
                              src={imageUrl}
                              alt="Chosen clothing"
                              width="100px"
                            />{" "}
                            <button
                              type="button"
                              className="absolute -top-3 right-2 text-raisinblack hover:text-red-600"
                              onClick={removeImageFromUpload}
                            >
                              <XMarkIcon className="h-5 w-5 " />
                            </button>
                          </div>
                          </div>
                          
                        </div>
                      )}
                      <div className="flex items-center justify-center mt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-ultramarineBlue px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="flex justify-center items-center bg-transparent">
                              <div
                                className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full bg-transparent text-gray-300"
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
