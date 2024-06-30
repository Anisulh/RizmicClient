import { Fragment, useState } from "react";
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
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import useFriends from "../../hooks/useFriends";
import { Menu, Transition } from "@headlessui/react";
import DialogModal from "../../components/ui/modal/DialogModal";

export default function Friends() {
  const { addToast } = useToast();
  const [addFriendModalOpen, setAddFriendModalOpen] = useState(false);
  const [unfriendModalOpen, setUnfriendModalOpen] = useState(false);

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
    retry: false,
    staleTime: 5 * 60 * 1000,
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
          className="flex gap-2 p-1 hover:bg-cambridgeblue dark:hover:text-slate-700"
        >
          <p className="hidden md:block">Search</p>
          <MagnifyingGlassIcon className="size-6" />
        </Button>
      </div>
      <h2 className="text-xl font-medium md:text-2xl">Your Friends</h2>
      <div className="space-y-2">
        {friends?.map((friend) => (
          <div
            key={friend._id}
            className="flex items-center justify-between rounded-xl bg-slate-700 p-4"
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
            <div>
              <Menu as="div" className="relative inline-block text-right">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md text-right text-sm font-medium text-raisinblack hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <EllipsisVerticalIcon
                      className="size-6 transition-colors hover:text-cambridgeblue dark:text-white"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-20 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-600 dark:text-gray-200">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active && "bg-ultramarineBlue"
                            } group flex w-full items-center rounded-md px-4 py-2 transition-colors`}
                          >
                            View Profile
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setUnfriendModalOpen(true)}
                            className={`${
                              active && "bg-red-600"
                            } group flex w-full items-center rounded-md px-4 py-2 transition-colors`}
                          >
                            Unfriend
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <DialogModal
              title="Delete Clothing"
              open={unfriendModalOpen}
              setOpen={setUnfriendModalOpen}
            >
              <div className="my-4 flex flex-col items-center justify-center space-y-4">
                <p>Are you sure you want to unfriend this user? </p>
                <div className="flex w-full items-center justify-between">
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleUnfriend(friend._id);
                      setUnfriendModalOpen(false);
                    }}
                  >
                    Yes
                  </Button>
                  <Button onClick={() => setUnfriendModalOpen(false)}>
                    No
                  </Button>
                </div>
              </div>
            </DialogModal>
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
      />{" "}
    </div>
  );
}
