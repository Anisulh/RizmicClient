import cn from "./ui/cn";

const PasswordStrengthCheck = ({ password }: { password: string }) => {
  const calculateStrength = (password: string) => {
    let strengths = 0;
    if (password.length > 5) strengths++; // Length > 5
    if (password.length > 10) strengths++; // Length > 10
    if (/[A-Z]/.test(password)) strengths++; // Use of uppercase letters
    if (/[a-z]/.test(password)) strengths++; // Use of lowercase letters
    if (/[0-9]/.test(password)) strengths++; // Use of numbers
    if (/[^A-Za-z0-9]/.test(password)) strengths++; // Use of special characters

    return strengths;
  };

  const num = (calculateStrength(password) * 100) / 6; // Max score is 6

  const createPasswordLabel = (strength: number) => {
    if (strength <= 20) return "Very weak";
    if (strength <= 40) return "Weak";
    if (strength <= 60) return "Fair";
    if (strength <= 80) return "Good";
    return "Strong";
  };

  const passwordLabel = createPasswordLabel(num);

  const updateProgressColor = (score: number) => {
    switch (score) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-orange-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-light-green-500";
      case 4:
      case 5:
      case 6:
        return "bg-green-500";
      default:
        return "bg-red-300";
    }
  };

  return (
    <div className="flex w-full items-center">
      <div className="h-4 w-full rounded-full bg-gray-300">
        <div
          className={cn(
            "h-full rounded-full",
            updateProgressColor(Math.floor(num / 20)),
          )}
          style={{ width: `${num}%` }}
        ></div>
      </div>
      <p className="ml-2 whitespace-nowrap text-sm">{passwordLabel}</p>
    </div>
  );
};

export default PasswordStrengthCheck;
