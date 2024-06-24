import { useState } from "react";
import Button from "../../components/ui/Button";
import ChangePassword from "./components/ChangePassword";
import DeleteAccountModal from "./components/DeleteAccountModal";

export default function Settings() {
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  return (
    <div className="content-container mx-auto max-w-7xl space-y-10 px-4">
      <h1 className="text-3xl font-bold md:text-4xl">Settings</h1>
      <section
        aria-labelledby="account-settings-title"
        className="space-y-5 rounded-xl border-2 px-8 py-4 dark:border-gray-700 dark:bg-gray-700"
      >
        <h2
          id="account-settings-title"
          className="text-xl font-medium md:text-2xl"
        >
          Account Settings:
        </h2>
        <div className="mx-auto max-w-4xl space-y-5">
          <div className="flex items-center justify-between">
            <p className="font-medium md:text-lg">Change Password:</p>
            <Button
              variant="ghost"
              onClick={() => setChangePasswordModalOpen(true)}
            >
              Change
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium md:text-lg">Change Email:</p>
            <Button variant="ghost">Change</Button>
          </div>
          <div className="flex flex-col">
            <p className="mb-2 font-medium md:text-lg">Delete Account:</p>
            <Button
              variant="destructive"
              onClick={() => setDeleteAccountModalOpen(true)}
            >
              Delete Account
            </Button>
            <small className="font-medium">*This action is irreversible</small>
          </div>
        </div>
      </section>
      <DeleteAccountModal
        open={deleteAccountModalOpen}
        setOpen={setDeleteAccountModalOpen}
      />
      <ChangePassword
        open={changePasswordModalOpen}
        setOpen={setChangePasswordModalOpen}
      />
    </div>
  );
}
