import { api } from './api';

export interface UserAuthCredentials {
  username?: string;
  email: string;
  password?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

export const login = async (data: UserAuthCredentials) => {
  return await api.post<AuthResponse>('/auth/login', data);
};

export const signup = async (data: UserAuthCredentials) => {
  return await api.post<AuthResponse>('/auth/signup', data);
};

// Backwards compatibility alias for existing code
export const sinup = signup;

export const resetPassword = async (email: string) => {
  return await api.post('/auth/reset-password', { email });
};

export const changePassword = async (data: UserAuthCredentials) => {
  return await api.post('/auth/change-password', data);
};

export const ssoLogin = async (provider: string) => {
  return await api.get(`/auth/sso/${provider}`);
};
