import { createContext } from 'react';

export type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null;
  signInUrl: string;
}

export const AuthContext = createContext({} as AuthContextData);
