import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProfileImageModal from "./components/ProfileImageModal";
import { useAuth } from "../../contexts/UserContext";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/spinner/Spinner";
import Avatar from "../../assets/userAvatar.webp";
import EditProfileModal from "./components/EditProfileModal";

export default function Profile() {
  const { user, refetchUserData } = useAuth();

  const [editingProfile, setEditingProfile] = useState(false);

  const [showProfileImageEdit, setShowProfileImageEdit] = useState(false);
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);
  const { isPending: queryPending } = useQuery({
    queryKey: ["user"],
    queryFn: refetchUserData,
  });

  if (queryPending) {
    return <Spinner />;
  }

  return (
    <div className="max-w-7xl mx-auto content-container">
      <div className="w-full h-60 bg-gradient-to-tr from-cambridgeblue to-ultramarineBlue rounded-2xl"></div>
      <div className="flex flex-col max-w-5xl mx-auto gap-10">
        <div className="flex gap-2">
          <div className="relative flex items-center justify-center h-full">
            <img
              className="rounded-full h-20 w-20 -mt-6 bg-white p-1"
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
                className="absolute -top-6 backdrop-brightness-50 text-white w-20 h-20 rounded-full flex items-center justify-center transition-all"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          <div>
            <h1 className="font-medium text-xl">{`${user?.firstName} ${user?.lastName}`}</h1>
            <p className="font-medium">{user?.email}</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto w-full">
          <div className="border-2 dark:border-gray-700 dark:bg-gray-700 rounded-xl px-8  py-4">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-medium">Profile Information</h1>
                <Button
                  variant="outline"
                  onClick={() => setEditingProfile(true)}
                >
                  <PencilIcon className="h-4 w-4 inline mr-1" />
                  Edit
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center">
                  <p>First Name:</p>
                  <p className="font-medium">{user?.firstName}</p>
                </div>
                <div className="flex gap-4 items-center">
                  <p>Last Name:</p>
                  <p className="font-medium">{user?.lastName}</p>
                </div>
                <div className="flex gap-4 items-center">
                  <p>Email:</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div className="flex gap-4 items-center">
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
