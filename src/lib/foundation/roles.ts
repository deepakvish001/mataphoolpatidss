export type FoundationRole = "viewer" | "editor" | "manager" | "admin";
const rank: Record<FoundationRole, number> = { viewer: 0, editor: 1, manager: 2, admin: 3 };
export const hasMinimumRole = (actual: FoundationRole, required: FoundationRole) => rank[actual] >= rank[required];
