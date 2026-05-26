import { DownloadSvg } from "@/assets/icons/download-svg";
import { SettingSvg } from "@/assets/icons/setting-svg";
import { Button } from "@/components/ui/button/button";
import { DropdownWrapper } from "@/components/ui/dropdown/dropdown-wrapper/drop-down-wrapper";
import { OutageOperations } from "./operations/outage-operations";
import { ColumnSelector } from "@/components/ui/Table/columns-selector/columns-selector";
import { outageColumns as outageColumnsConfig } from "@/helpers/data/outage-table-column";
import { useTranslation } from "react-i18next";

interface OutageTableHeaderProps {
  selectedRows: number[];
  selectedColumnKeys: string[];
  setSelectedColumnKeys: React.Dispatch<React.SetStateAction<string[]>>;
  columnOrder: string[];
  setColumnOrder: React.Dispatch<React.SetStateAction<string[]>>;
  outageData: any;
  onFilterClear: any;
}
const OutageTableHeader = ({
  selectedRows,
  setSelectedColumnKeys,
  selectedColumnKeys,
  columnOrder,
  setColumnOrder,
  outageData,
  onFilterClear,
}: OutageTableHeaderProps) => {
  const { t } = useTranslation();

  const columns: any = outageColumnsConfig(() => {}, t);

  return (
    <div className="table-wrapper__header">
      <span className="table-wrapper__header-title">Kesintiler Listesi</span>

      <div className="table-wrapper__header-actions">
        <Button variant="tertiary" onClick={onFilterClear}>
          Tüm Filtreleri Temizle
        </Button>
        <OutageOperations selectedRows={selectedRows} outageData={outageData} />
        <Button onClick={() => {}} leftIcon={<DownloadSvg />}>
          <span>Dışa Aktar</span>
        </Button>
        <DropdownWrapper
          title="Listelenecek Sütunlar"
          toggleBtn={<Button leftIcon={<SettingSvg />} variant="secondary" />}
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
      </div>
    </div>
  );
};

export default OutageTableHeader;
