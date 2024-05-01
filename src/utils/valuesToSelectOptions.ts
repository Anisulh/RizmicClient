export default function valuesToSelectOptions<T extends readonly string[]>(strings: T): { label: string; value: string }[] {
  return strings.map((str) => {
    const label = str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return { label, value: str };
  });
}