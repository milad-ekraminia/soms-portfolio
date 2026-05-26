# Permissions Hook Usage

This hook provides a way to fetch and check user permissions based on their `oi_tkn_id` from the JWT token.

## Usage Example

```tsx
import { usePermissions } from "@/hooks/permissions/use-permissions";

function MyComponent() {
  const { hasPermission, hasAnyPermission, hasAllPermissions, isLoading } =
    usePermissions();

  // Check single permission
  const canCreate = hasPermission(
    "ControlCenterModule.DataTransferOmps.Create"
  );

  // Check multiple permissions (any)
  const canEditOrDelete = hasAnyPermission([
    "ControlCenterModule.DataTransferOmps.Edit",
    "ControlCenterModule.DataTransferOmps.Delete",
  ]);

  // Check multiple permissions (all)
  const canFullAccess = hasAllPermissions([
    "ControlCenterModule.DataTransferOmps.Create",
    "ControlCenterModule.DataTransferOmps.Edit",
    "ControlCenterModule.DataTransferOmps.Delete",
  ]);

  if (isLoading) {
    return <div>Loading permissions...</div>;
  }

  return (
    <div>
      {canCreate && <button onClick={handleCreate}>Create</button>}

      {canEditOrDelete && <button onClick={handleEdit}>Edit</button>}
    </div>
  );
}
```

## API

### `usePermissions()` Returns:

- `permissions`: Array of all permission objects
- `permissionsMap`: Map of permission name → isGranted for fast lookups
- `hasPermission(permissionName: string)`: Check if user has a specific permission
- `hasAnyPermission(permissionNames: string[])`: Check if user has any of the provided permissions
- `hasAllPermissions(permissionNames: string[])`: Check if user has all of the provided permissions
- `isLoading`: Loading state
- `error`: Error state
- `oiTknId`: The extracted oi_tkn_id from the token

## Permission Data Model

Each permission object has:

- `name`: Permission identifier (e.g., "ControlCenterModule.DataTransferOmps.Create")
- `displayName`: Human-readable name
- `parentName`: Parent permission group
- `isGranted`: Boolean indicating if permission is granted
- `allowedProviders`: Array of allowed providers
- `grantedProviders`: Array of granted providers
