import { ChevronDownSvg } from "@/assets/icons/chevron-down-svg";
import { getClassNames } from "@/helpers/get-class-names";
import { useState } from "react";
import { Link } from "react-router-dom";

interface AccordionProps {
  isSelected: boolean;
  item?: any;
  icon?: any;
  pathname?: any;
  isActive?: any;
  // disabled?: any;
}

const ItemAccordion = ({
  item,
  isSelected,
  icon,
  pathname,
  isActive,
  // disabled,
}: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggleAccordion = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <button
      className={getClassNames("sidebar-accordion", [[isSelected, "active"]])}
      type="button"
    >
      <div
        className={getClassNames("accordion__header", [[isActive, "active"]])}
        onClick={toggleAccordion}
      >
        <div className="label">
          <h3 className={getClassNames("title", [[isActive, "active"]])}>
            {icon}
            {item?.title}
          </h3>
        </div>
        <span className={getClassNames("icon", [[isExpanded, "expanded"]])}>
          <ChevronDownSvg stroke="var(--fg-quaternary-500)" />
        </span>
      </div>
      <ul
        className={getClassNames("accordion__details", [
          [isExpanded, "expanded"],
        ])}
      >
        {item?.children?.length > 0 &&
          item?.children?.map(({ Icon, id, route, title, disabled }: any) => (
            <li className="accordion__details-item" key={id}>
              <Link
                key={id}
                to={disabled ? "#" : route}
                className={getClassNames("accordion__details-item-item", [
                  [route == pathname, "isActive"],
                  [disabled, "disabled"],
                ])}
                onClick={(e) => disabled && e.preventDefault()}
              >
                <Icon
                  {...(route == pathname
                    ? { stroke: "var(--fg-brand-primary-600)" }
                    : {
                        stroke: "var(--fg-quinary-400)",
                      })}
                />
                <span>{title}</span>
              </Link>
            </li>
          ))}
      </ul>
    </button>
  );
};

export default ItemAccordion;
