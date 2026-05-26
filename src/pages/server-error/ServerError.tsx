import ErrorPageContent from "@/components/pages/error/content";
import ErrorPageImage from "@/components/pages/error/error-image";
import { useNavigate } from "react-router-dom";

const ServerError = () => {
  const navigate = useNavigate();

  return (
    <div className="dv-error">
      <ErrorPageContent
        status={500}
        text="Şu anda bir hata oluştu. Lütfen daha sonra tekrar deneyin."
        canDashboard={true}
        onDashboard={() => location.reload()}
        onFallback={() => navigate("/")}
      />
      <ErrorPageImage />
    </div>
  );
};

export default ServerError;
