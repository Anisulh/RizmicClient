import { MutableRefObject, useEffect } from "react";
import { IGoogleResponse } from "../pages/register/interface";

export const loadGoogleScript = (
  handleGoogleSignIn: (res: IGoogleResponse) => void,
  googleButton: MutableRefObject<null>
) => {
  useEffect(() => {
    const loadScript = (src: string) => {
      if (document.querySelector(`script[src="${src}"]`)) return;
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleSignIn,
        });
        google.accounts.id.renderButton(googleButton.current, {
          theme: "outline",
          size: "large",
        });
      };
      script.onerror = (err) => console.log(err);
      document.body.appendChild(script);
    };
    loadScript("https://accounts.google.com/gsi/client");
  }, []);
};
