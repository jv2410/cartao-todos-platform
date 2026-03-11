import { query } from '../db/connection.js';

/**
 * Audit Service
 * Handles audit logging for compliance (LGPD)
 * Logs all sensitive operations for security and compliance tracking
 */

export interface AuditLogEntry {
  userId: string | null;
  action: string;
  resourceType: string;
  resourceId: string;
  changes?: Record<string, any>;
  ipAddress: string;
}

/**
 * Create an audit log entry
 * @param entry Audit log entry data
 */
export async function logAuditEvent(entry: AuditLogEntry): Promise<void> {
  try {
    await query(
      `INSERT INTO audit_logs (user_id, action, resource_type, resource_id, changes_json, ip_address)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        entry.userId,
        entry.action,
        entry.resourceType,
        entry.resourceId,
        entry.changes ? JSON.stringify(entry.changes) : null,
        entry.ipAddress,
      ]
    );
  } catch (error) {
    console.error('Audit log error:', error);
    // Don't throw error - audit logging should not break the main flow
  }
}

/**
 * Get audit logs for a specific user
 * @param userId User ID
 * @param limit Maximum number of logs to return
 * @returns Array of audit log entries
 */
export async function getUserAuditLogs(userId: string, limit: number = 100): Promise<any[]> {
  try {
    const result = await query(
      `SELECT id, action, resource_type, resource_id, changes_json, ip_address, created_at
       FROM audit_logs
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT $2`,
      [userId, limit]
    );

    return result.rows;
  } catch (error) {
    console.error('Get audit logs error:', error);
    return [];
  }
}

/**
 * Get all audit logs (admin view)
 * @param limit Maximum number of logs to return
 * @returns Array of audit log entries
 */
export async function getAllAuditLogs(limit: number = 100): Promise<any[]> {
  try {
    const result = await query(
      `SELECT a.id, a.user_id, u.username, a.action, a.resource_type, a.resource_id,
              a.changes_json, a.ip_address, a.created_at
       FROM audit_logs a
       LEFT JOIN users u ON a.user_id = u.id
       ORDER BY a.created_at DESC
       LIMIT $1`,
      [limit]
    );

    return result.rows;
  } catch (error) {
    console.error('Get all audit logs error:', error);
    return [];
  }
}

export default {
  logAuditEvent,
  getUserAuditLogs,
  getAllAuditLogs,
};
