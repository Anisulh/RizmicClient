import Button from "../Button";
import DialogModal from "./DialogModal";
import UserAvatar from "../../../assets/userAvatar.webp";
import { useToast } from "../../../contexts/ToastContext";
import { ClipboardIcon } from "@heroicons/react/24/solid";
import { ShareIcon } from "../../Icons";
import { Dispatch, SetStateAction, useState } from "react";
import ButtonSpinner from "../spinner/ButtonSpinner";
import useFriends from "../../../hooks/useFriends";

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
  const { isPending, data: friends } = useFriends();
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
    } catch (err) {
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
      <h3 className="mt-4 text-xl font-bold">Friends</h3>
      <p className="text-sm font-medium text-gray-300">
        Share privately to your friends within Rizmic.
      </p>
      <div className="my-4 space-y-4">
        {isPending ? (
          <div className="item-center flex w-full justify-center">
            <ButtonSpinner className="size-12" />
          </div>
        ) : friends && friends.length > 0 ? (
          <>
            <div className="space-y-2 px-2 py-4">
              {friends.map((friend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={friend.profilePicture || UserAvatar}
                      alt={friend.firstName}
                      className="size-8 rounded-full bg-white"
                    />
                    <p>
                      {friend.firstName} {friend.lastName}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedFriends.includes(friend._id)}
                    onChange={() => handleSelectFriend(friend._id)}
                    className="size-5 rounded-md text-ultramarineBlue"
                  />
                </div>
              ))}
            </div>
            <Button
              variant="primary"
              className="w-full border-none"
              onClick={handleShareSelected}
              disabled={selectedFriends.length === 0}
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
      <p className="my-4 text-xl font-medium text-white">Share publicly:</p>
      <div className="flex w-full flex-col gap-4">
        <Button
          variant="textWithIcon"
          onClick={handleCopy}
          icon={<ClipboardIcon className="size-4" />}
          className="flex justify-center gap-2"
        >
          Copy Link
        </Button>
        <Button
          variant="textWithIcon"
          onClick={handleShareMenu}
          icon={<ShareIcon className="size-5" />}
          className="flex justify-center gap-2"
        >
          Open Share Menu
        </Button>
      </div>
    </DialogModal>
  );
}
