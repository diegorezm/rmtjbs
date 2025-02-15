import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { GlobalSpinner } from "~/components/global-spinner";
import { useFetchCurrentUser, useLogoutMutation } from "~/features/auth/api";

import type { User } from "~/features/auth/types";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const { data, isLoading: queryLoading, isError } = useFetchCurrentUser();

  const logoutFn = useLogoutMutation();

  const logout = () => {
    setUser(null)
    logoutFn()
  }

  useEffect(() => {
    if (!queryLoading) {
      if (!isError) {
        setUser(data);
      } else {
        logout()
      }
      setIsFetching(false);
    }
  }, [data, queryLoading, isError]);

  if (isFetching) {
    return <GlobalSpinner />
  }

  return (
    <AuthContext.Provider value={{
      user,
      logout,
      setUser,
      isLoading: isFetching
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

