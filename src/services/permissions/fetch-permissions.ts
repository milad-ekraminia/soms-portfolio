import { getData } from "@/lib/api-method/api-method-functions";

export interface Permission {
  name: string;
  displayName: string;
  parentName: string | null;
  isGranted: boolean;
  allowedProviders: any[];
  grantedProviders: Array<{
    providerName: string;
    providerKey: string;
  }>;
}

export interface PermissionGroup {
  name: string;
  displayName: string;
  displayNameKey: string;
  displayNameResource: string;
  permissions: Permission[];
}

export interface PermissionsResponse {
  entityDisplayName: string;
  groups: PermissionGroup[];
}

export async function fetchPermissions({
  providerKey,
}: {
  providerKey: string;
}): Promise<{ items: Permission[] }> {

  const response = await getData<PermissionsResponse>({
    endPoint: `permissions`,
    type: "get",
    dataParams: {
      providerName: "U",
      providerKey,
    },
    isHeaderJson: true,
    baseUrlKey: "permissions",
  });

  // Flatten all permissions from all groups into a single array
  const allPermissions: Permission[] = [];

  if (response.groups && Array.isArray(response.groups)) {
    for (const group of response.groups) {
      if (group.permissions && Array.isArray(group.permissions)) {
        allPermissions.push(...group.permissions);
      }
    }
  }

  return { items: allPermissions };
}
