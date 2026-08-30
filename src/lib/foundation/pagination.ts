export const safePage = (value: number) => Math.max(1, Math.trunc(value));
export const safePageSize = (value: number, maximum = 100) => Math.min(maximum, Math.max(1, Math.trunc(value)));
export const offsetForPage = (page: number, size: number) => (safePage(page) - 1) * safePageSize(size);
