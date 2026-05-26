// src/store/slices/filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterItem {
  key: string;
  value: string;
  filterType: string;
}

type TableFilterMap = {
  [tableName: string]: FilterItem[];
};

interface FilterState {
  filters: TableFilterMap;
}

const STORAGE_KEY = "app_table_filters";

const loadFromLocalStorage = (): TableFilterMap => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error("Failed to load filters from localStorage", e);
    return {};
  }
};

const saveToLocalStorage = (filters: TableFilterMap) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  } catch (e) {
    console.error("Failed to save filters to localStorage", e);
  }
};

const initialState: FilterState = {
  filters: loadFromLocalStorage(),
};

const filterSlice = createSlice({
  name: "tableFilters",
  initialState,
  reducers: {
    setTableFilter: (
      state,
      action: PayloadAction<{
        table: string;
        filter: FilterItem;
      }>
    ) => {
      const { table, filter } = action.payload;
      const tableFilters = state.filters[table] || [];
      const existingIndex = tableFilters.findIndex((f) => f.key === filter.key);

      if (existingIndex >= 0) {
        tableFilters[existingIndex] = filter;
      } else {
        tableFilters.push(filter);
      }

      state.filters[table] = tableFilters;
      saveToLocalStorage(state.filters);
    },

    removeTableFilter: (
      state,
      action: PayloadAction<{ table: string; key: string }>
    ) => {
      const { table, key } = action.payload;
      state.filters[table] = (state.filters[table] || []).filter(
        (f) => f.key !== key
      );
      saveToLocalStorage(state.filters);
    },

    clearTableFilters: (state, action: PayloadAction<string>) => {
      delete state.filters[action.payload];
      saveToLocalStorage(state.filters);
    },

    setTableFilters: (
      state,
      action: PayloadAction<{ table: string; filters: FilterItem[] }>
    ) => {
      const { table, filters } = action.payload;
      state.filters[table] = filters;
      saveToLocalStorage(state.filters);
    },

    hydrateAllFiltersFromStorage: (state) => {
      state.filters = loadFromLocalStorage();
    },
  },
});

export const {
  setTableFilter,
  removeTableFilter,
  clearTableFilters,
  hydrateAllFiltersFromStorage,
  setTableFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
