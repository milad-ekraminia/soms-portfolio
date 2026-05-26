import ErrorPageContent from "@/components/pages/error/content";
import ErrorPageImage from "@/components/pages/error/error-image";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
      const navigate = useNavigate();

  return (
    <div className="dv-error">
      <ErrorPageContent
        status={404}
        text="Üzgünüz, aradığınız sayfa mevcut değil veya taşınmış olabilir."
        canDashboard={true} // or false → always go to fallback
        onDashboard={() => navigate("/")}
        onFallback={() => navigate("/")}
      />
      <ErrorPageImage />
    </div>
  );
};

export default NotFound;
