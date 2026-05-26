import React, { useRef } from "react";
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
  placeholderItemsHandler?: (item: PlaceholderItem, cursorPos: number) => void;
  textAreaHandler?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const DynamicTextArea: React.FC<InputProps> = ({
  label,
  error,
  placeholder,
  rows = 6,
  placeholderItems = [],
  placeholderItemsHandler = () => {},
  textAreaHandler,
  value,
  onChange,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(e);
    if (textAreaHandler) textAreaHandler(e);
  };

  const handleInsertPlaceholder = (item: PlaceholderItem) => {
    if (!textareaRef.current) return;
    const cursorPos = textareaRef.current.selectionStart;
    placeholderItemsHandler(item, cursorPos);
    // Focus back to textarea after inserting
    textareaRef.current.focus();
  };

  return (
    <div className="textarea-container">
      {label && <label htmlFor={props.id ?? props.name}>{label}</label>}
      <textarea
        ref={textareaRef}
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
              onClick={() => handleInsertPlaceholder(item)}
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
