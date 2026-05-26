import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const STORAGE_KEY = "notification_paused";

const readInitialPaused = (): boolean => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : false;
  } catch {
    return false;
  }
};

type NotificationSettingsState = {
  paused: boolean;
};

const initialState: NotificationSettingsState = {
  paused: readInitialPaused(),
};

const notificationSettingsSlice = createSlice({
  name: "notificationSettings",
  initialState,
  reducers: {
    setPaused(state, action: PayloadAction<boolean>) {
      state.paused = action.payload;
    },
    togglePaused(state) {
      state.paused = !state.paused;
    },
  },
});

export const { setPaused, togglePaused } = notificationSettingsSlice.actions;
export default notificationSettingsSlice.reducer;

export const notificationSettingsStorage = {
  key: STORAGE_KEY,
};
