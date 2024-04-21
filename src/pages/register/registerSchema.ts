import { z } from "zod";

export const RegisterSchema = z
  .object({
    firstName: z
      .string({
        required_error: "First name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(2, { message: "First name should be at least 2 characters long." })
      .max(20, { message: "First name should not exceed 20 characters." }),
    lastName: z
      .string({
        required_error: "Last Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(2, { message: "Last name should be at least 2 characters long." })
      .max(20, { message: "Last name should not exceed 20 characters." }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email address." }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(3, { message: "Password should be at least 3 characters long." })
      .max(20, { message: "Password should not exceed 20 characters." })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
      }),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
        invalid_type_error: "Confirm password must be a string",
      })
      .min(3, {
        message: "Confirm password should be at least 3 characters long.",
      })
      .max(20, { message: "Confirm password should not exceed 20 characters." })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/, {
        message:
          "Confirm password must contain at least one uppercase letter, one lowercase letter, and one number.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
