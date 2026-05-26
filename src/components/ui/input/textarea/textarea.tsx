import React from "react";
import "./textarea.scss";
interface PlaceholderItem {
  id: number;
  label: string;
}

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  rows?: number;
  placeholderItems?: PlaceholderItem[];
  placeholderItemsHandler?: (item: PlaceholderItem) => void;
  textAreaHandler?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

export const TextArea: React.FC<InputProps> = ({
  label,
  error,
  placeholder,
  rows = 6,
  placeholderItems = [],
  placeholderItemsHandler = () => {},
  textAreaHandler,
  value,
  onChange,
  required = false, 

  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(e); // RHF or parent form control
    if (textAreaHandler) textAreaHandler(e); // Optional custom logic
  };

  return (
    <div className="textarea-container">
      {label && (
        <label htmlFor={props.id ?? props.name}>
          {" "}
          {label}
          {required && <span className="textarea-container__required">*</span>}
        </label>
      )}
      <textarea
        {...props}
        value={value}
        placeholder={placeholder}
        rows={rows}
        className={`textarea ${error ? "textarea-error" : ""}`}
        onChange={handleChange}
      />
      {placeholderItems.length > 0 && (
        <div className="placeholder-items">
          {placeholderItems.map((item) => (
            <button
              type="button"
              className="placeholder-item"
              key={item.id}
              onClick={() => placeholderItemsHandler(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};
