/**
 * Generates a unique string from timestamps
 * @returns The unique string
 */
export function generateUniqueString() {
  return `${Date.now()}-${Math.floor(Math.random() * 100)}`;
}
