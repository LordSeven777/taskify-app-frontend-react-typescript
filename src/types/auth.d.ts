import type { UserAttributes } from './user';

export interface AuthResult {
  user: UserAttributes;
  accessToken: string;
  refreshToken?: string;
  csrfToken: string;
}
