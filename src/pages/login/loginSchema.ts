import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .email({ message: "Invalid email address." }),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
