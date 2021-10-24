import { ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';
import { AuthContext, User } from './AuthContext';

type AuthProvider = {
  children: ReactNode,
}

type AuthResponse = {
  token: string,
  user: {
    id: string,
    avatar_url: string,
    name: string,
    login: string,
  }
}

export function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<User | null>(null)

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=78a2072b6084465a0613`

  async function signIn(githubCode: string) {
    const responseApi = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    })

    const { token, user } = responseApi.data;

    localStorage.setItem('@dowhile:token', token);

    setUser(user)
  }

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutCode);

      signIn(githubCode);
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      signInUrl,
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
}