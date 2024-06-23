import React, { useState } from "react";
import DialogModal from "../../../components/ui/modal/DialogModal";
import Button from "../../../components/ui/Button";
import { useQuery } from "@tanstack/react-query";
import { searchUsersAPI } from "../../../api/userAPI";
import useDebounce from "../../../hooks/useDebounce";
import Spinner from "../../../components/ui/spinner/Spinner";
import { IFriend, sendFriendRequestAPI } from "../../../api/friendsAPI";
import { useToast } from "../../../contexts/ToastContext";

export default function AddFriendModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [sendRequestLoading, setSendRequestLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["searchUsers", debouncedSearchTerm],
    queryFn: () => searchUsersAPI(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length > 0,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSendRequest = async (userId: string) => {
    setSendRequestLoading(true);
    try {
      await sendFriendRequestAPI(userId);
      addToast({
        title: "Friend request sent",
        type: "success",
      });
    } catch (error) {
      addToast({
        title: "Unable to send request",
        type: "error",
      });
    }
    setSendRequestLoading(false);
  };

  return (
    <DialogModal open={open} setOpen={setOpen} title="Add Friends">
      <p>Search for friends to add</p>

      <input
        type="text"
        placeholder="Search for friends"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border border-gray-300 p-2 w-full rounded-md mb-4 text-black"
      />

      <div className="space-y-2">
        {isLoading ? (
          <Spinner />
        ) : (
          searchResults?.map((user: IFriend) => (
            <div
              key={user._id}
              className="flex justify-between items-center p-2 bg-slate-600 rounded-xl"
            >
              <div className="flex items-center gap-2">
                {user.profilePicture && (
                  <img
                    src={user.profilePicture}
                    alt={user.firstName}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div>
                  <h2 className="font-bold">
                    {user.firstName} {user.lastName}
                  </h2>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={() => handleSendRequest(user._id)}
                isLoading={sendRequestLoading}
              >
                Request
              </Button>
            </div>
          ))
        )}
      </div>
    </DialogModal>
  );
}
