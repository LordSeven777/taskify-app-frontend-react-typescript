import type { ApiFieldValidationError } from '@customTypes/api';

/**
 * Returns key-value pairs of fields errors from the API validation error
 *
 * @param fieldsErrors The array of fields errors from the API validation error
 * @returns The key-value pairs of fields and errors
 */
export function formatApiValidationErrors(
  fieldsErrors: ApiFieldValidationError[]
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const error of fieldsErrors) {
    if (!(error.param in errors)) {
      errors[error.param] = error.msg;
    }
  }
  return errors;
}
