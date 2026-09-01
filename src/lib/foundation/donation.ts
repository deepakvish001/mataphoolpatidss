export const donationAmountIsValid = (rupees: number, minimum = 1, maximum = 1_000_000) => Number.isFinite(rupees) && rupees >= minimum && rupees <= maximum;
export const donationReference = (prefix: string, sequence: number) => `${prefix.trim().toUpperCase()}-${String(sequence).padStart(6, "0")}`;
