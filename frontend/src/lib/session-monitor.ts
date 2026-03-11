import apiClient from './api-client';

/**
 * Session Monitor
 * Polls session status and triggers warnings/logout
 */

export type SessionStatusCallback = (expiresInSeconds: number) => void;
export type SessionExpiredCallback = () => void;

class SessionMonitor {
  private intervalId: NodeJS.Timeout | null = null;
  private statusCallback: SessionStatusCallback | null = null;
  private expiredCallback: SessionExpiredCallback | null = null;
  private pollInterval = 60000; // 60 seconds
  private warningThreshold = 300; // 5 minutes (300 seconds)

  /**
   * Start monitoring session status
   * @param onStatus Callback when session status is checked
   * @param onExpired Callback when session expires
   */
  start(onStatus: SessionStatusCallback, onExpired: SessionExpiredCallback) {
    this.statusCallback = onStatus;
    this.expiredCallback = onExpired;

    // Initial check
    this.checkSessionStatus();

    // Start polling
    this.intervalId = setInterval(() => {
      this.checkSessionStatus();
    }, this.pollInterval);
  }

  /**
   * Stop monitoring session status
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.statusCallback = null;
    this.expiredCallback = null;
  }

  /**
   * Check session status via API
   */
  private async checkSessionStatus() {
    try {
      const response = await apiClient.get('/api/auth/session-status');
      const { active, expires_in_seconds } = response.data;

      if (active && this.statusCallback) {
        this.statusCallback(expires_in_seconds);
      }
    } catch (error: any) {
      // Session expired or invalid
      if (error.response?.status === 401) {
        if (this.expiredCallback) {
          this.expiredCallback();
        }
      }
    }
  }

  /**
   * Get warning threshold in seconds
   */
  getWarningThreshold(): number {
    return this.warningThreshold;
  }
}

export const sessionMonitor = new SessionMonitor();
