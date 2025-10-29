import {examplePolicies} from "../data/polocies";

export function getPolicyById(policyId: string) {
    return examplePolicies.find(policy => policy.policyId === policyId);
}