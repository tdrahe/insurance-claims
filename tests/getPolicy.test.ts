import { getPolicyById } from "../src/logic/getPolicy";

jest.mock("../src/data/polocies", () => ({
    examplePolicies: [
        { policyId: "1", name: "Policy One" },
        { policyId: "2", name: "Policy Two" },
    ],
}));

describe("getPolicyById", () => {
    it("should return the correct policy for a valid ID", () => {
        const policy = getPolicyById("1");
        expect(policy).toEqual({ policyId: "1", name: "Policy One" });
    });

    it("should return undefined for an invalid ID", () => {
        const policy = getPolicyById("999");
        expect(policy).toBeUndefined();
    });
});