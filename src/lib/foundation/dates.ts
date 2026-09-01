export type DateRange = { start: Date; end: Date };
export const isValidDateRange = ({ start, end }: DateRange) => !Number.isNaN(start.getTime()) && end.getTime() >= start.getTime();
export const daysBetween = (start: Date, end: Date) => Math.max(0, Math.ceil((end.getTime() - start.getTime()) / 86_400_000));
