/**
 * Generates a unique string from timestamps
 * @returns The unique string
 */
export function generateUniqueString() {
  return `${Date.now()}-${Math.floor(Math.random() * 100)}`;
}

/**
 * Evaluates whether a string is considered to be a strong password
 * i.e: Has at least 7 characters and contains at least 1 lowercase, 1 uppercase and 1 special character
 *
 * @param pwd The password string to evalutes
 * @returns Is strong password or not
 */
export function isStrongPassword(pwd: string, minLength: number) {
  const hasLowerCase = /[a-z]+/;
  const hasUpperCase = /[A-Z]+/;
  const hasSpecialChars = /[!@#$%^&*]+/;
  return (
    pwd.length >= minLength &&
    hasLowerCase.test(pwd) &&
    hasUpperCase.test(pwd) &&
    hasSpecialChars.test(pwd)
  );
}

/**
 * Transforms a word into its plural form
 *
 * @param singular The singular word to pluralize
 * @param countOrIsPlural A boolean value or count number that determines if the singular should be pluralized
 * @param suffix The plural suffix of the word
 * @returns The eventual pluralized output
 */
export function pluralize(
  singular: string,
  countOrIsPlural: number | boolean,
  suffix = 's'
): string {
  if (
    (typeof countOrIsPlural === 'number' && countOrIsPlural <= 1) ||
    (typeof countOrIsPlural === 'boolean' && !countOrIsPlural)
  ) {
    return singular;
  }
  return singular + suffix;
}
