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
  return await api.post<AuthResponse>('/login', data);
};

export const signup = async (data: UserAuthCredentials) => {
  return await api.post<AuthResponse>('/signup', data);
};

// Backwards compatibility alias for existing code
export const sinup = signup;

export const resetPassword = async (email: string) => {
  return await api.post('/reset-password', { email });
};

export const changePassword = async (data: UserAuthCredentials) => {
  return await api.post('/change-password', data);
};

export const googleLogin = async () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/google-login`;
};

export const logout=async()=>{
  return await api.post('/logout')
};