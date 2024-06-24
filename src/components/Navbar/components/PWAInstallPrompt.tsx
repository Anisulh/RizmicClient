import { useState } from "react";
import useInstallPrompt from "../../../hooks/useInstallPrompt";
import DialogModal from "../../ui/modal/DialogModal";
import Button from "../../ui/Button";

export default function PWAInstallPrompt() {
  const { isInstallPromptVisible, showInstallPrompt, isSafari } =
    useInstallPrompt();
  const [open, setOpen] = useState(false);
  return (
    <>
      {isInstallPromptVisible ? (
        <div className="flex w-full justify-center py-2">
          <Button variant="ghost" onClick={showInstallPrompt}>
            Install App
          </Button>
        </div>
      ) : isSafari ? (
        <>
          <div className="flex w-full justify-center py-2">
            <Button variant="ghost" onClick={() => setOpen(true)}>
              Install App
            </Button>
          </div>
          <DialogModal
            title="App Installation Instructions"
            open={open}
            setOpen={setOpen}
          >
            <div className="mt-4 px-2 py-4">
              <ol className="list-disc space-y-4">
                <li>Tap the &quot;Share&quot; button in the Safari toolbar.</li>
                <li>Select &quot;Add to Home Screen&quot;.</li>
              </ol>
            </div>
          </DialogModal>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
