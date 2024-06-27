import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../api/friendsAPI";

export default function useFriends() {
  const query = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
  return query;
}
