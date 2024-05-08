import { useState } from "react";
import Button from "../../components/ui/Button";
import ChangePassword from "./components/ChangePassword";
import DialogModal from "../../components/ui/modal/DialogModal";
import DeleteAccountModal from "./components/DeleteAccountModal";

export default function Settings() {
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  return (
    <div className="max-w-7xl mx-auto content-container px-2 lg:px-4 space-y-10">
      <h1 className="text-4xl font-bold">Settings</h1>
      <section
        aria-labelledby="account-settings-title"
        className="space-y-5 border-2 dark:border-gray-700 dark:bg-gray-700 rounded-xl px-8  py-4"
      >
        <h2 id="account-settings-title" className="text-2xl font-medium">
          Account Settings:
        </h2>
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium">Change Password:</p>
            <Button variant="ghost" onClick={() => setChangePasswordModalOpen(true)}>Change</Button>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium">Change Email:</p>
            <Button variant="ghost">Change</Button>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-medium mb-2">Delete Account:</p>
            <Button variant="destructive" onClick={() => setDeleteAccountModalOpen(true)}>Delete Account</Button>
            <small className="font-medium">*This action is irreversible</small>
          </div>
        </div>
      </section>
      <DeleteAccountModal open={deleteAccountModalOpen} setOpen={setDeleteAccountModalOpen} />
      <ChangePassword
        open={changePasswordModalOpen}
        setOpen={setChangePasswordModalOpen}
      />
    </div>
  );
}
