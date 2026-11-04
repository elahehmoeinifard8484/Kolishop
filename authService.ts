/**
 * Authentication & Security Service
 * Handles password verification, brute-force mitigation, and session management
 */

import { SECURITY_CONFIG } from './securityConfig';
import { hashPasswordWithSalt, generateSecureToken } from './cryptoUtils';

export interface LockoutStatus {
  isLocked: boolean;
  remainingSeconds: number;
}

export interface LoginResult {
  success: boolean;
  errorMessage?: string;
  remainingAttempts?: number;
}

export class AuthService {
  /**
   * Initializes password hash in storage if not already present.
   */
  public static async init(): Promise<void> {
    try {
      const current = localStorage.getItem(SECURITY_CONFIG.STORAGE_KEYS.HASH);
      if (!current) {
        // Hash 'admin' with salt and store
        const initialHash = await hashPasswordWithSalt('admin');
        localStorage.setItem(SECURITY_CONFIG.STORAGE_KEYS.HASH, initialHash);
      }
    } catch {
      // Fallback
    }
  }

  /**
   * Checks if the login is currently locked due to too many failed attempts
   */
  public static checkLockout(): LockoutStatus {
    try {
      const rawLockout = localStorage.getItem(SECURITY_CONFIG.STORAGE_KEYS.LOCKOUT_UNTIL);
      if (!rawLockout) return { isLocked: false, remainingSeconds: 0 };

      const lockoutUntil = parseInt(rawLockout, 10);
      const now = Date.now();

      if (now < lockoutUntil) {
        const remainingSeconds = Math.ceil((lockoutUntil - now) / 1000);
        return { isLocked: true, remainingSeconds };
      }

      // Lockout expired, clear lock
      localStorage.removeItem(SECURITY_CONFIG.STORAGE_KEYS.LOCKOUT_UNTIL);
      localStorage.setItem(SECURITY_CONFIG.STORAGE_KEYS.FAILED_COUNT, '0');
      return { isLocked: false, remainingSeconds: 0 };
    } catch {
      return { isLocked: false, remainingSeconds: 0 };
    }
  }

  /**
   * Attempts to log in with the provided password
   */
  public static async login(password: string): Promise<LoginResult> {
    const lockout = this.checkLockout();
    if (lockout.isLocked) {
      const mins = Math.ceil(lockout.remainingSeconds / 60);
      return {
        success: false,
        errorMessage: `حساب به دلیل تلاش‌های مکرر ناموفق قفل شده است. لطفاً ${mins} دقیقه دیگر تلاش کنید.`,
      };
    }

    if (!password || !password.trim()) {
      return {
        success: false,
        errorMessage: 'رمز عبور نمی‌تواند خالی باشد.',
      };
    }

    // Get current stored hash
    let storedHash = localStorage.getItem(SECURITY_CONFIG.STORAGE_KEYS.HASH);
    if (!storedHash) {
      storedHash = await hashPasswordWithSalt('admin');
      localStorage.setItem(SECURITY_CONFIG.STORAGE_KEYS.HASH, storedHash);
    }

    const inputHash = await hashPasswordWithSalt(password.trim());

    if (inputHash === storedHash) {
      // SUCCESS: Clear failed counter and lockout
      localStorage.removeItem(SECURITY_CONFIG.STORAGE_KEYS.FAILED_COUNT);
      localStorage.removeItem(SECURITY_CONFIG.STORAGE_KEYS.LOCKOUT_UNTIL);

      // Create session
      const sessionData = {
        token: generateSecureToken(),
        expiresAt: Date.now() + SECURITY_CONFIG.SESSION_DURATION_MS,
      };
      localStorage.setItem(SECURITY_CONFIG.STORAGE_KEYS.SESSION, JSON.stringify(sessionData));

      return { success: true };
    }

    // FAILURE: Increment failed attempts
    const rawCount = localStorage.getItem(SECURITY_CONFIG.STORAGE_KEYS.FAILED_COUNT) || '0';
    const failedCount = parseInt(rawCount, 10) + 1;
    localStorage.setItem(SECURITY_CONFIG.STORAGE_KEYS.FAILED_COUNT, failedCount.toString());

    if (failedCount >= SECURITY_CONFIG.MAX_FAILED_ATTEMPTS) {
      const lockUntil = Date.now() + SECURITY_CONFIG.LOCKOUT_DURATION_MS;
      localStorage.setItem(SECURITY_CONFIG.STORAGE_KEYS.LOCKOUT_UNTIL, lockUntil.toString());
      return {
        success: false,
        errorMessage: 'تعداد تلاش‌های ناموفق بیش از حد مجاز بود. ورود برای ۱۵ دقیقه مسدود شد.',
      };
    }

    const remaining = SECURITY_CONFIG.MAX_FAILED_ATTEMPTS - failedCount;
    return {
      success: false,
      remainingAttempts: remaining,
      errorMessage: `رمز عبور نادرست است. (${remaining} بار تلاش باقی‌مانده)`,
    };
  }

  /**
   * Checks if current active session is valid
   */
  public static isSessionValid(): boolean {
    try {
      const rawSession = localStorage.getItem(SECURITY_CONFIG.STORAGE_KEYS.SESSION);
      if (!rawSession) return false;

      const session = JSON.parse(rawSession);
      if (!session.token || !session.expiresAt) return false;

      if (Date.now() > session.expiresAt) {
        this.logout();
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Destroys the current authenticated session
   */
  public static logout(): void {
    try {
      localStorage.removeItem(SECURITY_CONFIG.STORAGE_KEYS.SESSION);
    } catch {
      // Ignore
    }
  }

  /**
   * Changes the admin password
   */
  public static async changePassword(
    currentPass: string,
    newPass: string
  ): Promise<{ success: boolean; errorMessage?: string }> {
    if (!newPass || newPass.trim().length < SECURITY_CONFIG.MIN_PASSWORD_LENGTH) {
      return {
        success: false,
        errorMessage: `رمز عبور جدید باید حداقل ${SECURITY_CONFIG.MIN_PASSWORD_LENGTH} کاراکتر باشد.`,
      };
    }

    let storedHash = localStorage.getItem(SECURITY_CONFIG.STORAGE_KEYS.HASH);
    if (!storedHash) {
      storedHash = await hashPasswordWithSalt('admin');
    }

    const currentInputHash = await hashPasswordWithSalt(currentPass.trim());
    if (currentInputHash !== storedHash) {
      return {
        success: false,
        errorMessage: 'رمز عبور فعلی نادرست است.',
      };
    }

    // Save new hash
    const newHash = await hashPasswordWithSalt(newPass.trim());
    localStorage.setItem(SECURITY_CONFIG.STORAGE_KEYS.HASH, newHash);

    // Refresh session expiration
    const sessionData = {
      token: generateSecureToken(),
      expiresAt: Date.now() + SECURITY_CONFIG.SESSION_DURATION_MS,
    };
    localStorage.setItem(SECURITY_CONFIG.STORAGE_KEYS.SESSION, JSON.stringify(sessionData));

    return { success: true };
  }
}
