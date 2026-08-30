export const requiredText = (value: string, maximum = 200) => { const text = value.trim(); return text.length > 0 && text.length <= maximum; };
export const optionalText = (value: string | null | undefined, maximum = 1_000) => !value || value.trim().length <= maximum;
