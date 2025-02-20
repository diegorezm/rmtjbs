import { QueryProvider } from "~/providers/query-provider";
import { Navbar } from "../navbar";
import { Outlet } from "react-router";
import { AuthProvider } from "~/providers/auth-provider";

export default function AppLayout() {
  return (
    <>
      <QueryProvider>
        <AuthProvider>
          <Navbar />
          <main>
            <Outlet />
          </main>
        </AuthProvider>
      </QueryProvider>
    </>
  )
}
