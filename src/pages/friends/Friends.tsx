import { useState } from "react";
import {
  acceptFriendRequestAPI,
  getFriendRequests,
  getFriends,
  unfriendAPI,
} from "../../api/friendsAPI";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/ui/spinner/Spinner";
import Button from "../../components/ui/Button";
import AddFriendModal from "./components/AddFriendModal";
import { useToast } from "../../contexts/ToastContext";

export interface IFriend {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
}

export default function Friends() {
  const { addToast } = useToast();
  const [addFriendModalOpen, setAddFriendModalOpen] = useState(false);

  const {
    isPending: friendQueryPending,
    data: friends,
    refetch: refetchFriends,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

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
    <div className="max-w-7xl mx-auto content-container px-2 lg:px-4 space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Friends</h1>
        <Button variant="primary" onClick={() => setAddFriendModalOpen(true)}>
          Add Friend
        </Button>
      </div>
      <h2 className="font-medium text-2xl">Your Friends</h2>
      <div>
        {friends?.map((friend: IFriend) => (
          <div
            key={friend._id}
            className="flex justify-between items-center p-4 bg-slate-600 rounded-xl"
          >
            <div className="flex items-center gap-2">
              {friend.profilePicture && (
                <img
                  src={friend.profilePicture}
                  alt={friend.firstName}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div>
                <h2 className="font-bold">
                  {friend.firstName} {friend.lastName}
                </h2>
                <p>{friend.email}</p>
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
      <h2 className="font-medium text-2xl">Friend Requests</h2>
      <div>
        {friendRequests?.map(({ requester }: { requester: IFriend }) => (
          <div
            key={requester._id}
            className="flex justify-between items-center p-4 bg-slate-600 rounded-xl"
          >
            <div className="flex items-center gap-2">
              {requester.profilePicture && (
                <img
                  src={requester.profilePicture}
                  alt={requester.firstName}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div>
                <h2 className="font-bold">
                  {requester.firstName} {requester.lastName}
                </h2>
                <p>{requester.email}</p>
              </div>
            </div>
            <div className="space-x-2">
              <Button
                variant="primary"
                onClick={() => handleAcceptRequest(requester._id)}
              >
                Accept
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleUnfriend(requester._id)}
              >
                Decline
              </Button>
            </div>
          </div>
        ))}
      </div>
      <AddFriendModal
        open={addFriendModalOpen}
        setOpen={setAddFriendModalOpen}
      />
    </div>
  );
}
