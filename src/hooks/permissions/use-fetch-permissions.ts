import { useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "react-oauth2-code-pkce";
import { fetchPermissions } from "@/services/permissions/fetch-permissions";
import { STALE_TIMES } from "@/helpers/data/query";

/**
 * React Query hook to fetch user permissions
 */
export const useFetchPermissions = () => {
  const { tokenData } = useContext(AuthContext);
  // Extract sub from token
  const userId = useMemo(() => {
    if (!tokenData?.sub) return null;
    return tokenData?.sub || null;
  }, [tokenData]);

  // Fetch permissions using React Query
  const {
    data: permissionsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["permissions", userId],
    queryFn: () => {
      return fetchPermissions({ providerKey: userId! });
    },
    enabled: !!userId,
    staleTime: STALE_TIMES.MEDIUM, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    permissions: permissionsData?.items || [],
    isLoading,
    error,
    userId,
    refetch,
  };
};
