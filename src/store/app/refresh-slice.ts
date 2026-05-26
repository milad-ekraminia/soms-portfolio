// store/refreshSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RefreshInterval = number | false;

interface RefreshState {
  [page: string]: RefreshInterval; // key = page identifier
}

const initialState: RefreshState = {};

const refreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    setRefreshInterval: (
      state,
      action: PayloadAction<{ page: string; interval: RefreshInterval }>
    ) => {
      state[action.payload.page] = action.payload.interval;
    },
  },
});

export const { setRefreshInterval } = refreshSlice.actions;
export default refreshSlice.reducer;
