import { useParams } from "react-router-dom";
import Spinner from "../../components/ui/spinner/Spinner";
import Avatar from "../../assets/userAvatar.webp";
import useFetchFriendProfile from "../../hooks/useFetchFriendProfile";
import ViewOnlyClothingCard from "../../components/ViewOnlyClothingCard";
import ViewOnlyOutfitCard from "../../components/ViewOnlyOutfitCard";
import formatDate from "../../utils/formatDate";

export default function FriendProfile() {
  const { friendId } = useParams();
  const { data: user, isLoading } = useFetchFriendProfile(friendId);
  if (isLoading) {
    return <Spinner />;
  }
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
                />
              </div>

              <div>
                <h1 className="text-xl font-medium">{`${user.firstName} ${user.lastName}`}</h1>
                <p className="text-sm font-medium md:text-base">
                  Since: {formatDate(user.since)}
                </p>
              </div>
            </div>
            <div className="mx-auto w-full max-w-4xl px-2">
              <div className="mt-8 flex w-full items-center justify-evenly rounded-xl bg-slate-700 p-2 md:mt-0 md:bg-inherit">
                <div className="flex flex-col items-center">
                  <p className="font-medium">{user.sharedClothes.length}</p>
                  <p className="font-bold">Shared Clothes</p>
                </div>
                <span>|</span>
                <div className="flex flex-col items-center">
                  <p className="font-medium">{user.sharedOutfits.length}</p>
                  <p className="font-bold">Shared Outfits</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto w-full max-w-4xl space-y-8 px-2">
            <div className="rounded-xl border-2 p-4 dark:border-slate-700 dark:bg-slate-700">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h1 className="text-xl font-medium">Shared Clothes</h1>
                </div>
                {user.sharedClothes.length < 1 ? (
                  <p className="my-4 w-full text-center">
                    No clothes shared yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {user.sharedClothes.map((clothe) => (
                      <ViewOnlyClothingCard
                        clothe={clothe.clothingItem}
                        key={clothe._id}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>{" "}
            <div className="rounded-xl border-2 p-4 dark:border-slate-700 dark:bg-slate-700">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h1 className="text-xl font-medium">Shared Outfits</h1>
                </div>
                {user.sharedOutfits.length < 1 ? (
                  <p className="my-4 w-full text-center">
                    No outfits shared yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {user.sharedOutfits.map((outfit) => (
                      <ViewOnlyOutfitCard
                        outfit={outfit.outfitItem}
                        key={outfit._id}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
