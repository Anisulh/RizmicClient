export function splitCamelCase(str: string) {
  // Add space before all capital letters and make everything lowercase
  str = str.replace(/([A-Z])/g, " $1").toLowerCase();

  // Capitalize the first letter of each word
  str = str.replace(/^([a-z])|\s+([a-z])/g, function ($1) {
    return $1.toUpperCase();
  });

  return str;
}