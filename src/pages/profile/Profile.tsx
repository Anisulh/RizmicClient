import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import { useEffect, useState } from "react";
import ProfileImageModal from "./components/ProfileImageModal";
import { useAuth } from "../../contexts/UserContext";
import Button from "../../components/ui/Button";
import Avatar from "../../assets/userAvatar.webp";
import EditProfileModal from "./components/EditProfileModal";
import Spinner from "../../components/ui/spinner/Spinner";
import { useFetchUser } from "../../hooks/useFetchUser";
import {
  getClothesCache,
  getFriendsCache,
  getOutfitsCache,
} from "../../utils/indexDB";

export default function Profile() {
  const { user, refetchUserData } = useAuth();
  const [friendsLength, setFriendsLength] = useState(0);
  const [outfitsLength, setOutfitsLength] = useState(0);
  const [clothesLength, setClothesLength] = useState(0);

  useEffect(() => {
    const updateLengths = async () => {
      const friends = await getFriendsCache();
      const outfits = await getOutfitsCache();
      const clothes = await getClothesCache();

      setFriendsLength(friends?.length || 0);
      setOutfitsLength(outfits?.length || 0);
      setClothesLength(clothes?.length || 0);
    };
    updateLengths();
  }, []);

  const [editingProfile, setEditingProfile] = useState(false);
  const [showProfileImageEdit, setShowProfileImageEdit] = useState(false);
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);

  const { isLoading } = useFetchUser();

  if (isLoading) return <Spinner />;

  return (
    <div className="content-container mx-auto max-w-7xl">
      <div className="h-60 w-full rounded-2xl bg-gradient-to-tr from-cambridgeblue to-ultramarineBlue"></div>
      {!user ? (
        <div className="mx-auto mt-20 flex max-w-5xl items-center justify-center px-2 text-center text-lg">
          Unable to fetch you&apos;re profile. Please check your connection.
        </div>
      ) : (
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-2">
          <div className="flex w-full flex-col items-center md:flex-row md:justify-between">
            <div className="flex w-full gap-2">
              <div className="relative flex h-full items-center justify-center">
                <img
                  className="-mt-6 h-20 w-20 rounded-full bg-white p-1"
                  src={user.profilePicture ?? Avatar}
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
                <h1 className="text-xl font-medium">{`${user.firstName} ${user.lastName}`}</h1>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            <div className="mx-auto w-full max-w-4xl px-2">
              <div className="mt-8 flex w-full items-center justify-evenly rounded-xl bg-slate-700 p-2 md:mt-0 md:bg-inherit">
                <div className="flex flex-col items-center">
                  <p className="font-medium">{clothesLength}</p>
                  <p className="font-bold">Clothes</p>
                </div>
                <span>|</span>
                <div className="flex flex-col items-center">
                  <p className="font-medium">{outfitsLength}</p>
                  <p className="font-bold">Outfits</p>
                </div>
                <span>|</span>
                <div className="flex flex-col items-center">
                  <p className="font-medium">{friendsLength}</p>
                  <p className="font-bold">Friends</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto w-full max-w-4xl px-2">
            <div className="rounded-xl border-2 p-4 dark:border-slate-700 dark:bg-slate-700">
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
                    <p className="font-medium">{user.firstName}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p>Last Name:</p>
                    <p className="font-medium">{user.lastName}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p>Email:</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p>Phone Number:</p>
                    <p className="font-medium">{user.phoneNumber || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
