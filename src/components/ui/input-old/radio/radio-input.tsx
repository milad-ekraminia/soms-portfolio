import React from "react";
import "./radio-input.scss";

interface RadioInputProps {
  checked: boolean;
  onChange: () => void;
  size?: number; // optional customization
}

export const RadioInput: React.FC<RadioInputProps> = ({
  checked,
  onChange,
  size =16,
}) => {
  return (
    <label
      className="custom-radio"
      style={{ "--size": `${size}px` } as React.CSSProperties}
    >
      <input type="radio" checked={checked} onChange={onChange} />
      <span className="custom-radio__circle" />
    </label>
  );
};
