import { useState } from "react";
import {
  acceptFriendRequestAPI,
  getFriendRequests,
  unfriendAPI,
} from "../../api/friendsAPI";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/ui/spinner/Spinner";
import Button from "../../components/ui/Button";
import AddFriendModal from "./components/AddFriendModal";
import { useToast } from "../../contexts/ToastContext";
import {
  CheckIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import useFriends from "../../hooks/useFriends";

export default function Friends() {
  const { addToast } = useToast();
  const [addFriendModalOpen, setAddFriendModalOpen] = useState(false);

  const {
    isPending: friendQueryPending,
    data: friends,
    refetch: refetchFriends,
  } = useFriends();
  const {
    isPending: friendRequestQueryPending,
    data: friendRequests,
    refetch: refetchFriendRequests,
  } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  if (friendQueryPending || friendRequestQueryPending) {
    return <Spinner />;
  }

  const handleAcceptRequest = async (userId: string) => {
    try {
      await acceptFriendRequestAPI(userId);
      addToast({
        title: "Friend request accepted",
        type: "success",
      });
      refetchFriendRequests();
      refetchFriends();
    } catch (error) {
      addToast({
        title: "Unable to accept request",
        type: "error",
      });
    }
  };

  const handleUnfriend = async (userId: string) => {
    try {
      await unfriendAPI(userId);
      addToast({
        title: "Friend removed",
        type: "success",
      });
      refetchFriendRequests();
      refetchFriends();
    } catch (error) {
      addToast({
        title: "Unable to remove friend",
        type: "error",
      });
    }
  };

  return (
    <div className="content-container mx-auto max-w-7xl space-y-10 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold md:text-4xl">Friends</h1>
        <Button
          variant="ghost"
          onClick={() => setAddFriendModalOpen(true)}
          className="flex gap-2 p-1 hover:bg-slate-600"
        >
          <p className="hidden md:block">Search</p>
          <MagnifyingGlassIcon className="size-6" />
        </Button>
      </div>
      <h2 className="text-xl font-medium md:text-2xl">Your Friends</h2>
      <div>
        {friends?.map((friend) => (
          <div
            key={friend._id}
            className="flex items-center justify-between rounded-xl bg-slate-600 p-4"
          >
            <div className="flex items-center gap-2">
              {friend.profilePicture && (
                <img
                  src={friend.profilePicture}
                  alt={friend.firstName}
                  className="size-8 rounded-full"
                />
              )}
              <div>
                <h2 className="font-bold">
                  {friend.firstName} {friend.lastName}
                </h2>
              </div>
            </div>
            <div className="space-x-2">
              <Button
                variant="destructive"
                onClick={() => handleUnfriend(friend._id)}
              >
                Unfriend
              </Button>
            </div>
          </div>
        ))}
      </div>
      {friendRequests && friendRequests.length > 0 && (
        <>
          <h2 className="text-xl font-medium md:text-2xl">Friend Requests</h2>
          <div>
            {friendRequests?.map(({ requester }) => (
              <div
                key={requester._id}
                className="flex items-center justify-between rounded-xl bg-slate-600 p-4"
              >
                <div className="flex items-center gap-2">
                  {requester.profilePicture && (
                    <img
                      src={requester.profilePicture}
                      alt={requester.firstName}
                      className="size-8 rounded-full"
                    />
                  )}
                  <div>
                    <h2 className="font-bold">
                      {requester.firstName} {requester.lastName}
                    </h2>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="primary"
                    onClick={() => handleAcceptRequest(requester._id)}
                  >
                    <CheckIcon className="size-5" />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleUnfriend(requester._id)}
                  >
                    <XMarkIcon className="size-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <AddFriendModal
        open={addFriendModalOpen}
        setOpen={setAddFriendModalOpen}
      />
    </div>
  );
}
