import { ChevronDownSvg } from "@/assets/icons/chevron-down-svg";
import { SearchSvg } from "@/assets/icons/search-svg";
import { getClassNames } from "@/helpers/get-class-names";
import { useRef, useState, useMemo } from "react";
import { Checkbox } from "../../check-box/check-box";
import { Input } from "../../Input";

interface Option {
  id: string | number;
  displayName: string;
  value: string | number;
}

interface MultiSelectFiltersProps {
  title?: string;
  options: Option[];
  selected: (string | number)[];
  setValue: (values: (string | number)[]) => void;
  placeholder?: string;
  disabled?: boolean;
  alwaysOpen?: boolean;
}

const MultiSelectFilters = ({
  title,
  options,
  selected,
  setValue,
  placeholder = "Search",
  disabled,
  alwaysOpen = true,
}: MultiSelectFiltersProps) => {
  const [isOpen, setIsOpen] = useState(alwaysOpen);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const safeSelected = selected ?? [];

  const toggle = () => {
    if (!disabled && !alwaysOpen) {
      setIsOpen((p) => !p);
    }
  };

  const allValues = useMemo(() => options.map((o) => o.value), [options]);

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    return options.filter((o) =>
      o.displayName.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  const getCheckStatus = () => {
    const total = options.length;
    const selectedCount = safeSelected.length;

    if (selectedCount === total && total > 0) return "active";
    if (selectedCount === 0) return "deactive";
    return "semi";
  };

  const toggleSelectAll = () => {
    if (safeSelected.length === allValues.length) {
      setValue([]);
    } else {
      setValue(allValues);
    }
  };

  const handleSelect = (value: string | number) => {
    if (safeSelected.includes(value)) {
      setValue(safeSelected.filter((v) => v !== value));
    } else {
      setValue([...safeSelected, value]);
    }
  };

  return (
    <div className="multi-select-filters" ref={containerRef}>
      {title && <div className="multi-select-filters__title">{title}</div>}

      {/* SEARCH INPUT TRIGGER */}
      <div
        className={getClassNames("multi-select-filters__trigger", [
          [!!disabled, "disabled"],
        ])}
        onClick={toggle}
      >
        <Input
          leftIcon={<SearchSvg />}
          placeholder={placeholder}
          value={search}
          disabled={disabled}
          onChange={(e) => setSearch(e.target.value)}
          onClick={(e) => e.stopPropagation()} // critical
        />
        {!alwaysOpen && <ChevronDownSvg />}
      </div>

      {isOpen && (
        <div className="multi-select-filters__panel">
          <ul className="multi-select-filters__list">
            {options.length > 0 && (
              <li className="multi-select-filters__item select-all">
                <div className="item-button">
                  <Checkbox
                    checked={["active", "semi"].includes(getCheckStatus())}
                    status={getCheckStatus()}
                    onChange={(checked) =>
                      checked ? setValue(allValues) : setValue([])
                    }
                  />
                  <span onClick={toggleSelectAll}>Tümünü Seç</span>
                </div>
              </li>
            )}

            {filteredOptions.map((opt) => {
              const checked = safeSelected.includes(opt.value);

              return (
                <li key={opt.id} className="multi-select-filters__item">
                  <div
                    className={getClassNames("item-button", [
                      [checked, "selected"],
                    ])}
                  >
                    <Checkbox
                      checked={checked}
                      status={checked ? "active" : "deactive"}
                      onChange={() => handleSelect(opt.value)}
                    />
                    <span onClick={() => handleSelect(opt.value)}>
                      {opt.displayName}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectFilters;
