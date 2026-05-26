# Using Permissions in Components

## Basic Usage

### 1. Check Single Permission

```tsx
import { usePermissions } from "@/hooks/permissions/use-permissions";

function MyComponent() {
  const { hasPermission, isLoading } = usePermissions();

  if (isLoading) {
    return <div>Loading permissions...</div>;
  }

  const canCreate = hasPermission(
    "ControlCenterModule.DataTransferOmps.Create"
  );

  return <div>{canCreate && <button>Create</button>}</div>;
}
```

### 2. Conditional Rendering

```tsx
import { usePermissions } from "@/hooks/permissions/use-permissions";

function OutageActions() {
  const { hasPermission } = usePermissions();

  return (
    <div>
      {hasPermission("ControlCenterModule.Outages.Create") && (
        <button onClick={handleCreate}>Yeni Kesinti</button>
      )}

      {hasPermission("ControlCenterModule.Outages.Edit") && (
        <button onClick={handleEdit}>Düzenle</button>
      )}

      {hasPermission("ControlCenterModule.Outages.Delete") && (
        <button onClick={handleDelete}>Sil</button>
      )}
    </div>
  );
}
```

### 3. Disable/Enable Buttons

```tsx
import { usePermissions } from "@/hooks/permissions/use-permissions";

function ActionButtons() {
  const { hasPermission } = usePermissions();

  const canEdit = hasPermission("ControlCenterModule.DataTransferOmps.Edit");
  const canDelete = hasPermission(
    "ControlCenterModule.DataTransferOmps.Delete"
  );

  return (
    <div>
      <button disabled={!canEdit} onClick={handleEdit}>
        Edit
      </button>
      <button disabled={!canDelete} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
```

### 4. Check Multiple Permissions (Any)

```tsx
import { usePermissions } from "@/hooks/permissions/use-permissions";

function FlexibleActions() {
  const { hasAnyPermission } = usePermissions();

  // Show if user has ANY of these permissions
  const canModify = hasAnyPermission([
    "ControlCenterModule.Outages.Edit",
    "ControlCenterModule.Outages.Update",
    "ControlCenterModule.Outages.Modify",
  ]);

  return <div>{canModify && <button>Modify</button>}</div>;
}
```

### 5. Check Multiple Permissions (All)

```tsx
import { usePermissions } from "@/hooks/permissions/use-permissions";

function AdvancedActions() {
  const { hasAllPermissions } = usePermissions();

  // Show only if user has ALL permissions
  const canFullAccess = hasAllPermissions([
    "ControlCenterModule.Outages.Create",
    "ControlCenterModule.Outages.Edit",
    "ControlCenterModule.Outages.Delete",
  ]);

  return (
    <div>
      {canFullAccess && (
        <button onClick={handleAdvancedAction}>Advanced Action</button>
      )}
    </div>
  );
}
```

### 6. Loading State Handling

```tsx
import { usePermissions } from "@/hooks/permissions/use-permissions";

function ProtectedComponent() {
  const { hasPermission, isLoading } = usePermissions();

  if (isLoading) {
    return <div>Checking permissions...</div>;
  }

  if (!hasPermission("ControlCenterModule.Outages.View")) {
    return <div>You don't have permission to view this page.</div>;
  }

  return <div>Protected Content</div>;
}
```

### 7. Complete Example - CreateRank Component

```tsx
import { usePermissions } from "@/hooks/permissions/use-permissions";
import { useCreateRankLogic } from "@/hooks/outage/unPlanned-outage/use-create-rank-logic";

export const CreateRank = ({
  isOpen,
  onClose,
  drawerValues,
  selectedRows,
  outageData,
}: DrawerProps) => {
  const { hasPermission, isLoading: isPermissionsLoading } = usePermissions();

  // Check if user can create rank
  const canCreateRank = hasPermission("ControlCenterModule.Outages.CreateRank");

  const {
    control,
    handleSubmit,
    onSubmit,
    errors,
    activeTab,
    setActiveTab,
    // ... other props
  } = useCreateRankLogic({ selectedRows, onClose, isOpen, outageData });

  // Don't show drawer if no permission
  if (!canCreateRank) {
    return null;
  }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={drawerValues?.title}
    >
      {/* Your form content */}
    </Drawer>
  );
};
```

### 8. Access All Permissions

```tsx
import { usePermissions } from "@/hooks/permissions/use-permissions";

function PermissionsList() {
  const { permissions, permissionsMap } = usePermissions();

  return (
    <div>
      <h3>Your Permissions:</h3>
      <ul>
        {permissions.map((permission) => (
          <li key={permission.name}>
            {permission.displayName}: {permission.isGranted ? "✓" : "✗"}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 9. Error Handling

```tsx
import { usePermissions } from "@/hooks/permissions/use-permissions";

function MyComponent() {
  const { hasPermission, error, isLoading } = usePermissions();

  if (error) {
    return <div>Error loading permissions: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {hasPermission("Some.Permission.Name") && <button>Action</button>}
    </div>
  );
}
```

## API Reference

### `usePermissions()` Returns:

- `hasPermission(permissionName: string)`: Check if user has a specific permission
- `hasAnyPermission(permissionNames: string[])`: Check if user has any of the provided permissions
- `hasAllPermissions(permissionNames: string[])`: Check if user has all of the provided permissions
- `permissions`: Array of all permission objects
- `permissionsMap`: Object with permission names as keys and boolean values
- `isLoading`: Boolean indicating if permissions are being loaded
- `error`: Error message if permissions failed to load
- `oiTknId`: The user's oi_tkn_id from the token

## Common Permission Names Pattern

Based on your data model, permissions follow this pattern:

- `ControlCenterModule.{ModuleName}.{Action}`

Examples:

- `ControlCenterModule.DataTransferOmps.Create`
- `ControlCenterModule.DataTransferOmps.Edit`
- `ControlCenterModule.DataTransferOmps.Delete`
- `ControlCenterModule.Outages.CreateRank`
- `ControlCenterModule.Outages.View`
