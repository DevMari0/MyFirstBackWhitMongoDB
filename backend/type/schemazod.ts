import { z } from "zod";

export const LoginInfoSchema = z.object({
  email:z.string().email(),
  isAdmin: z.boolean().optional(),
  name : z.string(),
  password: z.string().min(6, { message: "Must be 6 or more characters long" }).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[!@#$%^&*(),.?":{}|<>]/)
})

export const RegisterInfoSchema= z.object({
  email: z.string().email({message: "Invalid email address"}).max(49),
  password: z.string().min(6, { message: "Must be 6 or more characters long" }).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[!@#$%^&*(),.?":{}|<>]/),
  isAdmin: z.boolean().optional().default(false),
  name : z.string(),
});

export const PasswordInfoSchema = z.object({
  password: z.string().min(6, { message: "Must be 6 or more characters long" }).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[!@#$%^&*(),.?":{}|<>]/)
})