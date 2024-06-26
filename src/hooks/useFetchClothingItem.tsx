import { useQuery } from "@tanstack/react-query";
import { getClothesById } from "../api/clothesAPI";

export default function useFetchClothingItem(itemId: string | undefined) {
  const query = useQuery({
    queryKey: ["clothes", itemId],
    queryFn: async () => itemId && getClothesById(itemId),
    enabled: !!itemId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
  return query;
}
