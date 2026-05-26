// store/highlighted-nodes-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type HighlightType =
  | "treeSearch"
  | "monitoringSystems"
  | "markedNotification"
  | "markedOutage"
  | "markedDevice"
  | "unMarkedDevice";

export interface HighlightedNodesState {
  treeSearch: string[][];
  monitoringSystems: string[];
  markedNotification: string[];
  markedOutage: string[];
  markedDevice: string[];
  unMarkedDevice: string[];
  checkedSystems: string[]; // ✅ NEW
}

const initialState: HighlightedNodesState = {
  treeSearch: [],
  monitoringSystems: [],
  markedNotification: [],
  markedOutage: [],
  markedDevice: [],
  unMarkedDevice: [],
  checkedSystems: [], // ✅ NEW
};

const highlightedNodesSlice = createSlice({
  name: "highlightedNodes",
  initialState,
  reducers: {
    setHighlightedNodes: (
      state,
      action: PayloadAction<{
        type: HighlightType;
        nodeNames: string[] | string;
      }>
    ) => {
      const { type, nodeNames } = action.payload;
      if (type === "treeSearch") {
        state.treeSearch.push(nodeNames as string[]);
      } else if (
        type === "markedNotification" ||
        type == "markedOutage" ||
        type == "markedDevice"
      ) {
        state[type].push(nodeNames as string);
      } else {
        (state as any)[type] = nodeNames;
      }
    },
    clearHighlightedNodes: (state, action: PayloadAction<HighlightType>) => {
      (state as any)[action.payload] = []; // ✅ Fix here as well
    },
    popLastTreeSearch: (state) => {
      if (state.treeSearch.length > 0) {
        state.treeSearch.pop();
      }
    },
    setCheckedSystems: (state, action: PayloadAction<string[]>) => {
      state.checkedSystems = action.payload;
    },
    clearCheckedSystems: (state) => {
      state.checkedSystems = [];
    },
  },
});

export const {
  setHighlightedNodes,
  clearHighlightedNodes,
  popLastTreeSearch,
  setCheckedSystems,
  clearCheckedSystems,
} = highlightedNodesSlice.actions;

export default highlightedNodesSlice.reducer;
