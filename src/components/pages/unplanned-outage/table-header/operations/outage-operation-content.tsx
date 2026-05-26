import { DocumentSvg } from "@/assets/icons/document-svg";
import { EarthLocationSvg } from "@/assets/icons/earth-location-svg";
import { FolderArchiveSvg } from "@/assets/icons/folder-archive-svg";
import { FolderCloseSvg } from "@/assets/icons/folder-close-svg";
import { NetworkSvg } from "@/assets/icons/network-svg";
import { getClassNames } from "@/helpers/get-class-names";
import AssignToInterruption from "./assign-to-interruption";
import CreateLevel from "./create-level";
import { OutageEnergySvg } from "@/assets/icons/outage-energy-svg";

interface OperationsProps {
  selectedRows: number[];
  optionsHandler: (type: string, selectedRows?: number[]) => void;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTableDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setDrawerValues: React.Dispatch<
    React.SetStateAction<{
      title: string;
      type: string;
      formType: string;
      description?: string;
    }>
  >;
  isDrawerOpen: boolean;
  tableDrawer: boolean;
  outageData: any;
}
const OutageOperationContent = ({
  selectedRows,
  optionsHandler,
  setDrawerValues,
  setIsDrawerOpen,
  isDrawerOpen,
  setTableDrawer,
  tableDrawer,
  outageData,
}: OperationsProps) => {
  const chosenData = outageData?.find(
    (item: any) => selectedRows[0] == item.outageId
  );

  return (
    <div className="menu-container">
      <AssignToInterruption
        setDrawerValues={setDrawerValues}
        setIsDrawerOpen={setIsDrawerOpen}
        isDrawerOpen={isDrawerOpen}
        selectedRows={selectedRows}
      />
      <button
        className={getClassNames("menu-item", [
          [selectedRows?.length != 1, "disabled"],
        ])}
        disabled={selectedRows?.length != 1}
        onClick={() => {
          optionsHandler("tree");
        }}
      >
        <div className="menu-item__tooltip">
          <span>İlgili aksiyon sadece tek bir kesinti için yapılabilir. </span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <NetworkSvg stroke="#475467" />
            <span>Kesintiyi Ağaçta Göster</span>
          </div>
        </div>
      </button>
      <CreateLevel
        selectedRows={selectedRows}
        setTableDrawer={setTableDrawer}
        tableDrawer={tableDrawer}
      />
      <button
        className={getClassNames("menu-item", [
          [selectedRows?.length != 1 || chosenData?.status !== 1, "disabled"],
        ])}
        disabled={selectedRows?.length != 1 || chosenData?.status !== 1}
        onClick={() => {
          optionsHandler("energy");
        }}
      >
        <div className="menu-item__tooltip">
          {selectedRows?.length != 1 ? (
            <span>
              İlgili aksiyon sadece tek bir kesinti için yapılabilir.{" "}
            </span>
          ) : null}
          {selectedRows?.length == 1 && chosenData?.status !== "Open" ? (
            <span>Sadece açık olan kesintiler enerjilendirilebilir.</span>
          ) : null}
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <OutageEnergySvg />
            <span> Kesintiye Enerji Ver</span>
          </div>
        </div>
      </button>
      <button
        className={getClassNames("menu-item", [
          [selectedRows?.length != 1, "disabled"],
        ])}
        disabled={selectedRows?.length != 1}
        onClick={() => {
          optionsHandler("data");
        }}
      >
        <div className="menu-item__tooltip">
          <span>İlgili aksiyon sadece tek bir kesinti için yapılabilir. </span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <DocumentSvg />
            <span>Kesintinin Detayına Git</span>
          </div>
        </div>
      </button>
      <button
        className={getClassNames("menu-item", [
          [selectedRows?.length == 0, "disabled"],
        ])}
        disabled={selectedRows?.length == 0}
      >
        <div className="menu-item__tooltip">
          <span>İlgili aksiyon sadece tek bir kesinti için yapılabilir. </span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <EarthLocationSvg />
            <span>Kesintiyi Haritada Göster</span>
          </div>
        </div>
      </button>
      <button
        className={getClassNames("menu-item", [
          [selectedRows?.length < 1, "disabled"],
        ])}
        disabled={selectedRows?.length < 1}
        onClick={() => {
          optionsHandler("cancel-notif", selectedRows);
        }}
      >
        <div className="menu-item__tooltip">
          <span>İlgili aksiyon sadece tek bir kesinti için yapılabilir. </span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <FolderCloseSvg />
            <span> Kesintiyi İptal Et</span>
          </div>
        </div>
      </button>
      <button
        className={getClassNames("menu-item", [
          [selectedRows?.length < 1, "disabled"],
        ])}
        disabled={selectedRows?.length < 1}
        onClick={() => {
          optionsHandler("archive-notif");
        }}
      >
        <div className="menu-item__tooltip">
          <span>İlgili aksiyon sadece tek bir kesinti için yapılabilir. </span>
        </div>
        <div className="menu-item-text">
          <div className="menu-item-text-title">
            <FolderArchiveSvg />
            <span> Kesintiyi Arşivle</span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default OutageOperationContent;
