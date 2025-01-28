import { z } from 'zod';

export const CreateCustomerSchema = z.object({
  name: z.string().min(3),
  identifier: z.string().optional(),
  address: z.object({
    street: z.string().min(3),
    adtional: z.string().optional(),
    city: z.string().min(3),
    province: z.string().min(3),
    country: z.string().min(2),
    zip: z.string().min(3),
  }),
  contacts: z
    .array(
      z.object({
        type: z.enum(['phone', 'email', 'social']),
        value: z.string().min(3),
      })
    )
    .optional(),
});

export type CreateCustomerInput = z.infer<typeof CreateCustomerSchema>;
