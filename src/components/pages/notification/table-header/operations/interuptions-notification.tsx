import { Loader } from "@/components/ui/loader/loader";
import Table from "@/components/ui/Table/table";
import { OutageStatusTypes, SourceSystems } from "@/definitions/enum";
import { interuptionsNotificationColumn } from "@/helpers/data/notification";
import { dateFormater } from "@/helpers/format-data";
import { useTableColumns } from "@/hooks/use-table-columns";
import { JSX } from "react";
import { useTranslation } from "react-i18next";
interface InteruptionsNotificationProps {
  text: JSX.Element | null;
  data: any;
  isLoading: boolean;
  drawerValues?: any;
  selectedRows?: number[];
  chosenValue?: number;
  onIdClick?: (type: string, id: number) => void;
}
const InteruptionsNotification = ({
  text,
  data,
  isLoading,
  drawerValues,
  selectedRows = [],
  chosenValue,
  onIdClick,
}: InteruptionsNotificationProps) => {
  const { t } = useTranslation();
  const baseRows = [
    {
      bilgiler: "Kesinti Başlangıc Tarihi",
      mevcut: dateFormater(data?.currentStartOutageDate),
      yeni: dateFormater(data?.newStartOutageDate),
    },
    {
      bilgiler: "Kesintinin kaynağı",
      mevcut: data?.currentSourceSystemId
        ? t(`Enum.${SourceSystems[data?.currentSourceSystemId]}`)
        : "-",
      yeni: data?.newSourceSystemId
        ? t(`Enum.${SourceSystems[data?.newSourceSystemId]}`)
        : "-",
    },
  ];

  const extraRow = {
    bilgiler: "Kesinti Durumu",
    mevcut: data?.currentOutageStatus
      ? t(`Enum.${OutageStatusTypes[data?.currentOutageStatus]}`)
      : "-",
    yeni: data?.newOutageStatus
      ? t(`Enum.${OutageStatusTypes[data?.newOutageStatus]}`)
      : "-",
  };

  const mappedRows =
    drawerValues?.type == "ayir" ? [extraRow, ...baseRows] : baseRows;
  const { columnOrder, setColumnOrder, effectiveColumns } = useTableColumns({
    tableName: "InteruptionsNotificationTable",
    allColumns: interuptionsNotificationColumn,
  });

  // Check if data has comparison properties (first format)
  const hasComparisonData =
    data?.currentStartOutageDate ||
    data?.newStartOutageDate ||
    data?.currentSourceSystemId !== undefined ||
    data?.newSourceSystemId !== undefined;

  // Check inconsistentList status
  const hasInconsistentList = Array.isArray(data?.inconsistentList);
  const inconsistentListIsEmpty =
    hasInconsistentList && data.inconsistentList.length === 0;
  const inconsistentListHasItems =
    hasInconsistentList && data.inconsistentList.length > 0;

  // Show table when data has comparison properties AND inconsistentList is not an empty array
  const shouldShowTable =
    hasComparisonData && !inconsistentListIsEmpty && !inconsistentListHasItems;

  return (
    <div className="interuptions-notification">
      {isLoading ? (
        <div className="interuptions-notification__loading">
          <Loader />
        </div>
      ) : inconsistentListHasItems ? (
        <div className="interuptions-notification__disabled">
          <span className="interuptions-disabled-message">
            <span>Seçtiğiniz </span>
            <span className="interuptions-notification__disabled-items">
              <button
                className="item-id"
                onClick={() => onIdClick?.("notification", selectedRows?.[0])}
                disabled={!onIdClick}
              >
                {selectedRows?.[0]}
              </button>
            </span>
            <span> numaralı bildirim ile </span>

            {chosenValue && (
              <>
                <button
                  className="item-id"
                  onClick={() => onIdClick?.("outage", chosenValue)}
                  disabled={!onIdClick}
                >
                  {chosenValue}
                </button>
                <span> numaralı kesinti </span>
              </>
            )}
            <span>
              aynı hiyerarşide değildir. Atamayı yine de gerçekleştirmek
              isterseniz, lütfen onaylayınız.
            </span>
          </span>
        </div>
      ) : (
        <>
          <span className="interuptions-notification__title">{text}</span>
          {shouldShowTable && (
            <div className="interuptions-notification__body">
              <Table
                data={mappedRows ?? []}
                columns={effectiveColumns}
                hasPagination={false}
                isLoading={isLoading}
                renderLoading={() => <Loader />}
                columnOrder={columnOrder}
                setColumnOrder={setColumnOrder}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InteruptionsNotification;
