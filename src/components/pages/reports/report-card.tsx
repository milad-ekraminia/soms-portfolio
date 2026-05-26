import { AlertSvg } from "@/assets/icons/alert-svg";
import { Button } from "@/components/ui/button/button";
import { PortalDropdownWrapper } from "@/components/ui/dropdown/portal-dropdown-wrapper/portal-dropdown-wrapper";
import { getClassNames } from "@/helpers/get-class-names";
import { useState } from "react";

export const ReportCard = ({
  item,
  setTableData,
}: {
  item: any;
  setTableData: (data: any) => void;
}) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="reports-cards__item">
      <div className="content">
        <span className="title">{item.title}</span>
        <div className="actions">
          <Button
            variant="secondary"
            onClick={() => setTableData(item)}
            disabled={item?.disabled}
            className={getClassNames("report-button", [
              [item?.disabled, "disabled"],
            ])}
            tooltip={
              item?.disabled
                ? "Bu alan ilerleyen versiyonlarda aktif olacaktır."
                : ""
            }
          >
            Raporu Görüntüle
          </Button>

          <PortalDropdownWrapper
            toggleBtn={
              <Button
                variant="secondary"
                leftIcon={<AlertSvg stroke="#344054" />}
                onClick={() => setShowInfo(!showInfo)}
              />
            }
            closeButton={false}
            // leftOffset="-100px"
            direction="right"
            yOffset={-50}
            leftOffset={50}
            className={"report-card-info-wrapper"}
          >
            <div className="report-card-info">{item.info}</div>
          </PortalDropdownWrapper>
        </div>
      </div>
      <div className="icon-wrapper">{item.Icon ? <item.Icon /> : null}</div>
    </div>
  );
};
