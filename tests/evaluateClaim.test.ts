import { evaluateClaim } from "../src/logic/evaluateClaim";
import { getPolicyById } from "../src/logic/getPolicy";
import { Claim } from "../src/types/claimSchemas";

jest.mock("../src/logic/getPolicy", () => ({
    getPolicyById: jest.fn(),
}));

describe("evaluateClaim", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test("approves valid claim", () => {
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

        const result = evaluateClaim(claim);
        expect(result).toEqual({
            approved: true,
            payout: 2500,
            reasonCode: "APPROVED",
        });
    });

    test("rejects inactive policy", () => {
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

        expect(evaluateClaim(claim).reasonCode).toBe("POLICY_INACTIVE");
    });

    test("rejects uncovered incident", () => {
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

        expect(evaluateClaim(claim).reasonCode).toBe("NOT_COVERED");
    });

    test("returns ZERO_PAYOUT when below deductible", () => {
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

        expect(evaluateClaim(claim).reasonCode).toBe("ZERO_PAYOUT");
    });

    test("caps payout at coverage limit", () => {
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

        const result = evaluateClaim(claim);
        expect(result.payout).toBe(10000);
    });
});
