import { MutableRefObject, useEffect } from "react";
import { IGoogleResponse } from "../pages/register/interface";

export const useGoogleScript = (
  handleGoogleSignIn: (res: IGoogleResponse) => void,
  googleButton: MutableRefObject<null>,
) => {
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleSignIn,
    });
    google.accounts.id.renderButton(googleButton.current, {
      theme: "outline",
      size: "large",
      text: "continue_with",
      logo_alignment: "center",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleButton]);
};
