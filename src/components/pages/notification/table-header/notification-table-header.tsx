import { DownloadSvg } from "@/assets/icons/download-svg";
import { SettingSvg } from "@/assets/icons/setting-svg";
import { Button } from "@/components/ui/button/button";
import { DropdownWrapper } from "@/components/ui/dropdown/dropdown-wrapper/drop-down-wrapper";
import { NotificationOperations } from "./operations/notification-operations";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { notificationColumns as notificationColumnsConfig } from "@/helpers/data/notification";
import { ColumnSelector } from "@/components/ui/Table/columns-selector/columns-selector";
import { ClearSvg } from "@/assets/icons/clear-svg";

interface NotificationTableHeaderProps {
  selectedRows: number[];
  selectedColumnKeys: string[];
  setSelectedColumnKeys: React.Dispatch<React.SetStateAction<string[]>>;
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
  data: any;
  onFilterClear: any;
  appliedFilters: any;
  showOperations?: boolean;
}
const NotificationTableHeader = ({
  selectedRows,
  setSelectedColumnKeys,
  selectedColumnKeys,
  columnOrder,
  setColumnOrder,
  data,
  onFilterClear,
  appliedFilters,
  showOperations=true,
}: NotificationTableHeaderProps) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () =>
      notificationColumnsConfig(
        () => {},
        t,
        [],
        () => {}
      ),
    []
  );
  return (
    <>
      {appliedFilters?.length > 0 ? (
        <Button
          variant="secondary-color"
          onClick={onFilterClear}
          leftIcon={
            <ClearSvg
              stroke={appliedFilters?.length < 1 ? "#98A2B3" : undefined}
            />
          }
          disabled={appliedFilters?.length < 1}
        >
          {appliedFilters?.length < 1 ? "" : "Tüm Filtreleri Temizle"}
        </Button>
      ) : null}
      {showOperations && (
        <NotificationOperations selectedRows={selectedRows} data={data} />
      )}
      <Button
        variant="secondary"
        onClick={() => {}}
        leftIcon={<DownloadSvg stroke="var(--fg-secondary-700)" />}
      />
      <DropdownWrapper
        title="Listelenecek Sütunlar"
        toggleBtn={
          <Button
            leftIcon={<SettingSvg fill="var(--fg-secondary-700)" />}
            variant="secondary"
          />
        }
        closeButton={true}
        leftOffset="-280px"
      >
        <ColumnSelector
          columns={columns}
          selectedKeys={selectedColumnKeys}
          setSelectedKeys={setSelectedColumnKeys}
          columnOrder={columnOrder}
          setColumnOrder={setColumnOrder}
        />
      </DropdownWrapper>
    </>
  );
};

export default NotificationTableHeader;
