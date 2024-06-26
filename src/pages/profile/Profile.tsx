import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import { useState } from "react";
import ProfileImageModal from "./components/ProfileImageModal";
import { useAuth } from "../../contexts/UserContext";
import Button from "../../components/ui/Button";
import Avatar from "../../assets/userAvatar.webp";
import EditProfileModal from "./components/EditProfileModal";

export default function Profile() {
  const { user, refetchUserData } = useAuth();

  const [editingProfile, setEditingProfile] = useState(false);

  const [showProfileImageEdit, setShowProfileImageEdit] = useState(false);
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);

  return (
    <div className="content-container mx-auto max-w-7xl">
      <div className="h-60 w-full rounded-2xl bg-gradient-to-tr from-cambridgeblue to-ultramarineBlue"></div>
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-2">
        <div className="flex gap-2">
          <div className="relative flex h-full items-center justify-center">
            <img
              className="-mt-6 h-20 w-20 rounded-full bg-white p-1"
              src={user?.profilePicture ?? Avatar}
              alt="Profile"
              onMouseOver={() => setShowProfileImageEdit(true)}
              onMouseLeave={() => setShowProfileImageEdit(false)}
              onFocus={() => null}
            />
            {showProfileImageEdit && (
              <button
                type="button"
                onMouseOver={() => setShowProfileImageEdit(true)}
                onMouseLeave={() => setShowProfileImageEdit(false)}
                onFocus={() => null}
                onClick={() => setShowProfileImageModal(true)}
                className="absolute -top-6 flex h-20 w-20 items-center justify-center rounded-full text-white backdrop-brightness-50 transition-all"
              >
                <PencilIcon className="size-5" />
              </button>
            )}
          </div>

          <div>
            <h1 className="text-xl font-medium">{`${user?.firstName} ${user?.lastName}`}</h1>
            <p className="font-medium">{user?.email}</p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-4xl px-2">
          <div className="rounded-xl border-2 p-4 dark:border-gray-700 dark:bg-gray-700">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-xl font-medium">Profile Information</h1>
                <Button
                  variant="outline"
                  onClick={() => setEditingProfile(true)}
                >
                  <PencilIcon className="mr-1 inline size-4" />
                  Edit
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <p>First Name:</p>
                  <p className="font-medium">{user?.firstName}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p>Last Name:</p>
                  <p className="font-medium">{user?.lastName}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p>Email:</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p>Phone Number:</p>
                  <p className="font-medium">{user?.phoneNumber || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal
        user={user}
        refetchUserData={refetchUserData}
        editingProfile={editingProfile}
        setEditingProfile={setEditingProfile}
      />

      <ProfileImageModal
        open={showProfileImageModal}
        setOpen={setShowProfileImageModal}
        refetchUserData={refetchUserData}
      />
    </div>
  );
}
