import { z } from "zod";

export const IncidentTypeSchema = z.enum([
  "theft",
  "fire",
  "water damage",
  "accident"
]);
export type IncidentType = z.infer<typeof IncidentTypeSchema>;

export const PolicySchema = z.object({
    policyId: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    deductible: z.number().min(0),
    coverageLimit: z.number().positive(),
    coveredIncidents: z.array(IncidentTypeSchema)
});
export type Policy = z.infer<typeof PolicySchema>;

export const ClaimSchema = z.object({
    policyId: z.string(),
    incidentType: IncidentTypeSchema,
    incidentDate: z.date(),
    amountClaimed: z.number().positive()
});
export type Claim = z.infer<typeof ClaimSchema>;

