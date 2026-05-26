import ErrorPageContent from "@/components/pages/error/content";
import ErrorPageImage from "@/components/pages/error/error-image";
import { getFirstAllowedRoute } from "@/helpers/permissions/get-first-allowed-route";
import { usePermissions } from "@/hooks/permissions/use-permissions";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();
  const { permissionsMap, hasPermission } = usePermissions();

  const canDashboard = hasPermission(
    "ControlCenterModule.UICustomPermissions.Dashboard"
  );

  const fallback = getFirstAllowedRoute(permissionsMap);
  return (
    <div className="dv-error">
      <ErrorPageContent
        status={403}
        text="Üzgünüz, bu sayfaya erişim izniniz yok."
        onDashboard={() => navigate("/")}
        onFallback={() => navigate(fallback)}
        canDashboard={canDashboard}
      />
      <ErrorPageImage />
    </div>
  );
};

export default Unauthorized;
