import apiClient from './api-client';

/**
 * Activity Tracker
 * Detects user activity and extends session
 */

class ActivityTracker {
  private lastExtensionTime = 0;
  private extensionDebounceMs = 60000; // 1 minute
  private activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
  private isTracking = false;

  /**
   * Start tracking user activity
   */
  start() {
    if (this.isTracking) {
      return;
    }

    this.isTracking = true;

    // Add event listeners for activity detection
    this.activityEvents.forEach((event) => {
      window.addEventListener(event, this.handleActivity, { passive: true });
    });
  }

  /**
   * Stop tracking user activity
   */
  stop() {
    if (!this.isTracking) {
      return;
    }

    this.isTracking = false;

    // Remove event listeners
    this.activityEvents.forEach((event) => {
      window.removeEventListener(event, this.handleActivity);
    });
  }

  /**
   * Handle activity event
   */
  private handleActivity = () => {
    const now = Date.now();

    // Debounce: only extend session once per minute
    if (now - this.lastExtensionTime < this.extensionDebounceMs) {
      return;
    }

    this.lastExtensionTime = now;
    this.extendSession();
  };

  /**
   * Extend session via API
   */
  private async extendSession() {
    try {
      await apiClient.post('/api/auth/extend-session');
    } catch (error) {
      // Silent failure - session might be expired
      console.error('Failed to extend session:', error);
    }
  }

  /**
   * Manually extend session (called from warning dialog)
   */
  async extendSessionManually(): Promise<boolean> {
    try {
      await apiClient.post('/api/auth/extend-session');
      this.lastExtensionTime = Date.now();
      return true;
    } catch (error) {
      console.error('Failed to extend session manually:', error);
      return false;
    }
  }
}

export const activityTracker = new ActivityTracker();
