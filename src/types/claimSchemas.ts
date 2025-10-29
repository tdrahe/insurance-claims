import { z } from "zod";

export const IncidentTypeSchema = z.enum([
  "theft",
  "fire",
  "water damage",
  "accident"
]);
export type IncidentType = z.infer<typeof IncidentTypeSchema>;