import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import type { SerializedError } from '@reduxjs/toolkit';

export function isFetchBaseQueryError(
  error: FetchBaseQueryError | SerializedError
): error is FetchBaseQueryError {
  return 'status' in error;
}
