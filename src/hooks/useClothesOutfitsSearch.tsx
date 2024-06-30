import { useMemo } from "react";
import { IExistingClothesData } from "../pages/wardrobe/components/ClothesModal";
import { GroupedClothes, IOutfitsSections } from "../pages/wardrobe/Wardrobe";
import useDebounce from "./useDebounce";

export interface IClothesData {
  unstructuredClothes: IExistingClothesData[];
  structuredClothes: GroupedClothes;
}

export default function useClothesOutfitsSearch(
  clothes: IClothesData | undefined,
  outfits: IOutfitsSections | undefined,
  searchQuery: string | undefined,
  openTab: number,
) {
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  return useMemo(() => {
    if (!debouncedSearchQuery) return undefined;

    if (openTab === 1) {
      return searchClothes(clothes, debouncedSearchQuery);
    } else {
      return searchOutfits(outfits, debouncedSearchQuery);
    }
  }, [clothes, outfits, debouncedSearchQuery, openTab]);
}

function searchClothes(
  clothes: IClothesData | undefined,
  searchQuery: string,
): GroupedClothes | undefined {
  const clothesArray = clothes?.unstructuredClothes;
  if (!clothesArray) return undefined;

  const results = clothesArray.filter(
    (cloth) =>
      cloth.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cloth.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  if (!results.length) return undefined;

  return results.reduce((acc: GroupedClothes, cloth: IExistingClothesData) => {
    const categoryArray = acc[cloth.category] || [];
    categoryArray.push(cloth);
    acc[cloth.category] = categoryArray;
    return acc;
  }, {});
}

function searchOutfits(
  outfits: IOutfitsSections | undefined,
  searchQuery: string,
): IOutfitsSections | undefined {
  const outfitsArray = outfits?.allOutfits;
  if (!outfitsArray) return undefined;

  const results = outfitsArray.filter(
    (outfit) =>
      outfit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outfit.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  if (!results.length) return undefined;

  return {
    favoriteOutfits: results.filter((outfit) => outfit.favorited),
    allOutfits: results,
  };
}
