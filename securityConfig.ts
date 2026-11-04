/**
 * Security Configuration for Koli Shop Admin Panel
 * Dedicated security & secrets module
 */

export const SECURITY_CONFIG = {
  // Unique application salt for hashing passwords
  SECURITY_SALT: 'koli_shop_sec_v2_salt_9f8e7d6c',

  // Default master password SHA-256 hash (Pre-computed for "admin" + salt)
  // sha256("admin:koli_shop_sec_v2_salt_9f8e7d6c")
  INITIAL_PASSWORD_HASH: 'a7c9332e7cbcf00d60d00f60fc2d3eb99960fffe7e721d0a846fcddfaae0d715',

  // Brute force protection policy
  MAX_FAILED_ATTEMPTS: 5,
  LOCKOUT_DURATION_MS: 15 * 60 * 1000, // 15 minutes lockout after 5 consecutive failures

  // Session security
  SESSION_DURATION_MS: 2 * 60 * 60 * 1000, // 2 hours session expiry

  // Password rules
  MIN_PASSWORD_LENGTH: 4,

  // Local storage keys (isolated from general store data)
  STORAGE_KEYS: {
    HASH: 'koli_sec_pwd_hash_v2',
    SESSION: 'koli_sec_session_v2',
    FAILED_COUNT: 'koli_sec_fail_count_v2',
    LOCKOUT_UNTIL: 'koli_sec_lockout_v2',
  },
} as const;
