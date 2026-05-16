const usernamePattern = /^[a-zA-Z0-9_]{3,24}$/;

export function normalizeUsername(value: string) {
  return value.trim().toLowerCase();
}

export function isValidUsername(value: string) {
  return usernamePattern.test(value);
}

export function usernameToAuthEmail(username: string) {
  return `${normalizeUsername(username)}@members.healcode.app`;
}
