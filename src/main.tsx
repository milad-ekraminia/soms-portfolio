import "./assets/styles/app.scss";
import "./assets/styles/pages.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReduxStoreProvider } from "./providers/redux-store-provider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import routes from "./routes/routes.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import i18n from "./i18n"; // ✅ Import i18n configuration
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/app/store.ts";
import { AuthProvider } from "./providers/auth-context.tsx";
// import { AuthProvider } from "react-oauth2-code-pkce";
// import { authConfig } from "./definitions/auth.ts";
import { PermissionsProvider } from "./providers/permissions-provider.tsx";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReduxStoreProvider>
          <PersistGate loading={null} persistor={persistor}>
            <I18nextProvider i18n={i18n}>
              {/* <AuthProvider authConfig={authConfig}> */}
              <PermissionsProvider>
                <RouterProvider router={router} />
              </PermissionsProvider>
              {/* </AuthProvider> */}
            </I18nextProvider>
          </PersistGate>
        </ReduxStoreProvider>
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </StrictMode>,
);
