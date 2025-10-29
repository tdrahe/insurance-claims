import { IncidentTypeSchema } from "../src/types/claimSchemas";

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