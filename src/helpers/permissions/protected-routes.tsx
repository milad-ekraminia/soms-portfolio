import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "@/components/ui/loader/loader";
import { usePermissions } from "@/hooks/permissions/use-permissions";
import { useAuth } from "@/providers/auth-context";

interface ProtectedProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedProps) => {
  const { isLoading } = usePermissions();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // While auth is loading, show loader
  if (authLoading) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "var(--bg-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If permissions are still loading, show loader
  if (isLoading) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "var(--bg-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};
