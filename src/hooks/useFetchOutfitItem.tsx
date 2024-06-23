import { useQuery } from "@tanstack/react-query";
import { getOutfitsById } from "../api/outfitsAPI";

export default function useFetchOutfitItem(itemId: string | undefined) {
  const query = useQuery({
    queryKey: ["outfits", itemId],
    queryFn: async () => itemId && getOutfitsById(itemId),
    enabled: !!itemId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return query;
}
