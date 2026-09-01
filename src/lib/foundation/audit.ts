export type AuditMetadata = { action: string; actorId: string; occurredAt: string; recordId?: string };
export const auditMetadata = (action: string, actorId: string, recordId?: string): AuditMetadata => ({ action: action.trim(), actorId: actorId.trim(), occurredAt: new Date().toISOString(), recordId });
