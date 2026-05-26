import { DownloadSvg } from "@/assets/icons/download-svg";
import { SettingSvg } from "@/assets/icons/setting-svg";
import { Button } from "@/components/ui/button/button";
import { DropdownWrapper } from "@/components/ui/dropdown/dropdown-wrapper/drop-down-wrapper";
import { OutageOperations } from "./operations/outage-operations";
import { ColumnSelector } from "@/components/ui/Table/columns-selector/columns-selector";
import { outageColumns as outageColumnsConfig } from "@/helpers/data/outage-table-column";
import { useTranslation } from "react-i18next";
import { ClearSvg } from "@/assets/icons/clear-svg";

interface OutageTableHeaderProps {
  selectedRows: number[];
  selectedColumnKeys: string[];
  setSelectedColumnKeys: React.Dispatch<React.SetStateAction<string[]>>;
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
  outageData: any;
  onFilterClear: any;
  appliedFilters: any;
  showOperations?: boolean;
}
const OutageTableHeader = ({
  selectedRows,
  setSelectedColumnKeys,
  selectedColumnKeys,
  columnOrder,
  setColumnOrder,
  outageData,
  onFilterClear,
  appliedFilters,
  showOperations = true,
}: OutageTableHeaderProps) => {
  const { t } = useTranslation();

  const columns: any = outageColumnsConfig(() => {}, t);

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
        <OutageOperations selectedRows={selectedRows} outageData={outageData} />
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

export default OutageTableHeader;
