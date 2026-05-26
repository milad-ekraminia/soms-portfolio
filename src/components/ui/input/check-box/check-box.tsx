import React from "react";
import "./check-box.scss";
import { TikSvg } from "@/assets/icons/tik-svg";
import { MinusSvg } from "@/assets/icons/minus-svg";
interface SharedCheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  status?: "semi" | "active" | "deactive";
  
}

export const Checkbox: React.FC<SharedCheckboxProps> = ({
  label,
  checked,
  onChange,
  status = "active",
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label className="custom-checkbox">
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span>{status == "semi" ? <MinusSvg /> : <TikSvg />}</span>
      {label}
    </label>
  );
};
