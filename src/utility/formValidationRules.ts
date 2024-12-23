export const mobileNumberRules = () => {
  return [
    (value: string) =>
      value.trim() !== "" || "Contact Number must not be empty",
    (value: string) =>
      /^[0-9]{10}$/.test(value) ||
      "Contact number must be exactly 10 digits long and contain only numbers.",
    (value: string) =>
      value.startsWith("9") || "Contact number must start with the digit 9.",
  ];
};

export const firstNameRules = () => {
  return [
    (value: string) => value.trim() !== "" || "First name must not be empty.",
  ];
};

export const lastNameRules = () => {
  return [
    (value: string) => value.trim() !== "" || "Last name must not be empty.",
  ];
};

export const emailRules = () => {
  return [
    (value: string) => !!value || "Email is required.",
    (value: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email format.",
  ];
};

export const passwordRules = () => {
  return [
    (value: string) => value.trim() !== "" || "Password must not be empty.",
    (value: string) =>
      value.length >= 8 || "Password must be at least 8 characters long.",
  ];
};

export const requiredValidator = (message: string, value: string) => {
  return value.trim() !== "" || message;
};
