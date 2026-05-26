import { ChevronDownSvg } from "@/assets/icons/chevron-down-svg";
import { getClassNames } from "@/helpers/get-class-names";
import { useEffect, useRef, useState } from "react";
import { Checkbox } from "../check-box/check-box";

interface DropDownOptionsType {
  displayName: string;
  value: number | string;
  id: string | number;
}

interface MultiSelectProps {
  placeholder?: string;
  label?: string;
  options: DropDownOptionsType[];
  setValue?: (val: (string | number)[]) => void;
  selected?: (number | string)[];
  disabled?: boolean;
  openDirection?: "up" | "down";
  error?: string;
}

const MultiSelectInput = ({
  placeholder,
  label,
  options,
  setValue,
  selected = [],
  disabled,
  openDirection = "down",
  error,
}: MultiSelectProps) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: DropDownOptionsType) => {
    let newSelected: (string | number)[];
    if (selected.includes(option.value)) {
      newSelected = selected.filter((val) => val !== option.value);
    } else {
      newSelected = [...selected, option.value];
    }
    setValue?.(newSelected);
  };

  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSelectedLabels = () => {
    return options
      .filter((opt) => selected.includes(opt.value))
      .map((opt) => opt.displayName)
      .join(", ");
  };

  return (
    <div className="select-input" ref={selectRef}>
      {label && (
        <label className="select-input__label" htmlFor="dropdown">
          {label}
        </label>
      )}
      <button
        id="dropdown"
        className={getClassNames("select-input__select", [
          [!selected.length, "placeholder"],
          [!!error, "error"],
        ])}
        onClick={toggleDropdown}
        type="button"
      >
        {selected.length ? getSelectedLabels() : placeholder}
        <ChevronDownSvg />
      </button>
      {isOpen && (
        <ul
          className={`multi-select-input__dropdown  ${
            openDirection === "up" ? "dropdown-up" : "dropdown-down"
          }`}
        >
          {options.map((option) => (
            <li className="dropdown-item" key={option.id}>
              <button
                className={`dropdown-option ${
                  selected.includes(option.value)
                    ? "dropdown-option-selected"
                    : ""
                }`}
              >
                <Checkbox
                  onChange={() => handleSelect(option)}
                  checked={selected.includes(option.value)}
                />
                <span>{option.displayName}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <span className="select-input__error-message">{error}</span>}
    </div>
  );
};

export default MultiSelectInput;
