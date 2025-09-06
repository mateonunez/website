/**
 * Cookie utilities for managing terminal visit state
 */

const TERMINAL_VISITED_KEY = 'terminal_visited';
const COOKIE_EXPIRATION_HOURS = 72;

/**
 * Sets a cookie indicating the user has visited the terminal
 */
export function setTerminalVisitedCookie(): void {
  if (typeof document === 'undefined') return;

  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + COOKIE_EXPIRATION_HOURS * 60 * 60 * 1000);

  document.cookie = `${TERMINAL_VISITED_KEY}=true; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
}

/**
 * Checks if the terminal has been visited before (within 72 hours)
 */
export function hasTerminalBeenVisited(): boolean {
  if (typeof document === 'undefined') return false;

  const cookies = document.cookie.split(';');
  const terminalCookie = cookies.find((cookie) => cookie.trim().startsWith(`${TERMINAL_VISITED_KEY}=`));

  return terminalCookie?.split('=')[1]?.trim() === 'true';
}

/**
 * Clears the terminal visited cookie (for testing purposes)
 */
export function clearTerminalVisitedCookie(): void {
  if (typeof document === 'undefined') return;

  document.cookie = `${TERMINAL_VISITED_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
