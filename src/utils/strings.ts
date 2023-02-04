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
