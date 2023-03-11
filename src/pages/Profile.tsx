import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useMutation } from "@tanstack/react-query";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUpdateProfile, updateProfileAPI } from "../api/userAPI";
import ChangePassword from "../components/Profile/ChangePassword";
import ProfileImageModal from "../components/Profile/ProfileImageModal";
import {
  IErrorNotificationParams,
  IStatusContext,
  StatusContext,
} from "../contexts/StatusContext";
import { IUserContext, UserContext } from "../contexts/UserContext";

export default function Profile() {
  const { user, refetchUserData } = useContext(UserContext) as IUserContext;
  const { errorNotification, resetStatus } = useContext(
    StatusContext,
  ) as IStatusContext;
  const [error, setError] = useState<IErrorNotificationParams>({
    message: null,
    error: null,
  });
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    phoneNumber: user?.phoneNumber,
  });

  const { firstName, lastName, phoneNumber } = profileData;

  const [showProfileImageEdit, setShowProfileImageEdit] = useState(false);
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);
  useEffect(() => {
    errorNotification(error);
    return () => {
      resetStatus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ data, token }: { data: IUpdateProfile; token: string }) =>
      updateProfileAPI(data, token),
    onSuccess(data) {
      if (data.message) {
        setError({ message: data.message });
      } else {
        refetchUserData();
      }
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (user?.token) {
      mutate({ data: profileData, token: user?.token });
    }

    setProfileData({
      firstName: user?.firstName,
      lastName: user?.lastName,
      phoneNumber: user?.phoneNumber,
    });
    setEditingProfile(false);
  };

  return (
    <div className="max-w-screen mb-40">
      <div className=" w-full h-60 bg-gradient-to-tr from-cambridgeblue to-ultramarineBlue"></div>

      <div className="flex flex-col max-w-7xl  mx-auto gap-10">
        <div className="flex gap-2">
          <div className="relative flex items-center justify-center h-full">
            <img
              className="rounded-full h-24 w-24 -mt-10"
              src={user?.profilePicture}
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
                className="absolute -top-10 backdrop-brightness-50 text-white w-24 h-24 rounded-full flex items-center justify-center transition-all"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          <div>
            <h1 className="font-medium text-2xl">{`${user?.firstName} ${user?.lastName} `}</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>{" "}
        <div className="flex justify-center ">
          <div className="max-w-5xl w-full ">
            <div className="overflow-hidden ">
              <div className="flex justify-between items-center">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Profile Information
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      User details listed below
                    </p>
                  </div>
                </div>
                <button
                  className={`border h-8 px-4 rounded-md mt-2 ${
                    editingProfile
                      ? "hover:bg-red-500 hover:text-white"
                      : "hover:bg-ultramarineBlue hover:text-white"
                  } transition-colors`}
                  onClick={() => setEditingProfile((prevState) => !prevState)}
                >
                  {editingProfile ? (
                    <XMarkIcon className="h-5 w-5" />
                  ) : (
                    <PencilIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="border-t border-gray-200">
                {!editingProfile ? (
                  <dl>
                    <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        First name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {user?.firstName}
                      </dd>
                    </div>
                    <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Last name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {user?.lastName}
                      </dd>
                    </div>

                    <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {user?.email}
                      </dd>
                    </div>
                    <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Phone Number
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {user?.phoneNumber || "N/A"}
                      </dd>
                    </div>
                  </dl>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <label
                        htmlFor="firstName"
                        className="text-sm font-medium text-gray-500"
                      >
                        First name
                      </label>
                      <input
                        className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 border rounded-md py-1 px-2"
                        id="firstName"
                        onChange={handleChange}
                        value={firstName}
                      />
                    </div>
                    <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <label
                        htmlFor="lastName"
                        className="text-sm font-medium text-gray-500"
                      >
                        Last name
                      </label>
                      <input
                        className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 border rounded-md py-1 px-2"
                        id="lastName"
                        onChange={handleChange}
                        value={lastName}
                      />
                    </div>
                    <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {user?.email}
                      </dd>
                    </div>
                    <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <label
                        htmlFor="phoneNumber"
                        className="text-sm font-medium text-gray-500"
                      >
                        Phone Number
                      </label>
                      <input
                        className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 border rounded-md py-1 px-2"
                        id="phoneNumber"
                        onChange={handleChange}
                        value={phoneNumber}
                      />
                    </div>
                    <div className="flex items-center justify-center mt-10">
                      <button
                        type="submit"
                        className="text-sm rounded-md py-2 px-4 bg-ultramarineBlue text-white
                     "
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex justify-center items-center bg-transparent">
                            <div
                              className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full bg-transparent text-gray-300"
                              role="status"
                            >
                              <span className="sr-only">Loading</span>
                            </div>
                            Processing...
                          </span>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            <ChangePassword user={user} setError={setError} />
          </div>
        </div>
      </div>
      <ProfileImageModal
        open={showProfileImageModal}
        setOpen={setShowProfileImageModal}
        setError={setError}
        user={user}
        refetchUserData={refetchUserData}
      />
    </div>
  );
}
