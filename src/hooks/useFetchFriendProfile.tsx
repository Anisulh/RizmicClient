import { useQuery } from "@tanstack/react-query";
import { fetchFriendProfile } from "../api/friendsAPI";

export default function useFetchFriendProfile(friendId: string | undefined) {
  return useQuery({
    queryKey: ["friendProfile", friendId],
    queryFn: () => fetchFriendProfile(friendId),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: !!friendId,
  });
}
