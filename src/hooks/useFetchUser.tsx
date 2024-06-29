import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/UserContext";

export const useFetchUser = () => {
  const { refetchUserData, user } = useAuth();
  return useQuery({
    queryKey: ["user"],
    queryFn: refetchUserData,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: !user,
  });
};
