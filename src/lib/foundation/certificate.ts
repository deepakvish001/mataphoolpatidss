export const certificateNumber = (courseCode: string, year: number, sequence: number) => `${courseCode.trim().toUpperCase()}-${year}-${String(sequence).padStart(6, "0")}`;
export const isCertificateYearValid = (year: number) => year >= 2000 && year <= new Date().getFullYear() + 1;
