import { useState, useEffect } from "react";

const useInstallPrompt = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState<Event | null>(
    null,
  );
  const [isInstallPromptVisible, setInstallPromptVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPromptEvent(event);
      setInstallPromptVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const showInstallPrompt = () => {
    if (installPromptEvent) {
      (installPromptEvent as any).prompt();
      (installPromptEvent as any).userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setInstallPromptEvent(null);
        setInstallPromptVisible(false);
      });
    }
  };

  return { isInstallPromptVisible, showInstallPrompt };
};

export default useInstallPrompt;
