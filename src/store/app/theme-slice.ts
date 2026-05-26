// src/store/app/theme-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
}

const getInitialTheme = (): ThemeMode => {
  // optional: read from localStorage
  const stored = localStorage.getItem("themeMode");
  if (stored === "light" || stored === "dark") return stored;
  return "light";
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
      localStorage.setItem("themeMode", action.payload); // optional but useful
    },
    toggleTheme(state) {
      const next = state.mode === "light" ? "dark" : "light";
      state.mode = next;
      localStorage.setItem("themeMode", next);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
