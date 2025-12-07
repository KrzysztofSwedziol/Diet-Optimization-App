import { createContext, useContext } from 'react';
import { useCheckAuth, useLogIn, useLogOut, useRegister } from '@/api/auth/hooks';
import { Gender, User } from '@/api/types.ts';

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: { username: string; email: string; password: string; gender: Gender }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useCheckAuth();

  const loginMutation = useLogIn();
  const logoutMutation = useLogOut();
  const registerMutation = useRegister();

  const isLoggedIn = !!user;

  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const register = async (data: { username: string; email: string; password: string; gender: Gender }) => {
    await registerMutation.mutateAsync(data);
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoggedIn,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
