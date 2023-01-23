import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}
export interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}
const queryClient = new QueryClient();
QueryClientProvider;

export const UserContext = createContext<IUserContext | null>(null);

const getUser = () => {
  if (
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user") as string).hasOwnProperty("token")
  ) {
    return JSON.parse(localStorage.getItem("user") as string);
  }
  return null;
};

function App() {
  const [user, setUser] = useState<IUser | null>(getUser());
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}

export default App;
