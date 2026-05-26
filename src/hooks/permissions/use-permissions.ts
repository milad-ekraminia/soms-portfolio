import { useSelector } from "react-redux";
import { RootState } from "@/store/app/store";

/**
 * Hook to access user permissions from Redux store
 */
export const usePermissions = () => {
  const { permissions, permissionsMap, isLoading, error, userId } = useSelector(
    (state: RootState) => state.permissions
  );


  /**
   * Check if user has a specific permission
   */
  const hasPermission = (permissionName: string): boolean => {
    if (!permissionName) return true; // If no permission specified, allow access
    return permissionsMap[permissionName] ?? false;
  };

  /**
   * Check if user has any of the provided permissions
   */
  const hasAnyPermission = (permissionNames: string[]): boolean => {
    return permissionNames.some((name) => hasPermission(name));
  };

  /**
   * Check if user has all of the provided permissions
   */
  const hasAllPermissions = (permissionNames: string[]): boolean => {
    return permissionNames.every((name) => hasPermission(name));
  };

  return {
    permissions,
    permissionsMap,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isLoading,
    error,
    userId,
  };
};
