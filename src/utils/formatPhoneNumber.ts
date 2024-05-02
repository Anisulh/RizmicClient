export default function formatPhoneNumber(input: string): string {
  // Strip all non-digits
  const digits = input.replace(/\D/g, "");
  // Capture groups of digits to format
  const match = digits.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
  if (!match) {
    return "";
  }

  const [, areaCode, middleThree, lastFour] = match;

  // Format and combine parts of the phone number
  let result = "";
  if (areaCode) result = `(${areaCode}`;
  if (middleThree) result += `) ${middleThree}`;
  if (lastFour) result += `-${lastFour}`;

  return result;
}
