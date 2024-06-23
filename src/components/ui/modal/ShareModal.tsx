import Button from "../Button";
import DialogModal from "./DialogModal";
import UserAvatar from "../../../assets/userAvatar.webp";
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../../../api/friendsAPI";
import { useToast } from "../../../contexts/ToastContext";
import { ClipboardIcon } from "@heroicons/react/24/solid";
import { ShareIcon } from "../../Icons";
import { Dispatch, SetStateAction, useState } from "react";
import ButtonSpinner from "../spinner/ButtonSpinner";

interface IShareModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  url: string;
  handleShare: (friendId: string[]) => void;
}

export default function ShareModal({
  open,
  setOpen,
  url,
  handleShare,
}: IShareModal) {
  const { addToast } = useToast();
  const { isPending, data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  const handleSelectFriend = (friendId: string) => {
    setSelectedFriends((prevSelected) =>
      prevSelected.includes(friendId)
        ? prevSelected.filter((id) => id !== friendId)
        : [...prevSelected, friendId],
    );
  };

  const handleShareMenu = async () => {
    const shareData = {
      title: "Rizmic Fits Clothing Share",
      text: "Check out this clothing!",
      url: url,
    };
    try {
      await navigator.share(shareData);
      console.log("Shared successfully");
    } catch (err) {
      console.error(err);
      addToast({
        title: "Error sharing",
        description:
          "An error occurred while trying to share this clothing. The link has been copied to your clipboard.",
        type: "error",
      });
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  const handleShareSelected = () => {
    if (selectedFriends.length === 0) {
      addToast({
        title: "No friends selected",
        description: "Please select at least one friend to share with.",
        type: "warning",
      });
      return;
    }
    handleShare(selectedFriends);
    setSelectedFriends([]);
    setOpen(false);
  };

  return (
    <DialogModal title="Share" open={open} setOpen={setOpen}>
      <h3 className="text-xl font-bold mt-4">Friends</h3>
      <p className="text-sm font-medium text-gray-300">
        Share privately to your friends within Rizmic.
      </p>
      <div className="my-4 space-y-4">
        {isPending ? (
          <div className="w-full flex justify-center item-center">
            <ButtonSpinner className="h-12 w-12" />
          </div>
        ) : friends && friends.length > 0 ? (
          <>
            {friends.map((friend, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={friend.profilePicture || UserAvatar}
                    alt={friend.firstName}
                    className="w-8 h-8 rounded-full bg-white"
                  />
                  <p>{friend.firstName}</p>
                </div>
                <input
                  type="checkbox"
                  checked={selectedFriends.includes(friend._id)}
                  onChange={() => handleSelectFriend(friend._id)}
                  className="h-5 w-5 text-blue-600"
                />
              </div>
            ))}
            <Button
              variant="primary"
              className="w-full"
              onClick={handleShareSelected}
            >
              Share Selected
            </Button>
          </>
        ) : (
          <p className="my-4 w-full text-center">
            Oh no! You don&apos;t have any friends {":("}
          </p>
        )}
      </div>
      <p className="my-2 mt-4 text-white text-xl font-medium">
        Share publicly:
      </p>
      <div className="flex flex-col gap-2 w-full">
        <Button
          variant="textWithIcon"
          onClick={handleCopy}
          icon={<ClipboardIcon className="h-4 w-4" />}
          className="flex justify-center gap-2"
        >
          Copy Link
        </Button>
        <Button
          variant="textWithIcon"
          onClick={handleShareMenu}
          icon={<ShareIcon className="h-5 w-5" />}
          className="flex justify-center gap-2"
        >
          Open Share Menu
        </Button>
      </div>
    </DialogModal>
  );
}
