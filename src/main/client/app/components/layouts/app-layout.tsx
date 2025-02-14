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
          <main className="px-2 md:px-12 py-6">
            <Outlet />
          </main>
        </AuthProvider>
      </QueryProvider>
    </>
  )
}
