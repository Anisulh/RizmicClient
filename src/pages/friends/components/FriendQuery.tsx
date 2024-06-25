import { useState } from "react";
import { IFriend, sendFriendRequestAPI } from "../../../api/friendsAPI";
import { useToast } from "../../../contexts/ToastContext";
import Button from "../../../components/ui/Button";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
export default function FriendQuery({ user }: { user: IFriend }) {
  const { addToast } = useToast();
  const [sendRequestLoading, setSendRequestLoading] = useState(false);
  const [sendRequestSuccess, setSendRequestSuccess] = useState(false);
  const handleSendRequest = async (userId: string) => {
    setSendRequestLoading(true);
    try {
      await sendFriendRequestAPI(userId);
      setSendRequestSuccess(true);
    } catch (error) {
      setSendRequestSuccess(false);
      addToast({
        title: "Unable to send request",
        type: "error",
      });
    }
    setSendRequestLoading(false);
  };
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-600 p-2">
      <div className="flex items-center gap-2">
        {user.profilePicture && (
          <img
            src={user.profilePicture}
            alt={user.firstName}
            className="size-8 rounded-full"
          />
        )}
        <div>
          <h2 className="font-bold">
            {user.firstName} {user.lastName}
          </h2>
        </div>
      </div>
      {sendRequestSuccess ? (
        <Button
          variant="primary"
          className="bg-emerald-500 hover:bg-emerald-400"
        >
          <CheckCircleIcon className="size-5" />
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={() => handleSendRequest(user._id)}
          isLoading={sendRequestLoading}
        >
          Request
        </Button>
      )}
    </div>
  );
}
