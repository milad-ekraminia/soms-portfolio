import { SvgProps } from "@/types/icons/types";

export type Message = {
  id: number;
  text: string;
};

export type Messages = Record<string, Message>;
export interface Permission {
  id: string;
  name: string;
  enabled: boolean;
}

export interface PermissionCategory {
  id: string;
  name: string;
  permissions: Permission[];
  Icon: (props: SvgProps) => any;
}

export interface PermissionsState {
  categories: PermissionCategory[];
  togglePermission: (categoryId: string, permissionId: string) => void;
  toggleCategory: (categoryId: string) => void;
  toggleFullControl: (categoryId: string, enabled: boolean) => void;
}
export interface RoleTableRowType {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  status: "Aktif" | "Deaktif";
  actions?: unknown;
}
export interface SettingsUserDataType {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  unit: string;
  roles: string;
  status: "Aktif" | "Pasif";
  systemRecordDate: string;
  lastText?: string;
}
