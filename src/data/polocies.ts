import {Policy} from "../types/claimSchemas";

export const examplePolicies: Policy[] = [
    {
        policyId: "P-1001",
        startDate: new Date("2023-01-01"),
        endDate: new Date("2024-01-01"),
        deductible: 500,
        coverageLimit: 100000,
        coveredIncidents: ["theft", "fire"]
    },
    {
        policyId: "P-1002",
        startDate: new Date("2023-06-15"),
        endDate: new Date("2024-06-15"),
        deductible: 1000,
        coverageLimit: 500000,
        coveredIncidents: ["water damage", "accident"]
    },
];