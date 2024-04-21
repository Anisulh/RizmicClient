import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AboutUs from "./pages/aboutUs/AboutUs";
import ContactUs from "./pages/contactUs";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import { ToastProvider } from "./contexts/ToastContext";
import PasswordReset from "./pages/passwordReset/PasswordReset";
import Wardrobe from "./pages/Wardrobe";
import PrivateRoute from "./components/PrivateRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GenerateFit from "./pages/fitGenerator/GenerateFit";
import Profile from "./pages/Profile";
import Footer from "./components/Footer/Footer";
import Pricing from "./pages/subscription/Pricing";
import ToastContainer from "./components/ui/toast/ToastContainer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/password-reset:token:id" element={<PasswordReset />} />
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
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
          <Footer />
        </Router>
        <ToastContainer />
      </ToastProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
