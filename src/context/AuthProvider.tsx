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

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user)
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem('@dowhile:token');
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('profile').then(response => {
        setUser(response.data)
      })
    }
  }, [])

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
      user,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}