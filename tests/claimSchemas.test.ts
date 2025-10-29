import { IncidentTypeSchema } from "../src/types/claimSchemas";
import { PolicySchema } from "../src/types/claimSchemas";

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
});