import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { UserContextProvider } from "./UserContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <UserContextProvider>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>{" "}
        </UserContextProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
