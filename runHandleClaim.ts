import { handleClaim } from "./src/index";

const rawClaim = {
    policyId: "P-1001",
    incidentType: "fire",
    incidentDate: new Date("2023-06-15"),
    amountClaimed: 3000,
};

try {
    const result = handleClaim(rawClaim);
    console.log("Claim Result:", result);
} catch (error) {
    console.error("Error:", error);
}
