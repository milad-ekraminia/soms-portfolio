import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./drawer.scss";
import { Button } from "@/components/ui/button/button";
import { getClassNames } from "@/helpers/get-class-names";
import { CloseSvg } from "@/assets/icons/close-svg";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  hasFooter?: boolean;
  hasHeader?: boolean;
  size?: "full" | "lg" | "md";
  onSubmit?: () => void;
  closeBtnText?: string;
  submitBtnText?: string;
  disableSubmitButton?: boolean;
  style?:any;
  isPending?: boolean;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
  hasFooter = true,
  size = "md",
  closeBtnText = "İptal Et",
  submitBtnText = "Kaydet",
  hasHeader = true,
  onSubmit = () => {},
  disableSubmitButton = false,
  isPending = false,
  style={},
}) => {
  const [renderChildren, setRenderChildren] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      // Immediately render children when drawer opens
      setRenderChildren(true);
    } else {
      // Wait 1 second before removing children (allows slide-out)
      const timer = setTimeout(() => {
        setRenderChildren(false);
      }, 1000); // 1000ms = 1 second
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  return ReactDOM.createPortal(
    <div
      className={getClassNames("sideBar-modal-overlay", [
        [true, `size-${size}`],
        [isOpen, "expanded"],
      ])}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={getClassNames("sideBar-modal-content", [
          [!hasHeader, "headerless"],
        ])}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {!hasHeader && (
          <button
            className="sideBar-modal-content__close-btn"
            onClick={onClose}
          >
            <CloseSvg />
          </button>
        )}

        {title && hasHeader && (
          <div className="sideBar-modal-content__header">
            <span className="sideBar-modal-content-header__title">{title}</span>
            <button
              className="sideBar-modal-content__header-close-btn"
              onClick={onClose}
            >
              <CloseSvg />
            </button>
          </div>
        )}

        {/* Only render children when drawer is open */}
        {renderChildren && (
          <div className="sideBar-modal-content__body" style={{ ...style }}>
            {children}
          </div>
        )}

        {hasFooter && (
          <div className="sideBar-modal-content__footer">
            <Button variant="secondary" onClick={onClose}>
              {closeBtnText}
            </Button>
            <Button
              variant="primary"
              onClick={onSubmit}
              disabled={disableSubmitButton}
              isPending={isPending}
            >
              {submitBtnText}
            </Button>
          </div>
        )}
      </div>
    </div>,

    document.body
  );
};

export default Drawer;
