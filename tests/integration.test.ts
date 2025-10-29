import { handleClaim } from "../src/index";
import { getPolicyById } from "../src/logic/getPolicy";
import { Claim } from "../src/types/claimSchemas";

jest.mock("../src/logic/getPolicy", () => ({
    getPolicyById: jest.fn(),
}));

describe("Integration Test - handleClaim", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test("processes a valid claim successfully", async () => {
        (getPolicyById as jest.Mock).mockReturnValue({
            policyId: "POL123",
            startDate: new Date("2023-01-01"),
            endDate: new Date("2023-12-31"),
            coveredIncidents: ["fire"],
            deductible: 500,
            coverageLimit: 10000,
        });

        const claim: Claim = {
            policyId: "POL123",
            incidentType: "fire",
            incidentDate: new Date("2023-06-15"),
            amountClaimed: 3000,
        };

        const result = await handleClaim(claim);
        expect(result).toEqual({
            approved: true,
            payout: 2500,
            reasonCode: "APPROVED",
        });
    });

    test("rejects a claim for an inactive policy", async () => {
        (getPolicyById as jest.Mock).mockReturnValue({
            policyId: "POL123",
            startDate: new Date("2023-01-01"),
            endDate: new Date("2023-06-01"),
            coveredIncidents: ["fire"],
            deductible: 500,
            coverageLimit: 10000,
        });

        const claim: Claim = {
            policyId: "POL123",
            incidentType: "fire",
            incidentDate: new Date("2023-06-15"),
            amountClaimed: 2000,
        };

        const result = await handleClaim(claim);
        expect(result.reasonCode).toBe("POLICY_INACTIVE");
    });

    test("handles uncovered incident types", async () => {
        (getPolicyById as jest.Mock).mockReturnValue({
            policyId: "POL123",
            startDate: new Date("2023-01-01"),
            endDate: new Date("2023-12-31"),
            coveredIncidents: ["fire"],
            deductible: 500,
            coverageLimit: 10000,
        });

        const claim: Claim = {
            policyId: "POL123",
            incidentType: "theft",
            incidentDate: new Date("2023-06-15"),
            amountClaimed: 2000,
        };

        const result = await handleClaim(claim);
        expect(result.reasonCode).toBe("NOT_COVERED");
    });

    test("returns ZERO_PAYOUT for claims below the deductible", async () => {
        (getPolicyById as jest.Mock).mockReturnValue({
            policyId: "POL123",
            startDate: new Date("2023-01-01"),
            endDate: new Date("2023-12-31"),
            coveredIncidents: ["fire"],
            deductible: 500,
            coverageLimit: 10000,
        });

        const claim: Claim = {
            policyId: "POL123",
            incidentType: "fire",
            incidentDate: new Date("2023-06-15"),
            amountClaimed: 400,
        };

        const result = await handleClaim(claim);
        expect(result.reasonCode).toBe("ZERO_PAYOUT");
    });

    test("caps payout at the coverage limit", async () => {
        (getPolicyById as jest.Mock).mockReturnValue({
            policyId: "POL123",
            startDate: new Date("2023-01-01"),
            endDate: new Date("2023-12-31"),
            coveredIncidents: ["fire"],
            deductible: 500,
            coverageLimit: 10000,
        });

        const claim: Claim = {
            policyId: "POL123",
            incidentType: "fire",
            incidentDate: new Date("2023-06-15"),
            amountClaimed: 20000,
        };

        const result = await handleClaim(claim);
        expect(result.payout).toBe(10000);
    });
});
