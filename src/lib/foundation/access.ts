export type Permission = "content:read" | "content:write" | "reports:read" | "users:manage";
export const hasPermission = (granted: Permission[], required: Permission) => granted.includes(required);
export const hasEveryPermission = (granted: Permission[], required: Permission[]) => required.every((item) => granted.includes(item));
