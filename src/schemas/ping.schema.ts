import { z } from "zod";

export const PingRequestSchema = z.object({
  query: z.object({
    name: z.string().min(1).optional(),
  }),
});

export type PingRequestInput = z.infer<typeof PingRequestSchema>;
