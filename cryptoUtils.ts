/**
 * Cryptographic utilities using the Web Crypto API
 */

import { SECURITY_CONFIG } from './securityConfig';

/**
 * Computes SHA-256 hash of a string using browser's native Web Crypto API
 */
export async function computeSHA256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Hashes a plaintext password together with the system salt
 */
export async function hashPasswordWithSalt(password: string): Promise<string> {
  const salted = `${password.trim()}:${SECURITY_CONFIG.SECURITY_SALT}`;
  return computeSHA256(salted);
}

/**
 * Generates a cryptographically strong random token for active sessions
 */
export function generateSecureToken(): string {
  const randomBytes = new Uint8Array(24);
  crypto.getRandomValues(randomBytes);
  return Array.from(randomBytes, (b) => b.toString(16).padStart(2, '0')).join('');
}
