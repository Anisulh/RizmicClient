import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AboutUs from "./pages/aboutUs/AboutUs";
import ContactUs from "./pages/contactUs/ContactUs";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import PasswordReset from "./pages/passwordReset/PasswordReset";
import Wardrobe from "./pages/wardrobe/Wardrobe";
import PrivateRoute from "./components/PrivateRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GenerateFit from "./pages/fitGenerator/GenerateFit";
import Profile from "./pages/profile/Profile";
import Footer from "./components/Footer/Footer";
import Pricing from "./pages/subscription/Pricing";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import TermsOfService from "./pages/termsOfService/TermsOfService";
import Settings from "./pages/settings/Settings";
import Friends from "./pages/friends/Friends";
import ClothingItem from "./pages/clothingItem/ClothingItem";
import OutfitItem from "./pages/outfitItem/OutfitItem";
import { useRegisterSW } from "virtual:pwa-register/react";
import { useEffect, useState } from "react";
import { useToast } from "./contexts/ToastContext";
import DialogModal from "./components/ui/modal/DialogModal";
import Button from "./components/ui/Button";
import FriendProfile from "./pages/friendProfile/FriendProfile";

const queryClient = new QueryClient();

function App() {
  const { addToast } = useToast();
  const [_, setOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log("SW Registered:", r);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });

  useEffect(() => {
    const handleOffline = () => {
      setOnline(false);
      setWasOffline(true);
      addToast({
        title: "No internet connection",
        description: "Please check your internet connection.",
        type: "warning",
      });
    };

    const handleOnline = () => {
      setOnline(true);
      if (wasOffline) {
        addToast({
          title: "Internet connection restored",
          description: "You are now connected to the internet.",
          type: "success",
        });
      }
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [addToast, wasOffline]);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/clothing/:itemId" element={<ClothingItem />} />
            <Route path="/outfit/:itemId" element={<OutfitItem />} />
            <Route
              path="/password-reset:token:id"
              element={<PasswordReset />}
            />
            <Route
              path="/wardrobe"
              element={
                <PrivateRoute>
                  <Wardrobe />
                </PrivateRoute>
              }
            />
            <Route
              path="/generate-fit"
              element={
                <PrivateRoute>
                  <GenerateFit />
                </PrivateRoute>
              }
            />
            <Route
              path="/friends"
              element={
                <PrivateRoute>
                  <Friends />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route
              path="/friends/profile/:friendId"
              element={
                <PrivateRoute>
                  <FriendProfile />
                </PrivateRoute>
              }
            />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
          <Footer />
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
      <DialogModal
        title="New Update!"
        open={needRefresh}
        setOpen={setNeedRefresh}
      >
        <div className="mt-4 space-y-4">
          <p>
            Got some more improvements we hope you&apos;ll enjoy :)
            <br />
            Click on reload button to update.
          </p>
          <Button onClick={() => updateServiceWorker(true)}>Reload</Button>
        </div>
      </DialogModal>
    </div>
  );
}

export default App;
