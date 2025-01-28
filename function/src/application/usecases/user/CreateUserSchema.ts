import { z } from 'zod';

export const CreateUserInputSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6),
});

export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;
