// import SigninOIDC from "@/pages/auth/SigninOIDC";
// import SignoutOIDC from "@/pages/auth/SignoutOIDC";
import { JSX, lazy, Suspense } from "react";
// import { Loader } from "@/components/ui/loader/loader";
import { RouteObject } from "react-router-dom";

// Inline small, lightweight pages
import Unauthorized from "@/pages/unauthorized/Unauthorized";
import NotFound from "@/pages/not-found/NotFound";
import ServerError from "@/pages/server-error/ServerError";
// import TestPage from "@/components/ui/dummy-table/test";
import { ProtectedRoute } from "@/helpers/permissions/protected-routes";

// Lazy-load heavy or feature pages
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const Bildirim = lazy(() => import("@/pages/bildirim/Bildirim"));
const UnplannedOutage = lazy(
  () => import("@/pages/unplanned-outages/UnPlannedOutages"),
);
// const PlannedOutage = lazy(
//   () => import("@/pages/planned-outages/PlannedOutages"),
// );
// const Harita = lazy(() => import("@/pages/harita/Harita"));
// const Raporlar = lazy(() => import("@/pages/raporlar/Raporlar"));
// const YasamDongusu = lazy(() => import("@/pages/yasam-dongusu/YasamDongusu"));
const Ayarlar = lazy(() => import("@/pages/ayarlar/Ayarlar"));
// const KesintiSebeke = lazy(
//   () => import("@/pages/kesinti-sebeke/KesintiSebeke"),
// );
// const Simulasyon = lazy(() => import("@/pages/simulasyon/Simulasyon"));
const OGSSOutages = lazy(() => import("@/pages/ogss/outages"));
// const OGSSSimulation = lazy(() => import("@/pages/ogss/simulation"));
// const OGSSHistoricalNetwork = lazy(
//   () => import("@/pages/ogss/historical-network"),
// );
const Login = lazy(() => import("@/pages/login"));

const withLoader = (Component: JSX.Element) => (
  <Suspense
    fallback={
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "var(--bg-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Loader /> */}
      </div>
    }
  >
    {Component}
  </Suspense>
);

const routes: RouteObject[] = [
  { path: "/login", element: withLoader(<Login />) },

  // Protected pages
  {
    path: "/",
    element: <ProtectedRoute>{withLoader(<Dashboard />)}</ProtectedRoute>,
  },
  {
    path: "/bildirimler",
    element: <ProtectedRoute>{withLoader(<Bildirim />)}</ProtectedRoute>,
  },
  {
    path: "/plansiz-kesintiler",
    element: <ProtectedRoute>{withLoader(<UnplannedOutage />)}</ProtectedRoute>,
  },
  // {
  //   path: "/planli-kesintiler",
  //   element: <ProtectedRoute>{withLoader(<PlannedOutage />)}</ProtectedRoute>,
  // },
  // {
  //   path: "/harita",
  //   element: <ProtectedRoute>{withLoader(<Harita />)}</ProtectedRoute>,
  // },
  // {
  //   path: "/raporlar",
  //   element: <ProtectedRoute>{withLoader(<Raporlar />)}</ProtectedRoute>,
  // },
  // {
  //   path: "/yasam-dongusu",
  //   element: <ProtectedRoute>{withLoader(<YasamDongusu />)}</ProtectedRoute>,
  // },
  {
    path: "/ayarlar",
    element: <ProtectedRoute>{withLoader(<Ayarlar />)}</ProtectedRoute>,
  },

  // OGSS children don’t need individual permission — parent covers them
  {
    path: "/ogss/kesintiler",
    element: <ProtectedRoute>{withLoader(<OGSSOutages />)}</ProtectedRoute>,
  },
  // {
  //   path: "/ogss/simulasyon",
  //   element: <ProtectedRoute>{withLoader(<OGSSSimulation />)}</ProtectedRoute>,
  // },
  // {
  //   path: "/ogss/tarihsel-sebeke",
  //   element: (
  //     <ProtectedRoute>{withLoader(<OGSSHistoricalNetwork />)}</ProtectedRoute>
  //   ),
  // },
  // // OIDC
  // { path: "/signin-oidc", element: <SigninOIDC /> },
  // { path: "/signout-callback-oidc", element: <SignoutOIDC /> },

  // DECORATIVE (NO AUTH)
  // { path: "/test", element: withLoader(<TestPage />) },
  { path: "/unauthorized", element: <Unauthorized /> },
  { path: "/not-found", element: <NotFound /> },
  { path: "/server-error", element: <ServerError /> },

  // LAST
  { path: "*", element: <NotFound /> },
];

export default routes;
