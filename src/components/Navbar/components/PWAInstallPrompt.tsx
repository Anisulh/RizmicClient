import { Menu } from "@headlessui/react";
import { useState } from "react";
import useInstallPrompt from "../../../hooks/useInstallPrompt";
import cn from "../../ui/cn";
import DialogModal from "../../ui/modal/DialogModal";

export default function PWAInstallPrompt() {
  const { isInstallPromptVisible, showInstallPrompt, isSafari } =
    useInstallPrompt();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Menu.Item>
        {({ active }) => {
          return isInstallPromptVisible ? (
            <div className="w-full flex justify-center py-2">
              <button
                className={cn(
                  active ? "bg-gray-100 dark:text-gray-900" : "",
                  "flex  items-center justify-center rounded-md border border-transparent bg-ultramarineBlue px-8  py-2  font-medium text-white shadow-sm hover:bg-blue-700",
                )}
                onClick={showInstallPrompt}
              >
                Install App
              </button>
            </div>
          ) : isSafari ? (
            <>
              <div className="w-full flex justify-center py-2">
                <button
                  className={cn(
                    active ? "bg-gray-100 dark:text-gray-900" : "",
                    "flex  items-center justify-center rounded-md border border-transparent bg-ultramarineBlue px-8  py-2  font-medium text-white shadow-sm hover:bg-blue-700",
                  )}
                  onClick={() => setOpen(true)}
                >
                  Install App
                </button>
              </div>
              <DialogModal
                title="App Installation Instructions"
                open={open}
                setOpen={setOpen}
              >
                <div className="mt-4 px-2 py-4">
                  <ol className="list-disc space-y-4">
                    <li>
                      Tap the &quot;Share&quot; button in the Safari toolbar.
                    </li>
                    <li>Select &quot;Add to Home Screen&quot;.</li>
                  </ol>
                </div>
              </DialogModal>
            </>
          ) : (
            <></>
          );
        }}
      </Menu.Item>
    </>
  );
}
