import React, { useState } from "react";
import DialogModal from "../../../components/ui/modal/DialogModal";
import { useQuery } from "@tanstack/react-query";
import { searchUsersAPI } from "../../../api/userAPI";
import useDebounce from "../../../hooks/useDebounce";
import Spinner from "../../../components/ui/spinner/Spinner";
import { IFriend } from "../../../api/friendsAPI";
import FriendQuery from "./FriendQuery";

export default function AddFriendModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["searchUsers", debouncedSearchTerm],
    queryFn: () => searchUsersAPI(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length > 0,
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <DialogModal open={open} setOpen={setOpen} title="Add Friends">
      <p>Search for friends to add</p>

      <input
        type="text"
        placeholder="Search for friends"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 w-full rounded-md border border-gray-300 p-2 text-black"
      />

      <div className="space-y-2">
        {isLoading ? (
          <Spinner />
        ) : (
          searchResults?.map((user: IFriend) => (
            <FriendQuery user={user} key={user._id} />
          ))
        )}
      </div>
    </DialogModal>
  );
}
