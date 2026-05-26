import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import "./drawer.scss";
import { Button } from "@/components/ui/button/button";
import { getClassNames } from "@/helpers/get-class-names";
import { CloseSvg } from "@/assets/icons/close-svg";

let drawerStackCounter = 0;

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
  style?: any;
  isPending?: boolean;
  zIndexBase?: number; // ✅ optional
}

const TestDrawer: React.FC<DrawerProps> = ({
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
  style = {},
  zIndexBase = 1000,
}) => {
  const [renderChildren, setRenderChildren] = useState(isOpen);

  // ✅ each instance gets its own z-index when it opens
  const [stackIndex, setStackIndex] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      drawerStackCounter += 1;
      setStackIndex(drawerStackCounter);
      setRenderChildren(true);
    } else {
      const timer = setTimeout(() => setRenderChildren(false), 300); // match your css animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ✅ overlay below content; newest is highest
  const overlayZ = useMemo(
    () => zIndexBase + stackIndex * 2,
    [zIndexBase, stackIndex]
  );
  const contentZ = overlayZ + 1;

  if (!isOpen && !renderChildren) return null;

  return ReactDOM.createPortal(
    <div
      className={getClassNames("sideBar-modal-overlay", [
        [true, `size-${size}`],
        [isOpen, "expanded"],
      ])}
      style={{ zIndex: overlayZ }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={getClassNames("sideBar-modal-content", [
          [!hasHeader, "headerless"],
        ])}
        style={{ zIndex: contentZ }}
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

export default TestDrawer;
// .sideBar-modal-overlay {
//   position: fixed;
//   inset: 0;
// }

// .sideBar-modal-content {
//   position: absolute; // or fixed
//   right: 0;
//   top: 0;
//   height: 100%;
// }
