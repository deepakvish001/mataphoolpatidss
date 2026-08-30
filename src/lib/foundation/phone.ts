export const normalizePhone = (value: string) => value.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
export const isValidIndianPhone = (value: string) => /^[6-9]\d{9}$/.test(normalizePhone(value));
