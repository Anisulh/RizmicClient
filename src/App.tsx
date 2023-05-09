import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AboutUs from "./pages/aboutUs/AboutUs";
import ContactUs from "./pages/contactUs";
import { UserContextProvider } from "./contexts/UserContext";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import { StatusContextProvider } from "./contexts/StatusContext";
import Status from "./components/Status";
import PasswordReset from "./pages/passwordReset/PasswordReset";
import Wardrobe from "./pages/Wardrobe";
import PrivateRoute from "./components/PrivateRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GenerateFit from "./pages/fitGenerator/GenerateFit";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <UserContextProvider>
          <StatusContextProvider>
            <Navbar />
            <Status />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route
                path="/passwordreset:token:id"
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
                path="/generatefit"
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
            </Routes>
          </StatusContextProvider>
        </UserContextProvider>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
