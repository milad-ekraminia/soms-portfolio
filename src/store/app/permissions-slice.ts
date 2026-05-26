import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Permission } from "@/services/permissions/fetch-permissions";

interface PermissionsState {
  permissions: Permission[];
  permissionsMap: Record<string, boolean>;
  isLoading: boolean;
  error: string | null;
  userId: string | null;
  lastFetched: number | null;
}

const initialState: PermissionsState = {
  permissions: [],
  permissionsMap: {},
  isLoading: false,
  error: null,
  userId: null,
  lastFetched: null,
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setPermissionsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setPermissions: (
      state,
      action: PayloadAction<{
        permissions: Permission[];
        userId: string;
      }>
    ) => {
      state.permissions = action.payload.permissions;
      state.userId = action.payload.userId;
      state.isLoading = false;
      state.error = null;
      state.lastFetched = Date.now();

      // Create permissions map for fast lookups
      const map: Record<string, boolean> = {};
      for (const permission of action.payload.permissions) {
        map[permission.name] = permission.isGranted;
      }
      state.permissionsMap = map;
    },
    setPermissionsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearPermissions: (state) => {
      state.permissions = [];
      state.permissionsMap = {};
      state.userId = null;
      state.error = null;
      state.lastFetched = null;
    },
  },
});

export const {
  setPermissionsLoading,
  setPermissions,
  setPermissionsError,
  clearPermissions,
} = permissionsSlice.actions;

export default permissionsSlice.reducer;
