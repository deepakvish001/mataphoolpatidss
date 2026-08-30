export const normalizeEmail = (value: string) => value.trim().toLocaleLowerCase();
export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value));
