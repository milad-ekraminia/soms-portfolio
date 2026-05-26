import React from "react";
import "./input.scss";
import SkeletonLoader from "../skeleton/skeleton-loader";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  isLoading?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  placeholder,
  disabled = false,
  onChange = () => {},
  required = false, // ✅ default false
  isLoading = false,

  ...props
}) => {
  return (
    <div className="main-input">
      {label && (
        <label htmlFor={props.id ?? props.name}>
          {label}
          {required && <span className="main-input__required">*</span>}
        </label>
      )}
      <div className="main-input__wrapper">
        {isLoading ? (
          <SkeletonLoader label="yükleniyor" />
        ) : (<>
        {leftIcon && (
          <span className="input-icon input-icon-left">{leftIcon}</span>
        )}
        <input
          onChange={(e) => {
            onChange(e);
          }}
          {...props}
          placeholder={placeholder}
          className={`input ${error ? "input-error" : ""} ${
            leftIcon ? "input-with-left-icon" : ""
          } ${rightIcon ? "input-with-right-icon" : ""}`}
          disabled={disabled}
        />
        {rightIcon && (
          <span className="input-icon input-icon-right">{rightIcon}</span>
        )}
        </>
        )}
      </div>
      {error && <span className="main-input__error-message">{error}</span>}
    </div>
  );
};
