import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/app/store";
import {
  setPermissionsLoading,
  setPermissions,
  setPermissionsError,
} from "@/store/app/permissions-slice";
import { useFetchPermissions } from "@/hooks/permissions/use-fetch-permissions";

/**
 * Provider component that syncs React Query permissions data to Redux on app initialization
 */
export const PermissionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { permissions, isLoading, error, userId } = useFetchPermissions();

  // Sync React Query data to Redux
  useEffect(() => {
    if (isLoading) {
      dispatch(setPermissionsLoading(true));
      return;
    }

    if (error) {
      dispatch(
        setPermissionsError(
          error instanceof Error ? error.message : "Failed to fetch permissions"
        )
      );
      return;
    }

    if (permissions.length > 0 && userId) {
      dispatch(
        setPermissions({
          permissions,
          userId,
        })
      );
    }
  }, [permissions, isLoading, error, userId, dispatch]);

  return <>{children}</>;
};
