import React from "react";
import "./notification-modal.scss";
import { Button } from "@/components/ui/button/button";
import { CloseSvg } from "@/assets/icons/close-svg";
import { AlertSvg } from "@/assets/icons/alert-svg";
import Modal from "@/components/ui/modal-wrapper/modal-wrapper";
import { getClassNames } from "@/helpers/get-class-names";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  submitButtonText?: string;
  cancelButtonText?: string;
  modalSize?: "sm" | "md" | "lg" | "full";
  footerType?:
    | "confirmationNotif"
    | "confirmationError"
    | "fullNotif"
    | "addNotif"
    | "noFooter"
    | "noIcon";
  icon?: React.ReactNode;
  disabled?: boolean;
  styles?: any;
  isPending?: boolean;
}

export const NotificationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  onConfirm,
  onCancel,
  submitButtonText = "Confirm",
  cancelButtonText = "Cancel",
  footerType = "confirmationNotif",
  modalSize = "sm",
  icon = (
    <AlertSvg
      fill="var(--utility-warning-100)"
      stroke="var(--border-warning)"
    />
  ),
  disabled = false,
  styles,
  isPending = false,
}) => {
  if (!isOpen) return null;
  const footerSection = () => {
    return footerType != "noFooter" ? (
      <div
        className={getClassNames("notification-modal__footer-buttons", [
          [footerType != "confirmationNotif", "full-width"],
        ])}
      >
        {(footerType == "confirmationNotif" || footerType == "addNotif") && (
          <>
            <Button variant="secondary" onClick={onCancel}>
              {cancelButtonText}
            </Button>
            <Button
              variant="primary"
              onClick={onConfirm}
              disabled={disabled}
              isPending={isPending}
            >
              {submitButtonText}
            </Button>
          </>
        )}
        {footerType == "confirmationError" && (
          <>
            <Button variant="secondary" onClick={onClose}>
              {cancelButtonText}
            </Button>
            <Button variant="danger" onClick={onConfirm} isPending={isPending}>
              {submitButtonText}
            </Button>
          </>
        )}
        {footerType == "fullNotif" && (
          <Button variant="secondary" onClick={onClose}>
            {cancelButtonText}
          </Button>
        )}
        {footerType == "noIcon" && (
          <>
            <Button variant="secondary" onClick={onClose}>
              {cancelButtonText}
            </Button>
            <Button
              variant="primary"
              onClick={onConfirm}
              disabled={disabled}
              isPending={isPending}
            >
              {submitButtonText}
            </Button>
          </>
        )}
      </div>
    ) : (
      <></>
    );
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalSize={modalSize}
      styles={styles}
    >
      <div className="notification-modal">
        <div className="notification-modal__header">
          <div
            className={getClassNames("notification-modal__header-icon", [
              [
                footerType != "confirmationNotif" && footerType != "addNotif",
                "danger",
              ],
              [footerType == "addNotif" || footerType == "noFooter", "add"],
              [footerType == "noIcon", "hidden"],
            ])}
          >
            {icon}
          </div>
          <div className="notification-modal__header-content">
            <h2
              id="modal-title"
              className="notification-modal__header-content-title"
            >
              {title}
            </h2>
            <span
              id="modal-description"
              className="notification-modal__header-content-description"
            >
              {description}
            </span>
          </div>
          <button
            className="notification-modal__header-close"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseSvg width="24px" height="24px" stroke="#98A2B3" />
          </button>
        </div>
        <div className="notification-modal__body">{children}</div>
        <div
          className={getClassNames("notification-modal__footer", [
            [footerType != "confirmationNotif", "full"],
          ])}
        >
          {footerSection()}
        </div>
      </div>
    </Modal>
  );
};
