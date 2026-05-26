import { memo, ReactNode } from "react";
import "./error-group-button.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button/button";
import { ArrowLeftSvg } from "@/assets/icons/arrow-left-svg";

const MemoCustomErrorButtons = ({
  isPending = false,
  isSubmitDisabled = false,
  children,
  confirmButtonText = "Save",
  canDashboard,
  onDashboard,
  onFallback,
}: {
  isPending: boolean;
  isSubmitDisabled?: boolean;
  children?: ReactNode;
  confirmButtonText?: string;
  canDashboard: boolean;
  onDashboard: () => void;
  onFallback: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="dv-submit-or-cancel-buttons custom-error-buttons">
      {children}
      <Button
        onClick={() => {
          if (window.history.length > 2) navigate(-1);
          else onFallback();
        }}
        type="button"
        variant="secondary"
      >
        <div className="custom-error-buttons__content-box">
          <ArrowLeftSvg width="20" height="20" />
          Geri dön
        </div>
      </Button>

      {/* MAIN ACTION (Dashboard OR fallback) */}
      <Button
        disabled={isSubmitDisabled || isPending}
        type="button"
        variant="primary"
        onClick={() => (canDashboard ? onDashboard() : onFallback())}
      >
        {confirmButtonText}
      </Button>
    </div>
  );
};

const CustomErrorButtons = memo(MemoCustomErrorButtons);

export default CustomErrorButtons;
