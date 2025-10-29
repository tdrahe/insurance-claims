import { ClaimSchema } from "./types/claimSchemas";
import { evaluateClaim } from "./logic/evaluateClaim";

export function handleClaim(rawClaim: unknown) {
    const claim = ClaimSchema.parse(rawClaim);
    return evaluateClaim(claim);
}