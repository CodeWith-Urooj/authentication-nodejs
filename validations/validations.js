import {z} from 'zod'

export const signupSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must have at least 3 characters"),
    
  email: z
    .string()
    .email("Invalid email format"),
    
  password: z
    .string()
    .min(6, "Password must have at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one capital letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[!@#$%^&*]/, "Password must contain at least one special character")
});

export const loginSchema=z.object({
  email: z
    .string()
    .email("Invalid email format"),
    
  password: z
    .string()
    .min(6, "Password must have at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one capital letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[!@#$%^&*]/, "Password must contain at least one special character")
})