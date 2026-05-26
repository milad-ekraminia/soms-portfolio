import { ChevronDownSvg } from "@/assets/icons/chevron-down-svg";
import { MinusCalenderSvg } from "@/assets/icons/minus-calender-svg";
import { NoPowerSvg } from "@/assets/icons/no-power-svg";
import { getClassNames } from "@/helpers/get-class-names";
import { useState } from "react";
interface AssignToInterruptionProps {
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDrawerValues: React.Dispatch<
    React.SetStateAction<{
      title: string;
      type: string;
      formType: string;
      description?: string;
    }>
  >;
  isDrawerOpen: boolean;
  selectedRows: number[];
}
const AssignToInterruption = ({
  setDrawerValues,
  setIsDrawerOpen,
  isDrawerOpen,
  selectedRows,
}: AssignToInterruptionProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const optionsHandler = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setDrawerValues({
      title: "Plansız Kesinti Oluştur",
      formType: "plansız",
      type: "form",
    });
  };
  return (
    <div
      className={getClassNames("menu-item", [
        [selectedRows?.length != 0, "disabled"],
      ])}
      onClick={toggleDropdown}
    >
      <div className={`menu-item-text ${isDropdownOpen ? "active" : ""}`}>
        <div className="menu-item-text-title">
          <NoPowerSvg />
          <span>Kesinti Oluştur</span>
        </div>
        <span className={`icon ${isDropdownOpen ? "open" : ""}`}>
          <ChevronDownSvg />
        </span>
      </div>
      {isDropdownOpen && (
        <div className="dropdown">
          <button
            className={getClassNames("dropdown-item", [
              [selectedRows?.length != 0, "disabled"],
            ])}
            onClick={() => {
              optionsHandler();
            }}
            disabled={selectedRows?.length != 0}
          >
            <MinusCalenderSvg />
            <span>Plansız Kesinti Oluştur</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AssignToInterruption;
