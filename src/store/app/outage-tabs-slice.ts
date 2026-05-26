import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OutageItem = {
  outageId: string | number;
  ompId: string | number;
  requestReason: string | number;
  ompName: string | number;
  isActive?: boolean;
};

interface OutageTabsState {
  [tabId: string]: OutageItem;
}

const initialState: OutageTabsState = {};

const outageTabsSlice = createSlice({
  name: "outageTabs",
  initialState,
  reducers: {
    setOutageDataForTab(
      state,
      action: PayloadAction<{
        tabId: string;
        data: Omit<OutageItem, "isActive">;
      }>
    ) {
      const { tabId, data } = action.payload;

      const hasActiveTab = Object.values(state).some((tab) => tab.isActive);

      // Set active if it's the first tab
      state[tabId] = {
        ...data,
        isActive: !hasActiveTab,
      };
    },

    setActiveTab(state, action: PayloadAction<string>) {
      const tabId = action.payload;

      for (const key in state) {
        state[key].isActive = key == tabId;
      }
    },

    removeOutageTab(state, action: PayloadAction<string>) {
      const tabId = action.payload;
      const wasActive = state[tabId]?.isActive;
      delete state[tabId];

      // If active tab was removed, set first remaining tab as active
      if (wasActive) {
        const remainingTabs = Object.keys(state);
        if (remainingTabs.length > 0) {
          const firstTab = remainingTabs[0];
          state[firstTab].isActive = true;
        }
      }
    },

    clearAllOutageTabs() {
      return {};
    },
    replaceAllTabsWith: (
      _state,
      action: PayloadAction<{
        tabId: string;
        data: Omit<OutageItem, "isActive">;
      }>
    ) => {
      return {
        [action.payload.tabId]: {
          ...action.payload.data,
          isActive: true,
        },
      };
    },
  },
});

export const {
  setOutageDataForTab,
  removeOutageTab,
  clearAllOutageTabs,
  setActiveTab,
  replaceAllTabsWith,
} = outageTabsSlice.actions;

export default outageTabsSlice.reducer;
