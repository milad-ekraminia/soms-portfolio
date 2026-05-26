import React from "react";
import ReactDOM from "react-dom";
import "./modal-wrapper.scss";
import { CloseSvg } from "@/assets/icons/close-svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalSize?: "sm" | "md" | "lg" | "full";
  styles?: any;
  zIndex?: number;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  modalSize = "sm",
  styles,
  zIndex = 1002,
}) => {
  if (!isOpen) return null;
  const contentStyle: React.CSSProperties = {
    ...styles,
    zIndex,
  };
  const backdropStyle: React.CSSProperties = {
    zIndex: zIndex - 1,
  };
  return ReactDOM.createPortal(
    <>
      <div
        className={`modal-content modal-content-${modalSize}`}
        style={contentStyle}
      >
        <button className="modal-close" onClick={onClose}>
          <CloseSvg />
        </button>
        {children}
      </div>
      {isOpen && (
        <button
          onClick={onClose}
          className="modal-outside-click"
          style={backdropStyle}
        ></button>
      )}
    </>,
    document.body
  );
};

export default Modal;
