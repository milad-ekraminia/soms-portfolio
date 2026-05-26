import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  fullscreen: boolean;
}

const initialState: UiState = {
  fullscreen: false,
};

const ogssLayoutSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setFullscreen: (state, action: PayloadAction<boolean>) => {
      state.fullscreen = action.payload;
    },
    resetUiState: () => initialState,
  },
});

export const { setFullscreen, resetUiState } = ogssLayoutSlice.actions;
export default ogssLayoutSlice.reducer;
