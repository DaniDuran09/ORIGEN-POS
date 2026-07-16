import { z } from "zod";

export const registerRequestSchema = z.object({
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    email: z.email(),
    password: z.string().min(8),
});

export type RegisterRequestDto = z.infer<typeof registerRequestSchema>;