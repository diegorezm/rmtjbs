import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useFetchCurrentUser, useLogoutMutation } from "~/features/auth/api";
import type { UserSafe } from "~/features/auth/types";

type AuthContextType = {
  user: UserSafe | null;
  setUser: (user: UserSafe | null) => void;
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSafe | null>(null);
  const { data, isLoading, isError } = useFetchCurrentUser();
  const logoutFn = useLogoutMutation();

  useEffect(() => {
    if (!isLoading && !isError) {
      setUser(data || null);
    }
  }, [data, isLoading, isError]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const logout = () => {
    setUser(null)
    logoutFn()
  }

  return (
    <AuthContext.Provider value={{
      user,
      logout,
      setUser
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

