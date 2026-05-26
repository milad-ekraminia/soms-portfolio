import { CheckIconSvg } from "@/assets/icons/check-svg";
import { ChevronDownSvg } from "@/assets/icons/chevron-down-svg";
import { getClassNames } from "@/helpers/get-class-names";
import { useEffect, useMemo, useRef, useState } from "react";
import "./select-input.scss";
import SkeletonLoader from "../../skeleton/skeleton-loader";
import { ChevronUpSvg } from "@/assets/icons/chevron-up-svg";

interface DropDownOptionsType {
  displayName?: string;
  label?: string;
  value: number | string;
  id: string | number;
}

interface DropDownProps {
  placeholder?: string;
  label?: string;
  options: DropDownOptionsType[];
  setValue?: any;
  disabled?: boolean;
  openDirection?: "up" | "down";
  selected?: number | string;
  dummySet?: (e: any) => void;
  error?: string;
  isLoading?: boolean;
  required?: boolean;
}

const SelectInput = ({
  placeholder,
  label,
  options,
  setValue,
  disabled,
  openDirection = "down",
  selected = undefined,
  dummySet,
  error,
  isLoading = false,
  required = false,
}: DropDownProps) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    number | string | undefined
  >();
  const [inputValue, setInputValue] = useState(""); // shows selected label when closed
  const [query, setQuery] = useState(""); // typed search while open
  useEffect(() => {
    const selectedItem = options.find(
      (o) => o.value === selectedOption || o.id === selectedOption
    );

    const text = selectedItem?.displayName || selectedItem?.label || "";

    // always keep the selected label in inputValue
    setInputValue(text);

    // when closing dropdown, also reset query
    if (!isOpen) setQuery("");
  }, [selectedOption, isOpen, options]);
  // keep internal selected in sync
  useEffect(() => {
    setSelectedOption(selected);
  }, [selected]);

  useEffect(() => {
    if (selected == null) {
      setSelectedOption(undefined);
      setIsOpen(false);
      setInputValue("");
      setQuery("");
    }
  }, [selected]);

  // when closing, show selected text in input
  // useEffect(() => {
  //   if (!isOpen) {
  //     const selectedItem = options.find(
  //       (o) => o.value === selectedOption || o.id === selectedOption
  //     );
  //     setSearch(selectedItem?.displayName || selectedItem?.label || "");
  //   }
  // }, [selectedOption, isOpen, options]);

  // focus input when opened
  useEffect(() => {
    if (isOpen) {
      // make sure input becomes editable and receives focus
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);
  const filteredOptions = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return options;
    return options.filter((o) =>
      (o.displayName || o.label || "").toLowerCase().includes(q)
    );
  }, [options, query]);

  const handleSelectOption = (option: DropDownOptionsType) => {
    const next = option.value ?? option.id;
    const text = option.displayName || option.label || "";

    setSelectedOption(next);
    setInputValue(text); // keep selected label
    setQuery(""); // clear typed query
    setIsOpen(false);

    dummySet?.(next);
    setValue?.(next);
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
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const root = selectRef.current;
      if (!root) return;

      const path = e.composedPath?.() as EventTarget[] | undefined;
      const clickedInside = path
        ? path.includes(root)
        : root.contains(e.target as Node);

      if (!clickedInside) setIsOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown, true); // ✅ capture
    return () => window.removeEventListener("pointerdown", onPointerDown, true);
  }, []);
  return (
    <div
      className={getClassNames("select-input", [[!!isLoading, "loading"]])}
      ref={selectRef}
    >
      {label && (
        <label className="select-input__label" htmlFor="dropdown">
          {label}
          {required && <span className="select-input__required">*</span>}
        </label>
      )}

      {isLoading ? (
        <SkeletonLoader label="yükleniyor" />
      ) : (
        <button
          className={getClassNames("select-input__select", [
            [!!error, "error"],
            [!!disabled, "disabled"],
          ])}
          type="button"
          onClick={(e) => {
            if (disabled) return;

            // if the click came from the input itself, don't toggle
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === "input") return;

            setIsOpen(true);
          }}
        >
          <input
            ref={inputRef}
            className="select-input__control"
            value={isOpen ? query : inputValue}
            placeholder={placeholder}
            readOnly={!isOpen}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (disabled) return;
              setIsOpen(true);
              setQuery(""); // ✅ clear input visually (because isOpen => shows query)
            }}
            onMouseDown={(e) => e.stopPropagation()}
          />
          {isOpen ? <ChevronUpSvg /> : <ChevronDownSvg />}
        </button>
      )}

      {isOpen && (
        <ul
          className={`select-input__dropdown ${
            openDirection === "up" ? "dropdown-up" : "dropdown-down"
          }`}
        >
          {filteredOptions.length ? (
            filteredOptions.map((option) => (
              <li className="dropdown-item" key={option.id}>
                <button
                  type="button"
                  className={`dropdown-option ${
                    selectedOption === option.value ||
                    selectedOption === option.id
                      ? "dropdown-option-selected"
                      : ""
                  }`}
                  onClick={() => handleSelectOption(option)}
                >
                  {option.displayName || option.label}
                  {(selectedOption === option.value ||
                    selectedOption === option.id) && <CheckIconSvg />}
                </button>
              </li>
            ))
          ) : (
            <li className="dropdown-item dropdown-empty">
              <span className="dropdown-empty__text">Sonuç bulunamadı</span>
            </li>
          )}
        </ul>
      )}

      {error && <span className="select-input__error-message">{error}</span>}
    </div>
  );
};

export default SelectInput;
