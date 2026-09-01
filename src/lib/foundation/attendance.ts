export const attendancePercent = (attended: number, delivered: number) => delivered <= 0 ? 0 : Math.min(100, Math.max(0, (attended / delivered) * 100));
export const meetsAttendanceRequirement = (attended: number, delivered: number, required = 75) => attendancePercent(attended, delivered) >= required;
