import type { UserAttributes } from './user';

export interface AuthResult {
  user: UserAttributes;
  accessToken: string;
  refreshToken?: string;
  csrfToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
