export type AgeBand = { minimum: number; maximum: number };
export const isAgeEligible = (age: number, band: AgeBand) => Number.isInteger(age) && age >= band.minimum && age <= band.maximum;
export const normalizeSchemeCode = (value: string) => value.trim().replace(/\s+/g, "-").toUpperCase();
