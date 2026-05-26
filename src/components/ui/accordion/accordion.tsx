import { ChevronDownSvg } from "@/assets/icons/chevron-down-svg";
import "./accordion.scss";
import { getClassNames } from "@/helpers/get-class-names";
import { useState } from "react";

interface kesintiMockDataType {
  outageNumber: number;
  ompId: number;
  gisId: number;
  outageStartDate: string;
  outageEndDate: string;
}

interface AccordionProps {
  data: kesintiMockDataType;
  setOutageNumber: (index: number) => void;
  isSelected: boolean;
}

const Accordion = ({ data, setOutageNumber, isSelected }: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggleAccordion = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  const handleCardSelect = (cardId: number) => {
    setOutageNumber(cardId);
  };

  return (
    <div
      onClick={() => handleCardSelect(data.outageNumber)}
      className={getClassNames("accordion", [[isSelected, "active"]])}
    >
      <div className="accordion__header">
        <div className="label">
          <h3 className={getClassNames("title", [[isSelected, "active"]])}>
            Kesinti Numarası:
          </h3>
          <p className={getClassNames("description", [[isSelected, "active"]])}>
            {data?.outageNumber ?? ""}
          </p>
        </div>
        <button
          onClick={toggleAccordion}
          className={getClassNames("icon", [[isExpanded, "expanded"]])}
        >
          <ChevronDownSvg />
        </button>
      </div>
      <ul
        className={getClassNames("accordion__details", [
          [isExpanded, "expanded"],
        ])}
      >
        <li className="detail">
          <h5
            className={getClassNames("detail-title", [[isSelected, "active"]])}
          >
            OMP ID
          </h5>
          <p
            className={getClassNames("detail-value", [[isSelected, "active"]])}
          >
            {data?.ompId ?? ""}
          </p>
        </li>
        <li className="detail">
          <h5
            className={getClassNames("detail-title", [[isSelected, "active"]])}
          >
            GIS ID
          </h5>
          <p
            className={getClassNames("detail-value", [[isSelected, "active"]])}
          >
            {data?.gisId ?? ""}
          </p>
        </li>
        <li className="detail">
          <h5
            className={getClassNames("detail-title", [[isSelected, "active"]])}
          >
            Kesinti Başlangıç
          </h5>
          <p
            className={getClassNames("detail-value", [[isSelected, "active"]])}
          >
            {data?.outageStartDate ?? ""}
          </p>
        </li>
        <li className="detail">
          <h5
            className={getClassNames("detail-title", [[isSelected, "active"]])}
          >
            Kesinti Bitiş
          </h5>
          <p
            className={getClassNames("detail-value", [[isSelected, "active"]])}
          >
            {data?.outageEndDate ?? ""}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Accordion;
