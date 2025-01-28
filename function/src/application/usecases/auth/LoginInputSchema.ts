import { z } from 'zod';

export const LoginInputSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6),
});

export type LoginInput = z.infer<typeof LoginInputSchema>;
