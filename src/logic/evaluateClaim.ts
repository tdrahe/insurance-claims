import { Claim, ClaimResponseSchema } from "../types/claimSchemas";
import { getPolicyById } from "./getPolicy";

export function evaluateClaim(claim: Claim) {
    const policy = getPolicyById(claim.policyId);
    if (!policy)
        return ClaimResponseSchema.parse({
            approved: false,
            payout: 0,
            reasonCode: "POLICY_INACTIVE",
        });

    // Policy active on incidentDate
    if (claim.incidentDate < policy.startDate || claim.incidentDate > policy.endDate)
        return ClaimResponseSchema.parse({
            approved: false,
            payout: 0,
            reasonCode: "POLICY_INACTIVE",
        });

    // Incident type covered
    if (!policy.coveredIncidents.includes(claim.incidentType))
        return ClaimResponseSchema.parse({
            approved: false,
            payout: 0,
            reasonCode: "NOT_COVERED",
        });

    // Calculate payout
    let payout = claim.amountClaimed - policy.deductible;
    if (payout <= 0)
        return ClaimResponseSchema.parse({
            approved: false,
            payout: 0,
            reasonCode: "ZERO_PAYOUT",
        });

    if (payout > policy.coverageLimit) payout = policy.coverageLimit;

    return ClaimResponseSchema.parse({
        approved: true,
        payout,
        reasonCode: "APPROVED",
    });
}
