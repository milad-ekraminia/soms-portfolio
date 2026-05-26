import React from "react";
import "./button.scss";
import { Spinner } from "../loader/spinner/spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string | React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "full"
    | "danger"
    | "rounded"
    | "secondary-color";
  className?: string;
  tooltip?: string;
  isPending?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  leftIcon,
  rightIcon,
  onClick,
  disabled,
  variant = "primary",
  className = "",
  tooltip = "",
  isPending = false,
  ...props
}) => {
  const hasText =
    typeof children === "string" || React.isValidElement(children);

  return (
    <button
      className={`custom-button custom-button-${variant} ${
        disabled ? "disabled" : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled || isPending}
      {...props}
    >
      {leftIcon && <span className="icon">{leftIcon}</span>}
      {hasText && (
        <span className="label">
          {isPending ? <Spinner variant="primary" /> : children}
        </span>
      )}
      {rightIcon && <span className="icon">{rightIcon}</span>}
      {disabled && tooltip && (
        <span className="custom-button__tooltip">{tooltip}</span>
      )}
    </button>
  );
};
