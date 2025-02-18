import { createContext, useContext, type ReactNode } from "react";
import { GlobalSpinner } from "~/components/global-spinner";
import { useFetchCurrentUser, useLogoutMutation } from "~/features/auth/api";

import type { User } from "~/features/auth/types";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

  const { data, isLoading, isError, isFetching } = useFetchCurrentUser();

  const logoutFn = useLogoutMutation();

  if (isLoading || isFetching) {
    return <GlobalSpinner />
  }

  const getUser = () => {
    if (isError) return null
    return data
  }

  return (
    <AuthContext.Provider value={{
      user: getUser(),
      logout: logoutFn,
      isLoading: isLoading || isFetching,
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

