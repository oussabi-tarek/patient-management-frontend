import { z } from "zod";

export function validateEmail(email) {
  if (!email) {
    return "Missing email";
  }

  const emailValidation = z.string().email();
  try {
    emailValidation.parse(email);
    return "";
  } catch (e) {
    return e instanceof z.ZodError ? e.issues[0].message : "Invalid E-mail";
  }
}

export function isNotEmpty(name, value) {
  if (!value) {
    return `${name} is required`;
  }
  if (value.length <= 3) {
    return `${name} must be greater than 3`;
  }
  if (name === "adresse" && value.trim().length < 10) {
    return `${name} must be greater than 10`;
  }
  return "";
}

export const validatePhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^(06|07)\d{8}$/;

  // Test if the phone number matches the regex
  const isValid = phoneNumberRegex.test(phoneNumber);

  // Return the validation result
  return isValid ? "" : "Invalid phone number .";
};
