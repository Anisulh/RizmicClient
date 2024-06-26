import { useQuery } from "@tanstack/react-query";
import { getClothes } from "../api/clothesAPI";
import { IExistingClothesData } from "../pages/wardrobe/components/ClothesModal";
import { GroupedClothes } from "../pages/wardrobe/Wardrobe";

export const useClothes = () => {
  return useQuery({
    queryKey: ["clothes"],
    queryFn: getClothes,
    select: (data) => {
      const groupedByCategory = data.reduce(
        (acc: GroupedClothes, cloth: IExistingClothesData) => {
          const categoryArray = acc[cloth.category] || [];
          categoryArray.push(cloth);
          acc[cloth.category] = categoryArray;
          return acc;
        },
        {},
      );
      return {
        unstructuredClothes: data,
        structuredClothes: groupedByCategory,
      };
    },
    refetchOnWindowFocus: false,
  });
};
