// slices/columnSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ColumnState {
  [table: string]: {
    order: string[];
    selected: string[];
  };
}

const initialState: ColumnState = {};

const slice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    setOrder: (
      state,
      action: PayloadAction<{ table: string; order: string[] }>
    ) => {
      const { table, order } = action.payload;
      state[table] = state[table] || { order: [], selected: [] };
      state[table].order = order;
    },
    setSelected: (
      state,
      action: PayloadAction<{ table: string; selected: string[] }>
    ) => {
      const { table, selected } = action.payload;
      state[table] = state[table] || { order: [], selected: [] };
      state[table].selected = selected;
    },
  },
});

export const { setOrder, setSelected } = slice.actions;
export default slice.reducer;
