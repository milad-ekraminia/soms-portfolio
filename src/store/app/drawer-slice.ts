import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DrawerState {
  isOpen: boolean;
  title?: string;
  type?: "outage" | "notification" | string;
  id: number | undefined;
  rowData: any;
  clickedNode?: boolean;
}

const initialState: DrawerState = {
  isOpen: false,
  title: undefined,
  type: undefined,
  id: undefined,
  rowData: undefined,
  clickedNode: false,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (
      state,
      action: PayloadAction<{
        title: string;
        type?: string;
        id: number;
        rowData: any;
        clickedNode?: boolean;
      }>
    ) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.type = action.payload.type;
      state.id = action.payload.id;
      state.rowData = action.payload.rowData;
      state.clickedNode = action.payload.clickedNode
        ? action.payload.clickedNode
        : false;
    },
    closeDrawer: (state) => {
      state.isOpen = false;
      state.title = undefined;
      state.type = undefined;
      state.id = undefined;
      state.rowData = undefined;
    },
  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
