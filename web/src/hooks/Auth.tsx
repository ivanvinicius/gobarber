import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

interface IUserProps {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
}

interface IAuthState {
  token: string;
  user: IUserProps;
}

interface IUserData {
  email: string;
  password: string;
}

interface IAuthContext {
  user: IUserProps;
  signIn(userData: IUserData): Promise<void>;
  signOut(): void;
  updateUser(user: IUserProps): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@GoBaber:token');
    const user = localStorage.getItem('@GoBaber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }: IUserData) => {
    const response = await api.post('/sessions', { email, password });

    const { token, user } = response.data;

    localStorage.setItem('@GoBaber:token', token);
    localStorage.setItem('@GoBaber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBaber:token');
    localStorage.removeItem('@GoBaber:user');

    setData({} as IAuthState);
  }, []);

  const updateUser = useCallback(
    (user: IUserProps) => {
      localStorage.setItem('@GoBaber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, updateUser, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
