import { z } from "zod";
const createTaskZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required " }),
    email: z.string({ required_error: "Email is required " }),
    password: z.string({ required_error: "Password is required" }),
    address: z.string({ required_error: "Address is required " }),
    gender: z.enum(["Male", "Female", "Others"], {
      required_error: "Gender is required",
    }),
    // image: z.string({ required_error: "Image is required " }),
    // phone: z.number({ required_error: "Phone Number is required " }),
  }),
});

export const TaskValidation = { createTaskZodSchema };
// req -> validation
//body -> object
// data -> object
