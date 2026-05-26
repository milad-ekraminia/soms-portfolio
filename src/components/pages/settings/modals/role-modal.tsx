import { Checkbox } from "@/components/ui/input/check-box/check-box";
import { Input } from "@/components/ui/input/Input";
import { useEffect, useState } from "react";
import { PermissionCategory } from "@/types/components/pages/settings";
import { PermissionItem } from "./permission-item";

interface RoleModalProps {
  data?: {
    categories: PermissionCategory[];
    fullControl: boolean;
  };
}

export const RoleModal = ({ data }: RoleModalProps) => {
  const [roles, setRoles] = useState<{
    categories: PermissionCategory[];
    fullControl: boolean;
  }>({
    categories: [],
    fullControl: false,
  });

  useEffect(() => {
    if (data) {
      setRoles({ ...data });
    }
  }, [data]);

  const togglePermission = (categoryId: number, permissionId: number) => {
    setRoles((state) => ({
      ...state,
      categories: state.categories.map((category) =>
        Number(category.id) == categoryId
          ? updateCategoryPermissions(category, permissionId)
          : category
      ),
    }));
  };
  const updateCategoryPermissions = (
    category: PermissionCategory,
    permissionId: number
  ) => ({
    ...category,
    permissions: category.permissions.map((p) =>
      Number(p.id) === permissionId ? { ...p, enabled: !p.enabled } : p
    ),
  });
  const toggleFullCategoryControl = (categoryId: number, enabled: boolean) => {
    setRoles((state) => ({
      ...state,
      categories: state.categories.map((category) =>
        Number(category.id) === categoryId
          ? updateAllPermissions(category, enabled)
          : category
      ),
    }));
  };
  const updateAllPermissions = (
    category: PermissionCategory,
    enabled: boolean
  ) => ({
    ...category,
    permissions: category.permissions.map((p) => ({
      ...p,
      enabled,
    })),
  });
  const toggleFullControl = (enabled: boolean) => {
    setRoles((state) => ({
      ...state,
      categories: state.categories.map((category) =>
        updateAllPermissions(category, enabled)
      ),
      fullControl: enabled,
    }));
  };
  const areAllPermissionsEnabled = () => {
    return roles.categories.every((category) =>
      category.permissions.every((permission) => permission.enabled)
    );
  };

  // Usage Example
  const allEnabled = areAllPermissionsEnabled();
  return (
    <div className="role-modal">
      <div className="role-modal__body">
        <div className="role-modal__body-input-section">
          <Input
            placeholder="Rol Adı giriniz"
            label="Rol Adı"
            onChange={() => {}}
          />
          <Input
            placeholder="Yetki Alanı giriniz"
            label="Yetki Alanı"
            onChange={() => {}}
          />
        </div>
        <div className="role-modal__body-permission-section">
          <div className="role-modal__body-permission-section-header">
            <span>Yetkiler</span>
            <div className="checkbox-section">
              <Checkbox
                onChange={() => toggleFullControl(!roles.fullControl)}
                checked={allEnabled}
              />
              <span>Tam Kontrol</span>
            </div>
          </div>
          <div className="role-modal__body-permission-section-content">
            {roles.categories.map((category) => (
              <PermissionItem
                key={category.id}
                data={category}
                toggleFullCategoryControl={toggleFullCategoryControl}
                togglePermission={togglePermission}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
