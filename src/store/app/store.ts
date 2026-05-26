// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

import drawerReducer from "./drawer-slice";
import filterReducer from "./filter-slice";
import columnsReducer from "./columns-slice";
import outageTabsReducer from "./outage-tabs-slice";
import highlightedNodesReducer from "./highlighted-nodes-slice";
import refreshReducer from "./refresh-slice";
import ogssLayoutReducer from "./ogss-layout-slice";
import permissionsReducer from "./permissions-slice";
import themeReducer from "./theme-slice";
import notificationSettingsReducer from "./notification-settings-slice";

const rootReducer = combineReducers({
  drawer: drawerReducer,
  tableFilters: filterReducer,
  columns: columnsReducer,
  outageTabs: outageTabsReducer,
  highlightedNodes: highlightedNodesReducer,
  refresh: refreshReducer,
  ogssLayout: ogssLayoutReducer,
  permissions: permissionsReducer,
  theme: themeReducer,
  notificationSettings: notificationSettingsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "columns",
    "tableFilters",
    "outageTabs",
    "refresh",
    "permissions",
    "notificationSettings",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
