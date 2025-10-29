import { IncidentTypeSchema } from "../src/types/claimSchemas";
import { PolicySchema } from "../src/types/claimSchemas";
import { ClaimSchema } from "../src/types/claimSchemas";
import { ClaimResponseSchema} from "../src/types/claimSchemas";

describe("IncidentTypeSchema", () => {
    it("should validate valid incident types", () => {
        const validTypes = ["theft", "fire", "water damage", "accident"];
        validTypes.forEach((type) => {
            expect(() => IncidentTypeSchema.parse(type)).not.toThrow();
        });
    });

    it("should throw an error for invalid incident types", () => {
        const invalidTypes = ["earthquake", "flood", "vandalism", ""];
        invalidTypes.forEach((type) => {
            expect(() => IncidentTypeSchema.parse(type)).toThrow();
        });
    });
});

describe("PolicySchema", () => {
    it("validates a valid policy", () => {
        const validPolicy = {
            policyId: "P-001",
            startDate: new Date("2023-01-01"),
            endDate: new Date("2024-01-01"),
            deductible: 500,
            coverageLimit: 100000,
            coveredIncidents: ["theft", "fire"]
        };
        expect(() => PolicySchema.parse(validPolicy)).not.toThrow();
    });

    it("throws for negative deductible", () => {
        const bad = {
            policyId: "P-002",
            startDate: new Date(),
            endDate: new Date(),
            deductible: -10,
            coverageLimit: 1000,
            coveredIncidents: ["theft"]
        };
        expect(() => PolicySchema.parse(bad)).toThrow();
    });

    it("throws for non-positive coverageLimit", () => {
        const bad = {
            policyId: "P-003",
            startDate: new Date(),
            endDate: new Date(),
            deductible: 0,
            coverageLimit: 0,
            coveredIncidents: ["fire"]
        };
        expect(() => PolicySchema.parse(bad)).toThrow();
    });

    it("throws when coveredIncidents contains an invalid incident", () => {
        const bad = {
            policyId: "P-004",
            startDate: new Date(),
            endDate: new Date(),
            deductible: 100,
            coverageLimit: 1000,
            coveredIncidents: ["earthquake"] // invalid per IncidentTypeSchema
        };
        expect(() => PolicySchema.parse(bad)).toThrow();
    });

    it("throws when date fields are not Date objects", () => {
        const bad = {
            policyId: "P-005",
            startDate: "2023-01-01",
            endDate: "2024-01-01",
            deductible: 100,
            coverageLimit: 1000,
            coveredIncidents: ["theft"]
        };
        expect(() => PolicySchema.parse(bad)).toThrow();
    });

    it("throws when required fields are missing", () => {
        const bad = {
            startDate: new Date(),
            endDate: new Date(),
            deductible: 100,
            coverageLimit: 1000,
            coveredIncidents: ["theft"]
        };
        // missing policyId
        expect(() => PolicySchema.parse(bad as any)).toThrow();
    });
});

describe("ClaimSchema", () => {
    it ("validates a valid claim", () => {
        const validClaim = {
            policyId: "P-001",
            incidentType: "theft",
            incidentDate: new Date("2023-06-15"),
            amountClaimed: 2500
        };
        expect(() => ClaimSchema.parse(validClaim)).not.toThrow();
    });

    it("throws for non-positive amountClaimed", () => {
        const bad = {
            policyId: "P-002",
            incidentType: "fire",
            incidentDate: new Date(),
            amountClaimed: 0
        };
        expect(() => ClaimSchema.parse(bad)).toThrow();
    });

    it("throws when incidentType is invalid", () => {
        const bad = {
            policyId: "P-003",
            incidentType: "flood", // invalid per IncidentTypeSchema
            incidentDate: new Date(),
            amountClaimed: 1000
        };
        expect(() => ClaimSchema.parse(bad)).toThrow();
    });

    it("throws when incidentDate is not a Date object", () => {
        const bad = {
            policyId: "P-004",
            incidentType: "accident",
            incidentDate: "2023-06-15",
            amountClaimed: 500
        };
        expect(() => ClaimSchema.parse(bad)).toThrow();
    });

    it("throws when required fields are missing", () => {
        const bad = {
            incidentType: "theft",
            incidentDate: new Date(),
            amountClaimed: 300
        };
        // missing policyId
        expect(() => ClaimSchema.parse(bad as any)).toThrow();
    });
})

describe("ClaimResponseSchema", () => {
    it("validates a valid claim response", () => {
        const validResponse = {
            approved: true,
            payout: 2000,
            reasonCode: "APPROVED"
        };
        expect(() => ClaimResponseSchema.parse(validResponse)).not.toThrow();
    });

    it("throws for negative payout", () => {
        const bad = {
            approved: false,
            payout: -100,
            reasonCode: "POLICY_INACTIVE"
        };
        expect(() => ClaimResponseSchema.parse(bad)).toThrow();
    });

    it("throws when reasonCode is invalid", () => {
        const bad = {
            approved: true,
            payout: 1500,
            reasonCode: "INVALID_CODE"
        };
        expect(() => ClaimResponseSchema.parse(bad)).toThrow();
    });

    it("throws when required fields are missing", () => {
        const bad = {
            approved: true,
            payout: 1000
        };
        // missing reasonCode
        expect(() => ClaimResponseSchema.parse(bad as any)).toThrow();
    });
});