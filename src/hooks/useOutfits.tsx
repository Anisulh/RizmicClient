import { useQuery } from "@tanstack/react-query";
import { getOutfits } from "../api/outfitsAPI";

export const useOutfits = () => {
  return useQuery({
    queryKey: ["outfits"],
    queryFn: getOutfits,
    select: (data) => {
      const favoriteOutfits = data.filter((outfit) => outfit.favorited);
      return {
        favoriteOutfits,
        allOutfits: data,
      };
    },
    refetchOnWindowFocus: false,
  });
};
